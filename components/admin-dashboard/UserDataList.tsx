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



interface PackageInfo {
    _id: string;
    FIRSTNAME: string;
    LASTNAME: string;
    EMAIL: string;
    PROFILE_PICTURE: string;
    PHONE_NUMBER: number;
    IDENTITY: string;
    PROFILE: string;
    isVerified: boolean;
  }



const UserDataList: React.FC<{ data: PackageInfo[] }> = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [datas, setData] = useState<PackageInfo[] | []>(data);

  const { data: session } = useSession();
  const Router = useRouter();
  

  const handleDelete = async (userId: string) => {
    try {
        const response = await fetch(`${url}/api/v1/users/delete/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "x-admin-token":  session!.user?.token!, 
          // Add any additional headers if needed
          },
        });
      
      const res = await response.json();
      if (res.statusCode !== 200) {
        
        setData(datas.filter(item => item._id !== userId))

        toast.success("Item deleted successfully");
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error("Error deleting tour:", error.message);
    } finally {
      setIsModalOpen(false);
    }
  };
    // Render your table using the data
    return (
        <>
              {!datas ? (
              <p>No user available</p>
              ) : 
              (
                datas.map(({_id,PROFILE_PICTURE,FIRSTNAME,LASTNAME,EMAIL,PHONE_NUMBER,isVerified,IDENTITY}) => (
          
                    <tr
                        key={_id}
                        className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300">
                            <td className="py-3 lg:py-4 px-2">
                            <Image
                            className="rounded-full"
                            width={60}
                            height={60}
                            src={PROFILE_PICTURE ? ('/img/user-1.jpg')
                            : (
                                ('/img/user-1.jpg')
                            )}
                            alt="img"
                            />
                            </td>
                            
                        <td className="py-3 lg:py-4 px-2">{FIRSTNAME} </td>
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
                        <td className="py-3 lg:py-4 px-2 flex mt-4 gap-2 items-center">
                            <button className="text-secondary">
                                <Link href={`users/${_id}`}>
                                <EyeIcon className="w-5 h-5" />
                            </Link>
                            </button>
                        
                            <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={() => handleDelete(_id!)} itemId={_id!} />
                            
                            <button 
                            onClick={() => setIsModalOpen(true)}
                            className="text-[var(--secondary-500)] px-1">
                            <TrashIcon className="w-5 h-5" />
                            </button>
                            
                        </td>
                      </tr>
                     ))
                ) 
              }
        </>
        
    );
  };

export default UserDataList