"use client";
import { Tab } from "@headlessui/react";
import {
  CheckBadgeIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}


interface ApiResponse {
  data: BookingData[];
}

interface ErrorResponse {
  message: string;
}

interface BookingData {
  _id:string;
  name:string;
  status:string;
  location:string;
  guests:number;
  amount:number;
  checkinDate: string;
  checkoutDate:string;
}

interface TourResponse {
  data: TourData[];
}

interface TourData {
  _id:string;
  name:string;
}


const PackageCard: React.FC<{ packageInfo: BookingData }> = ({ packageInfo }) => {
  const { _id, name, status,  amount, guests, location, checkinDate, checkoutDate } = packageInfo;

  return (
    <>
 
        <li>
                    <div className="border border-neutral-40 p-4 p-sm-6 xl:p-8 rounded-2xl">
                      <div className="flex gap-4 flex-wrap items-center justify-between">
                        <div className="flex items-center gap-4 flex-wrap">
                          <div className="grid place-content-center w-12 h-12 shadow-lg rounded-full shrink-0">
                            <div className="grid place-content-center w-10 h-10 bg-[var(--primary-light)] text-primary rounded-full">
                              <i className="las la-plane-departure text-2xl"></i>
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h5 className="font-medium mb-1">
                             Tour Name {name}
                            </h5>
                            <ul className="flex items-center flex-wrap list-divider-half-xs">
                              <li>
                                <span className="inline-block text-sm">
                                  <span className="inline-block clr-neutral-500">
                                    Booking ID :
                                  </span>
                                  <span className="inline-block text-[var(--neutral-700)] font-medium">
                                   {_id}
                                  </span>
                                </span>
                              </li>
                              <li>
                                <span className="inline-block text-sm">
                                  <span className="inline-block clr-neutral-500">
                                    Travel Class :
                                  </span>
                                  <span className="inline-block text-[var(--neutral-700)] font-medium">
                                    Bussiness
                                  </span>
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <Link
                          href="#"
                          className="btn-outline text-primary font-semibold shrink-0">
                          Manage Booking
                        </Link>
                      </div>
                      <div className="border border-dashed my-6"></div>
                      <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 lg:col-span-6 xl:col-span-4">
                          <p className="clr-neutral-500"> Check in date </p>
                          <h5 className="mb-0 font-medium">
                            {checkinDate}
                          </h5>
                        </div>
                        <div className="col-span-12 lg:col-span-6 xl:col-span-4">
                          <p className="clr-neutral-500"> Check out date </p>
                          <h5 className="mb-0 font-medium">
                          {checkoutDate}
                          </h5>
                        </div>
                        <div className="col-span-12 lg:col-span-6 xl:col-span-4">
                          <p className="clr-neutral-500"> Booked by </p>
                          <h5 className="mb-0 font-medium"> Guy Hawkins </h5>
                        </div>
                      </div>
                    </div>
                  </li>
    
    </>
  );
};

async function fetchBookingData(userId: string): Promise<BookingData[] > {
  try {
    const response = await fetch(`https://blesstours.onrender.com/api/v1/booking/user/${userId}`);
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.message);
    }

    const responseData: ApiResponse = await response.json();


    console.log("response",responseData.data)
    return responseData.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
}

export default function Page( {
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {


  const { data: session } = useSession();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [packages, setPackages] = useState<BookingData[]>([]);


  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['limit'] ?? '6'

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page) // 5, 10, 15 ...

  const entries = packages.slice(start, end)

  const upcoming = packages.filter(book =>
    book.status === 'upcoming'
  );
  const canceled = packages.filter(book =>
    book.status === 'canceled'
  );
  const completed = packages.filter(book =>
    book.status === 'completed'
  );

  console.log("session",upcoming)

  
  


  useEffect(() => {
    if (session ) {
      const userId = session.user?.id || "";
      //const tokenz = session.user?.token || "";

      //console.log('data', userId)
      const fetchPackages = async (): Promise<void> => {
        try {
          setLoading(true);
          const data = await fetchBookingData(userId);
          
          setPackages(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching packages:', error);
          setLoading(false);
        }
      };
  
      fetchPackages();
    }
    
  }, [session]);




  return (
    <ul className="flex flex-col gap-6">
      <li>
        <div className="p-3 sm:p-4 lg:p-6 p-xl-10 rounded-2xl bg-white shadow-3">
          <h3 className="mb-0 h3 flex-grow"> My Bookings </h3>
          <div className="hr-line my-6"></div>
          <Tab.Group>
            <Tab.List className="col-span-12 border rounded-2xl mb-4 px-4 lg:mb-6 flex flex-wrap justify-between">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "focus:outline-none flex gap-2 items-center font-medium py-4 px-3",
                    selected ? "text-primary border-primary border-b" : ""
                  )
                }>
                <ShoppingBagIcon className="w-5 h-5" />
                <span className="inline-block"> Upcoming Booking </span>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "focus:outline-none flex gap-2 items-center font-medium py-4 px-3",
                    selected ? "text-primary border-primary border-b" : ""
                  )
                }>
                <XMarkIcon className="w-5 h-5" />
                <span className="inline-block"> Canceled Booking </span>
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "focus:outline-none flex gap-2 items-center font-medium py-4 px-3",
                    selected ? "text-primary border-primary border-b" : ""
                  )
                }>
                <CheckBadgeIcon className="w-5 h-5" />
                <span className="inline-block"> Completed Booking </span>
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel className="tab-pane fade show active" id="upcoming">
                <h5 className="mb-4 font-medium">  </h5>
                <ul className="flex flex-col gap-4">
                  {isLoading ? (
                  <p>Loading...</p>
                    ) : (
                      
                      upcoming.map((BookingData) => <PackageCard key={BookingData._id} packageInfo={BookingData} />)
                    
                    )}
                  
                </ul>
              </Tab.Panel>
              <Tab.Panel className="tab-pane fade" id="canceled">
                <h5 className="mb-4 font-medium">  </h5>
                <ul className="flex flex-col gap-4">
                 
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  
                  canceled.map((BookingData) => <PackageCard key={BookingData._id} packageInfo={BookingData} />)
                
                )}
                  
                </ul>
              </Tab.Panel>
              <Tab.Panel className="tab-pane fade" id="completed">
                <h5 className="mb-4 font-medium"> </h5>
                <ul className="flex flex-col gap-4">
                  
                {isLoading ? (
                <p>Loading...</p>
                  ) : (
                    
                    completed.map((BookingData) => <PackageCard key={BookingData._id} packageInfo={BookingData} />)
                  
                  )}
                </ul>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </li>
    </ul>
  );
};

