import { HeartIconOutline } from "@/public/data/icons";
import { HeartIcon, StarIcon } from "@heroicons/react/20/solid";
import {
  MapPinIcon,
  PaintBrushIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import DeleteModal from '@/components/DeleteModal';
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"

const VendorListingList = ({ item }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [token, setToken] = useState("");
  const { _id,NAME, LOCATION,DESCRIPTION,img, AMOUNT, rating, name } = item;
  const { data: session } = useSession();
 

  const handleDelete = async (itemId:string) => {
    console.log(itemId)
    try {
      const response = await fetch(`https://blesstours.onrender.com/api/v1/tours/delete/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "x-vendor-token": `${token}`, 
          // Add any additional headers if needed
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Item deleted successfully', data);
      alert("Item deleted successfully");
      setIsModalOpen(false); 
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };


  


  useEffect(() => {
    if (session ) {
      //const userId = session.user?.id || "";
      const token = session.user?.token || "";
      setToken(token);
      //console.log('data', userId)
    }
    
  }, [session]);
  
  return (
    <div key={_id} className="col-span-12">
      <div className="flex flex-col md:flex-row p-2 rounded-2xl bg-white hover:shadow-lg duration-300 border">
        <div className="relative">
          <div className="rounded-2xl">
            <Image
              width={369}
              height={282}
              src="/img/featured-hotel-1.jpg"
              alt="image"
              className=" w-full rounded-2xl"
            />
          </div>
          <button
            onClick={() => setFavorite(!favorite)}
            className="absolute z-60 inline-block text-primary top-3 right-3 md:top-5 md:right-5 rounded-full bg-white p-2.5 ">
            {favorite ? (
              <HeartIcon className="w-5 h-5 text-[var(--tertiary)]" />
            ) : (
              <HeartIconOutline />
            )}
          </button>
        </div>
        <div className="flex-grow p-3 lg:p-4 xxl:px-8 xxl:py-6">
          <div className="property-card__body">
            <div className="flex justify-between mb-2">
              <Link
                href="/hotel-listing-details"
                className="link block flex-grow text-[var(--neutral-700)] hover:text-primary text-xl font-medium">
                {NAME}
              </Link>
              <div className="flex items-center shrink-0">
              <div className="flex items-center gap-1">
                <MapPinIcon className="w-5 h-5 text-[#9C742B]" />
                <span className="inline-block"> {LOCATION} </span>
              </div>
              </div>
            </div>
            <div className="flex justify-between mb-6">
              <div className="flex items-center gap-1">
                 
                <span className="inline-block"> {DESCRIPTION} </span>
              </div>
              <span className="inline-block font-medium clr-secondary-400">
               
              </span>
            </div>
             
          </div>
          <div className="my-5 xl:my-7">
            <div className="border border-dashed"></div>
          </div>
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <span className="block text-xl font-medium text-primary">
              ${AMOUNT}
              <span className="inline-block text-neutral-500 text-base font-normal">
                /trip
              </span>
            </span>
            <div className="flex flex-wrap gap-3">
              <Link href={`/vendor/listings/edit/${_id}`}
              className="btn-outline">
              <PaintBrushIcon className="w-5 h-5" />
                Edit
              </Link>
              
              <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={handleDelete} itemId={_id} />
              <button  
               onClick={() => setIsModalOpen(true)}
               className="btn-outline">
                <TrashIcon className="w-5 h-5" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorListingList;
