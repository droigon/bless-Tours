"use client";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Pagination from "@/components/vendor-dashboard/Pagination";
import { StarIcon } from "@heroicons/react/20/solid";
import { SearchIcon } from "@/public/data/icons";
import { alltours } from "@/public/data/alltours";
import DeleteModal from '@/components/DeleteModal';
import HeadlessList from "@/components/ListBox";
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"



interface PackageInfo {
  _id: string;
  NAME: string;
  LOCATION: string;
  AMOUNT: number;
  GUESTS: number;
  CATEGORY:string;
  DURATION:string;
}

interface ApiResponse {
  data: PackageInfo[];
} 


const fetchFeaturedPackages = async (): Promise<PackageInfo[]> => {
  const response = await fetch('https://blesstours.onrender.com/api/v1/tours/');
  const responseData: ApiResponse = await response.json();
  return responseData.data || [];
};



const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState("");
  const { data: session } = useSession();

  const [packages, setPackages] = useState<PackageInfo[]>([]);
  
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

    const fetchPackages = async (): Promise<void> => {
      try {
        const data = await fetchFeaturedPackages();
        setPackages(data);
       
      } catch (error) {
        console.error('Error fetching packages:', error);
       
      }
    };

    fetchPackages();
    
  }, [session]);
  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">All Tour</h2>
        <Link href="/tour/add-new-tour" className="btn-primary">
          <PlusCircleIcon className="w-5 h-5" /> Add New Tour
        </Link>
      </div>

      {/* Recent bookings */}
      <section className="bg-[var(--bg-2)] px-3 lg:px-6 pb-4 lg:pb-6 relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[60px] after:top-0 after:left-0 ">
        <div className="p-3 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white relative z-[1]">
          <div className="flex justify-between mb-7 gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <form className="border rounded-full pr-3 xl:pr-4 bg-[var(--bg-1)]">
                <select className="p-3 bg-transparent xl:pl-4 min-w-[160px] rounded-full focus:outline-none">
                  <option value="1">Bulk Actions</option>
                  <option value="2">Delete</option>
                  <option value="3">Publish</option>
                </select>
              </form>
              <button className="btn-primary">Apply</button>
            </div>
            <form className="flex flex-wrap items-center gap-3">
              <div className="border rounded-full flex items-center p-1 pr-2 xl:pr-4 bg-[var(--bg-1)]">
                <input
                  type="text"
                  placeholder="Search"
                  className="rounded-full bg-transparent focus:outline-none p-2 xl:px-4"
                />
                <SearchIcon />
              </div>
              <div className="border rounded-full pr-3">
                <select className="p-3 min-w-[100px] rounded-full focus:outline-none">
                  <option value="1">Advanced</option>
                  <option value="2">Delete</option>
                  <option value="3">Publish</option>
                </select>
              </div>
            </form>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[var(--bg-1)] border-b border-dashed">
                  <th className="py-3 lg:py-4 px-4">Tour Name</th>
                  <th className="py-3 lg:py-4 px-2">Location</th>
                  <th className="py-3 lg:py-4 px-2">Agents</th>
                  <th className="py-3 lg:py-4 px-2">Date</th>
                  <th className="py-3 lg:py-4 px-2">Status</th>
                  <th className="py-3 lg:py-4 px-2">Review</th>
                  <th className="py-3 lg:py-4 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {packages.map(
                  ({ _id, NAME, LOCATION, DURATION,AMOUNT, GUESTS }) => (
                    <tr
                      key={_id}
                      className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300">
                      <td className="py-3 lg:py-4 px-4">{NAME}</td>
                      <td className="py-3 lg:py-4 px-2">{LOCATION}</td>
                      <td className="py-3 lg:py-4 px-2">{DURATION}</td>
                      <td className="py-3 lg:py-4 px-2">{AMOUNT}</td>
                      <td className={`py-3 lg:py-4 px-2`}>
                        <div className={`w-32`}>
                          <HeadlessList initialValue={status} />
                        </div>
                      </td>
                      <td className="py-3 lg:py-4 px-2">
                        <span className="flex gap-1 items-center">
                          <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
                          {GUESTS}
                        </span>
                      </td>
                      <td className="py-3 lg:py-4 px-2 ">
                        <button className="text-primary px-1">
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <DeleteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={handleDelete} itemId={"_id"} />
                        
                        <button 
                        onClick={() => setIsModalOpen(true)}
                        className="text-[var(--secondary-500)] px-1">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                        <button>
                          <EllipsisVerticalIcon className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <Pagination />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
