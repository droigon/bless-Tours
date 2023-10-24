"use client";
import Pagination from "@/components/vendor-dashboard/Pagination";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import { recentBookings } from "@/public/data/recentbookings";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import dynamic from "next/dynamic"
import Image from "next/image";
import { candlestick } from "@/public/data/candlestick";
import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import PaginationControls from '@/components/PaginationControls'

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

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


const PackageCard: React.FC<{ packageInfo: BookingData }> = ({ packageInfo }) => {
  const { _id, name, status,  amount,guests,location, checkinDate } = packageInfo;

  return (
    <>
 
        <tr key={_id} className="border-b border-dashed">
          <td className="py-3 px-2">{_id}</td>
          <td className="py-3 px-2">{name}</td>
          <td className="py-3 px-2 text-primary">{location}</td>
          <td className="py-3 px-2">{guests}</td>
          <td className="py-3 px-2">{amount}</td>
          <td className="py-3 px-2">{checkinDate}</td>
          
          <td className={`py-3 px-2`}>
            <span
              className={`py-2 px-3 rounded-xl ${
                status == "Rejected" &&
                "text-[var(--secondary-500)] bg-[#EBFBF2]"
              } ${
                status == "Successfull" &&
                "text-primary bg-[#EBEBFD]"
              } ${
                status == "upcoming" && "text-[#9C742B] bg-[#FFF9ED]"
              }`}>
              {status}
            </span>
          </td>
        </tr>
    
    </>
  );
};

async function fetchBookingData(userId: string): Promise<BookingData[] > {
  try {
    const response = await fetch(`https://blesstours.onrender.com/api/v1/booking/vendor/bookings/${userId}`);
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.message);
    }

    const responseData: ApiResponse = await response.json();
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
  const per_page = searchParams['limit'] ?? '5'

  // mocked, skipped and limited in the real app
  const start = (Number(page) - 1) * Number(per_page) // 0, 5, 10 ...
  const end = start + Number(per_page) // 5, 10, 15 ...

  const entries = packages.slice(start, end)


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
    <div className="px-3 lg:px-6 bg-[var(--bg-1)] pt-6">
      <div className="p-3 sm:p-4 md:px-6 lg:px-10 md:py-6 lg:py-8 rounded-2xl border bg-white">
        <h3 className="mb-4 h3">Earnings</h3>
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="flex flex-col gap-4 lg:gap-6 col-span-12 lg:col-span-6">
            <div className="rounded-2xl border flex justify-between flex-wrap items-center border-dashed p-3 sm:p-6 lg:p-8 gap-3 bg-[var(--bg-2)]">
              <div className="flex gap-3 lg:gap-5 items-center">
                <i className="las la-chart-area text-4xl text-primary bg-white rounded-full p-3"></i>
                <div>
                  <h5 className="text-xl font-medium">Sales this month</h5>
                  <Link className="text-sm text-primary" href="#">
                    View Transaction
                  </Link>
                </div>
              </div>
              <h2 className="h2">$35.5k</h2>
            </div>
            <div className="rounded-2xl border flex justify-between flex-wrap items-center border-dashed p-3 sm:p-6 lg:p-8 gap-3 bg-[var(--secondary-light)]">
              <div className="flex gap-3 lg:gap-5 items-center">
                <i className="las la-chart-bar text-4xl text-[#22804A] bg-white rounded-full p-3"></i>
                <div>
                  <h5 className="text-xl font-medium">To be paid</h5>
                  <Link className="text-sm text-primary" href="#">
                    View Transaction
                  </Link>
                </div>
              </div>
              <h2 className="h2">$15.5k</h2>
            </div>
          </div>
          <div className="py-4 text-white lg:py-6 px-6 col-span-12 lg:col-span-6 lg:px-10 rounded-2xl bg-[url('/img/card.png')] bg-no-repeat bg-cover w-full">
            <div className="flex justify-between items-center mb-6">
              <Image width={60} height={38} src="/img/master-card.png" alt="" />
              <EllipsisVerticalIcon className="w-6 h-6 " />
            </div>
            <span className="text-sm">Total Balance</span>
            <h2 className="h2 text-white mt-4 mb-5">$55.3k</h2>
            <p className="text-xl font-medium mb-3">1554 **** **** 9845</p>
            <div className="flex items-center justify-between">
              <span>Valid thru: 12/26</span>
              <span>CVV: ***</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4 md:px-6 lg:px-10 md:py-6 lg:py-8 rounded-2xl border bg-white mt-4 lg:mt-6">
        <h3 className="mb-4 h3">Earning Average Chart</h3>
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 max-h-[400px]">
            <ApexChart
              options={candlestick}
              series={candlestick.series}
              type="candlestick"
              height={400}
            />
          </div>
        </div>
      </div>
      <div className="bg-white p-3 sm:p-4  md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl my-4 lg:my-6">
        <div className="flex justify-between mb-7">
          <h3 className="h3">Recent Bookings</h3>
          <Link
            href="/"
            className="text-primary font-semibold flex items-center gap-2">
            View All <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="text-left bg-[#F5F5FE] border-b border-dashed">
                  <th className="py-3 px-2">#</th>
                  <th className="py-3 px-2">Name</th>
                  <th className="py-3 px-2">Location</th>
                  <th className="py-3 px-2">Guests</th>
                  <th className="py-3 px-2">Amount</th>
                  <th className="py-3 px-2">Date</th>
                  <th className="py-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
            {isLoading ? (
                <p>Loading...</p>
              ) : (
                
                  entries.map((BookingData) => <PackageCard key={BookingData._id} packageInfo={BookingData} />)
               
              )}
            </tbody>
          </table>
          <PaginationControls
            hasNextPage={end < packages.length}
            hasPrevPage={start > 0}
            dataLength={packages.length}
            url="/vendor/bookings/"
          />
         
        </div>
      </div>
      <Footer />
    </div>
  );
};

