
import {
    ArrowDownTrayIcon,
    EllipsisVerticalIcon,
    MapPinIcon,
    EnvelopeIcon,
    PhoneArrowUpRightIcon,
    PlusCircleIcon,
    UserPlusIcon
  } from "@heroicons/react/24/outline";
  import Link from "next/link";
  import Footer from "@/components/vendor-dashboard/Vendor.Footer";
  import Pagination from "@/components/vendor-dashboard/Pagination";
  import { SearchIcon } from "@/public/data/icons";
  import Image from "next/image";
  import { Menu } from "@headlessui/react";
  import { agentList } from "@/public/data/agentList";
  import { useState } from "react";
  import PaginationControls from "@/components/PaginationControls";
  import { useSearchParams } from "next/navigation";
  import { useSession } from "next-auth/react"
  import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import DeleteModal from '@/components/admin-dashboard/DeleteModal';
import {url} from "@/utils/index";

  interface PackageInfo {
    _id: string;
    NAME: string;
    EMAIL: string;
    PROFILE: string;
  }
  
  interface ApiResponse {
    result: PackageInfo[];
    count?: number;
  }

const VendorListingList = ({ item }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const {
    _id,
    PROFILE,
    NAME,
    EMAIL,
    
  } = item;
  const { data: session } = useSession();
  const Router = useRouter();

  const handleDelete = async (userId: string) => {
    try {
        const response = await fetch(`${url}/api/v1/vendors/delete/${userId!}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "x-admin-token":  session!.user?.token!, 
          // Add any additional headers if needed
        }, 
      });
      
      const res = await response.json();
      if (res.statusCode == 200) {
        toast.success("Item deleted successfully");
       
        
    
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error("Error deleting tour:", error.message);
    } finally {
      setIsModalOpen(false);
      Router.push("/admin/users")
    }
  };

  return (
    <div
    key={_id}
    className="col-span-12 md:col-span-6  xl:col-span-4 3xl:col-span-3">
    <div className="rounded-2xl border h-[290px] bg-[var(--bg-1)] p-4 md:p-6 lg:p-8 group duration-300 flex gap-4 flex-col justify-center items-center">
      <div className="relative w-full flex justify-center">
        <Image
          width={80}
          height={80}
          className="rounded-full"
          src={PROFILE ? (`${PROFILE}`)
          : (
            ('/img/user-1.jpg')
          )}
          alt="user"
        />
        <Menu>
          <Menu.Button className="bg-[#EBEBFD] absolute top-0 right-0 p-2 rounded-full group-hover:block hidden duration-300">
            <EllipsisVerticalIcon className="w-6 h-6 text-neutral-700" />
          </Menu.Button>
          <Menu.Items className="absolute text-left right-0 mt-2 top-8 min-w-[150px] bg-white rounded-md border py-1">
            <Menu.Item>
              <Link href={`/admin/vendors/edit/${_id}`} >
              <button  className="w-full text-left p-2 hover:bg-primary hover:text-white duration-300">
                Edit
              </button>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button onClick={() => setIsModalOpen(true)} className="w-full text-left p-2 hover:bg-primary hover:text-white duration-300">
                Delete
              </button>
            </Menu.Item>
            <Menu.Item>
              <button className="w-full text-left p-2 hover:bg-primary hover:text-white duration-300">
                Block
              </button>
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      <div className="text-center">
        <h5 className="text-xl font-semibold mb-2">{NAME}</h5>
        <span className="flex items-center gap-1">
          <EnvelopeIcon className="w-6 h-6 text-[var(--secondary-500)]" />
          <span>{EMAIL}</span>
        </span>
      </div>
      <div className="flex group-hover:hidden duration-300 divide-x divide-dashed text-center">
        <div className="px-3 xxl:px-5">
          <h6 className="font-semibold">{"follower"}</h6>
          <span>Followers</span>
        </div>
        <div className="px-3 xxl:px-5">
          <h6 className="font-semibold">{"listings"}</h6>
          <span>Listings</span>
        </div>
        <div className="px-3 xxl:px-5">
          <h6 className="font-semibold">{"bookings"}</h6>
          <span>Bookings</span>
        </div>
      </div>
      <div className="justify-around gap-4 group-hover:flex hidden duration-300">
        <Link
        
          href={`vendors/${_id}`} 
          className="btn-primary">
          <PlusCircleIcon className="w-5 h-5" />
          View
        </Link>
        <Link
          href="/agent/agents-details"
          className="btn-outline">
          <PhoneArrowUpRightIcon className="w-5 h-5" />
          Contact
        </Link>
      </div>
    </div>
    <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={handleDelete} itemId={_id!} />
  </div>
  );
};

export default VendorListingList;
   