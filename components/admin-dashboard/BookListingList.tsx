import { HeartIconOutline } from "@/public/data/icons";
import { HeartIcon, StarIcon } from "@heroicons/react/20/solid";

import {
    ArrowDownTrayIcon,
    EllipsisVerticalIcon,
    PencilSquareIcon,
    TrashIcon,
    EyeIcon
  } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import DeleteModal from '@/components/admin-dashboard/DeleteModal';
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import HeadlessList from "@/components/ListBox";
import {url} from "@/utils/index";
 
const BookListingList = ({ item }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const {
    _id,
    userId,
    vendorId,
    PROFILE_PICTURE,
    location,
    guests,
    amount,
    checkinDate,
    checkoutDate,
    status,
  } = item || null;
  const { data: session } = useSession();
  const Router = useRouter();

  const handleDelete = async (userId: string) => {
    try {
        const response = await fetch(`${url}/api/v1/users/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "x-admin-token":  session!.user?.token! as string, 
          // Add any additional headers if needed
        },
      });
      
      const res = await response.json();
      if (res.statusCode == 200) {
        toast.success("Item deleted successfully");
        setTimeout(() => {
            Router.push("/admin/users");
        }, 5); 
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error("Error deleting tour:", error.message);
    } finally {
      setIsModalOpen(false);
    }
  };

  
  return (
    <tr
      key={_id}
      className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300">
        <td className="py-3 lg:py-4 px-2">
        
        
        
        <Link href={`users/${userId?._id}`}>
        
        <Image
          className="rounded-full"
          width={60}
          height={60}
          src={userId?.PROFILE_PICTURE ? (`${userId?.PROFILE_PICTURE}`)
          : (
            ('/img/user-1.jpg')
          )}
          alt="img"
        />
        </Link>
        </td>
        <td className="py-3 lg:py-4 px-2">
        <Link href={`vendors/${vendorId?._id}`}>
        
        <Image
          className="rounded-full"
          width={60}
          height={60}
          src={vendorId?.PROFILE_PICTURE ? (`${vendorId?.PROFILE_PICTURE}`)
          : (
            ('/img/user-1.jpg')
          )}
          alt="img"
        />
        </Link>
        </td>
        
      <td className="py-3 lg:py-4 px-2">{amount} </td>
      <td className="py-3 lg:py-4 px-2">{location}</td>
      <td className="py-3 lg:py-4 px-2">{guests} </td>
      <td className="py-3 lg:py-4 px-2">{checkinDate}</td>
      
      <td className={`py-3 lg:py-4 px-2`}>
        <div className={`w-34`}>
   
          <HeadlessList initialValue={status} _id={_id} />
                     
          
        </div>
      </td>
      <td className="py-3 mt-4 lg:py-4 px-2 flex gap-2 items-center">
        <button className="text-secondary">
            
            <Link href={`booking/${_id}`}>
             <EyeIcon className="w-5 h-5" />
        </Link>
        </button>
       
        <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={handleDelete} itemId={_id} />
        
        <button 
        onClick={() => setIsModalOpen(true)}
        className="text-[var(--secondary-500)] px-1">
          <TrashIcon className="w-5 h-5" />
        </button>
        
      </td>
    </tr>
  );
};

export default BookListingList;
   