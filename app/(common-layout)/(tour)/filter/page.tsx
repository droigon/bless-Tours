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
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { toast } from "react-toastify";

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

const fetchFeaturedPackages = async (search: string | null, type: string | null): Promise<PackageInfo[]> => {
    const response = await fetch(`https://blesstours.onrender.com/api/v1/tours/search/tours/title?${type}=${search}&limit=5`);
    const responseData: ApiResponse = await response.json();
    console.log(search)
    return responseData.data || [];
};

const fetchFilteredDate = async (search: string | null, type: string | null): Promise<PackageInfo[]> => {
    const response = await fetch(`https://blesstours.onrender.com/api/v1/tours/search/tours/date?${search}&limit=5`);
    const responseData: ApiResponse = await response.json();
    console.log(search)
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



  const Page: React.FC = () => {
    const [packages, setPackages] = useState<PackageInfo[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    const searchParams = useSearchParams()
    
 


    
  
    useEffect(() => {
      const fetchPackages = async (search: string | null): Promise<void> => {
        try {
          console.log("search",search)
          const data = await fetchFeaturedPackages(search,"q");
          setPackages(data);
          setLoading(false);
          
        } catch (error) {
          console.error('Error fetching packages:', error);
          setLoading(false);
        }
      };
      const fetchDate = async (search: string | null): Promise<void> => {
        try {
          console.log("search",search)
          toast.info('Loading...', {
            position: "bottom-center",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
          const data = await fetchFilteredDate(search,"checkin");
          setPackages(data);
          setLoading(false);
          
        } catch (error) {
          console.error('Error fetching packages:', error);
          setLoading(false);
        }
      };
      if (searchParams.get('q')){
        fetchPackages(searchParams.get('q'));
      }else if (searchParams.get('checkin')){
        fetchDate("checkin="+searchParams.get('checkin') +"&checkout=" + searchParams.get('checkout'))
      }
    }, [searchParams]);
  
  return (
    <>
    
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          packages.map((packageInfo) => <PackageCard key={packageInfo._id} packageInfo={packageInfo} />)
        )}
      
      
      <CardPagination />
    </>
  );
};

export default Page;
