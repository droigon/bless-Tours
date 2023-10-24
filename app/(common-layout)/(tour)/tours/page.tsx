"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { featuredPackage } from "@/public/data/featuredpackage";
import CardPagination from "@/components/CardPagination";
import React, { useState, useEffect } from 'react';
import PaginationControls from '@/components/PaginationControls'

interface PackageInfo {
  _id: string;
  NAME: string;
  DURATION: string;
  AMOUNT: number;
  GUESTS: number;
}

interface ApiResponse {
  data: PackageInfo[];
} 

const fetchFeaturedPackages = async (): Promise<PackageInfo[]> => {
  const response = await fetch('https://blesstours.onrender.com/api/v1/tours/');
  const responseData: ApiResponse = await response.json();
  return responseData.data || [];
};


const PackageCard: React.FC<{ packageInfo: PackageInfo }> = ({ packageInfo }) => {
  const { _id, NAME, DURATION,  AMOUNT,GUESTS } = packageInfo;

  return (
    <div key={_id} className="col-span-12 md:col-span-6 group">
            <div className="bg-white rounded-2xl p-3">
              <div className="relative">
                <div className="rounded-2xl">
                <Image
                        width={400}
                        height={306}
                        src="/img/tour-details-img-2.jpg"
                        alt="image"
                        className=" w-full rounded-2xl"
                      />
                  
                </div>
                <div className="flex items-center justify-between p-4 absolute top-0 w-full">
                  <span className="inline-block py-2 px-5 rounded-full bg-[#58DA90]">
                    {} Places
                  </span>
                  <span className="inline-block py-2 px-5 rounded-full bg-[#FFBF47]">
                    {} Activities
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-2">
                
                  <Link
                    href={`/tour/${_id}`}
                    className="link block flex-grow text-xl font-medium">
                    {NAME}
                  </Link>
                  <div className="flex gap-1 items-center shrink-0">
                    <i className="las la-star text-[var(--tertiary)]"></i>
                    <span className="block"> {} </span>
                  </div>
                </div>
                <ul className="grid grid-cols-2 gap-3">
                  <li className="col-span-1">
                    <div className="flex items-center gap-2">
                      <i className="las la-clock text-xl text-[#22804A]"></i>
                      <span className="block"> {DURATION} </span>
                    </div>
                  </li>
                  <li className="col-span-1">
                    <div className="flex items-center gap-2">
                      <i className="las la-user-friends text-xl text-[#22804A]"></i>
                      <span className="block"> Capacity {GUESTS} </span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="border-b border-dash-long my-3 mx-4"></div>

              <div className="p-4">
                <div className="flex flex-wrap justify-between items-center">
                  <span className="block text-xl font-medium text-primary">
                    ${AMOUNT}
                    <span className="inline-block font-normal text-base">
                      /trip
                    </span>
                  </span>
                  <Link
                    href="/tour-listing-details"
                    className="btn-outline  font-semibold">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
  );
};




export default function Page( {
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {
  
  const [packages, setPackages] = useState<PackageInfo[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);


  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['limit'] ?? '6'

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page) // 5, 10, 15 ...

  const entries = packages.slice(start, end)
  
    useEffect(() => {
      const fetchPackages = async (): Promise<void> => {
        try {
          const data = await fetchFeaturedPackages();
          setPackages(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching packages:', error);
          setLoading(false);
        }
      };
  
      fetchPackages();
    }, []);
  
  return (
    <>
    <div className="col-span-12">
                  <div className="bg-white rounded-lg py-2 px-6 shadow-lg">
                    <ul className="flex justify-between items-center flex-wrap gap-3 ">
                      <li className="hidden xl:block">
                        <p className="mb-0 clr-neutral-500">
                          Showing {page} of {packages.length} Results
                        </p>
                      </li>
                      
                     
                    </ul>
                  </div>
                </div>
      
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          entries.map((packageInfo) => <PackageCard key={packageInfo._id} packageInfo={packageInfo} />)
        )}
      
       
      
      <PaginationControls
        hasNextPage={end < packages.length}
        hasPrevPage={start > 0}
        dataLength={packages.length}
        url="/tours/"
      />
    </>
  );
};


