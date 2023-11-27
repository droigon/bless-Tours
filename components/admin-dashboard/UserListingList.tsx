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
import {url} from "@/utils/index";

const UserListingList = ({ item }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const {
    _id,
    PROFILE_PICTURE,
    FIRSTNAME,
    LASTNAME,
    EMAIL,
    PHONE_NUMBER,
    isVerified,
    joinedOn,
    
  } = item;
  const { data: session } = useSession();
  const Router = useRouter();

  const handleDelete = async (userId: string) => {
    try {
        const response = await fetch(`${url}/api/v1/users/delete/${userId!}`, {
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
    <tr
      key={_id}
      className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300">
        <td className="py-3 lg:py-4 px-2">
        <Link href={`users/${_id}`}>
        <Image
          className="rounded-full"
          width={60}
          height={60}
          src={PROFILE_PICTURE ? (`${PROFILE_PICTURE}`)
          : (
            ('/img/user-1.jpg')
          )}
          alt="img"
        /></Link>
        </td>
        
      <td className="py-3 lg:py-4 px-2"> <Link href={`users/${_id}`}>{FIRSTNAME} </Link></td>
      <td className="py-3 lg:py-4 px-2">{LASTNAME}</td>
      <td className="py-3 lg:py-4 px-2">{EMAIL}</td>
      <td className="py-3 lg:py-4 px-2">{PHONE_NUMBER}</td>
      
      <td className={`py-3 lg:py-4 px-2`}>
        <div className={`w-32`}>
        {isVerified ? (
          <div className={`relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left  bg-[var(--primary-light)] text-primary `}>
          <span className="block truncate">Verified</span>
          </div>
          
        ) : (
          <div className={`relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left bg-[#EBFBF2] text-[#22804A] `}>
            <span className="block truncate">Pending</span>
          </div>
        )}
          
        </div>
      </td>
      <td className="py-3 lg:py-4 px-2 flex gap-2 items-center">
        <button className="text-secondary">
            <Link href={`users/${_id}`}>
             <EyeIcon className="w-5 h-5" />
        </Link>
        </button>
       
        <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={handleDelete} itemId={_id!} />
        
        <button 
        onClick={() => setIsModalOpen(true)}
        className="text-[var(--secondary-500)] px-1">
          <TrashIcon className="w-5 h-5" />
        </button>
        
      </td>
    </tr>
  );
};

export default UserListingList;
   