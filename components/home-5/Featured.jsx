import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import SubHeadingBtn from "../SubHeadingBtn";
import { featuredPackage } from "@/public/data/featuredpackage";
import { useState, useEffect } from 'react'
import getTours from "@/public/data/api/requests";
import getUsers from "@/public/data/api/req";


const fetchFeaturedPackages = async () => {
  const response = await fetch('https://blesstours.onrender.com/api/v1/tours/?page=1&limit=9');
  const data = await response.json();
  console.log("get tours",data);
  return data.data || [];
};


const PackageCard = ({ packageInfo }) => {
  const { _id, NAME, DURATION, AMOUNT,GUESTS } = packageInfo;

  return (
    <div className="col-span-12 md:col-span-6 xl:col-span-4 group" key={_id}>
    

    <div className="bg-white rounded-2xl p-3">
                  <div className="relative">
                    <div className="rounded-2xl">
                      
                        <Image
                          width={400}
                          height={306}
                          src="/img/featured-package-1.jpg"
                          alt="image"
                          className="w-full rounded-2xl"
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
                    <Link href={`/tour/${_id}`}
                        className="link block flex-grow text-xl font-medium">
                        {NAME}
                      </Link>
                      <div className="flex gap-1 items-center shrink-0">
                        <i className="las la-star text-[var(--tertiary)]"></i>
                        <span className="block"> {} </span>
                      </div>
                    </div>
                    <ul className="grid grid-cols-2 gap-3 mt-4">
                      <li className="col-span-2 sm:col-span-1">
                        <div className="flex items-center gap-2">
                          <i className="las la-clock text-xl text-[#22804A]"></i>
                          <span className="block"> {DURATION} </span>
                        </div>
                      </li>
                      <li className="col-span-2 sm:col-span-1">
                        <div className="flex items-center gap-2">
                          <i className="las la-user-friends text-xl text-[#22804A]"></i>
                          <span className="block"> Capacity {GUESTS} </span>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="border-b border-dash-long my-2 mx-4"></div>

                  <div className="p-4">
                    <div className="flex flex-wrap justify-between items-center">
                      <span className="block text-xl font-medium text-primary">
                        ${AMOUNT}
                        <span className="inline-block font-normal text-base">
                          /Trip
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

const Featured = () => {

  //'const users = await getUsers()
  
  
  
  const [packages, setPackages] = useState([]);
  const [isLoading, setLoading] = useState(true);

  

  

  useEffect(() => {
    const fetchPackages = async () => {
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



    // run it, run it

  //console.log(tours)

  
  


  return (
    <div className="relative py-[60px] lg:py-[120px] px-3">
      <div className="container">
        <div className="flex flex-wrap items-center gap-4 justify-between mb-10 lg:mb-12">
          <div>
            <SubHeadingBtn text="Featured Package" classes="bg-white" />
            <h2 className="h2 mt-3 ">Our Best Packages</h2>
          </div>
          <Link className="btn-outline  font-semibold" href="/tours?page=1&limit=6">
            See All Package
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">


        {isLoading ? (
          <p>Loading...</p>
        ) : (
          packages.map((packageInfo) => <PackageCard key={packageInfo._id} packageInfo={packageInfo} />)
        )}

       


          
        </div>
      </div>
    </div>
  );
};


export default Featured;