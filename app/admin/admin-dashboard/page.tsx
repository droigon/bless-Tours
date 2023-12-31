"use client";
import {
  ArrowRightIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Pagination from "@/components/vendor-dashboard/Pagination";
import { StarIcon } from "@heroicons/react/20/solid";
import { adminRecentListings } from "../../../public/data/adminrecentlisting";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { ApexOptions } from "apexcharts";
import HeadlessList from "@/components/ListBox";
import CounterElement from "@/components/CounterElement";
import BookListingList from "@/components/admin-dashboard/BookListingList";
import { useSession } from "next-auth/react"
import { useState } from "react";
import PaginationControls from "@/components/PaginationControls";
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

interface ApiResponse {
  data: PackageInfo[];
  count?: number;
}

const fetchUsers = async (page: number): Promise<ApiResponse> => {
  const { data: session } = useSession();
  const token = session?.user.token;

  const response = await fetch(
    `${url}/api/v1/booking/?page=1}&limit=6`, {
      headers: {
        'Content-Type': 'application/json',
        "x-admin-token": `${token!}`, 
        // Add any additional headers if needed
      },
    });
  const responseData: ApiResponse = await response.json();
  return responseData;
};




const PackageCard: React.FC<{ packageInfo: PackageInfo }> = ({
  packageInfo,
}) => {
  const { _id } = packageInfo;

  return <BookListingList key={_id} item={packageInfo} />;
};





export default async function Page() {



  

  let data: PackageInfo[] | null = null;
  let dataCount;
  
  const result = await fetchUsers(1!);
  data = result.data;
  dataCount = result.count;

  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Dashboard</h2>
        <Link href="/admin/add-new-vendor" className="btn-primary">
          <PlusCircleIcon className="w-5 h-5" /> Add New Vendor
        </Link>
      </div>
      {/* statisticts */}
      <section className="grid z-[1] grid-cols-12 gap-4 lg:gap-6 px-3 lg:px-6 bg-[var(--bg-2)] relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[100px] after:top-0 after:left-0 after:z-[-1] pb-10 xxl:pb-0">
        <div className="col-span-12 xxl:col-span-6">
          <div className=" rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
            <h3 className="h3 mb-4 lg:mb-6">Welcome System</h3>
            <div className="grid grid-cols-12 gap-4 lg:gap-6">
              <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD] items-center">
                <i className="las self-center la-file-alt rounded-full bg-primary text-white text-3xl p-4"></i>
                <div>
                  <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                    <CounterElement end={66} />
                  </h2>
                  <p>Total Listings</p>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBFBF2] items-center">
                <i className="las self-center la-chart-area rounded-full bg-[var(--secondary-500)] text-white text-3xl p-4"></i>
                <div>
                  <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                    $
                    <CounterElement end={256} />k
                  </h2>
                  <p>Earning</p>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#FFF9ED] items-center">
                <i className="las self-center la-chart-bar rounded-full bg-[#9C742B] text-white text-3xl p-4"></i>
                <div>
                  <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                    <CounterElement end={6.4} decimals={1} />k
                  </h2>
                  <p>Visitors</p>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 p-4 xxl:p-5 3xl:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD] items-center">
                <i className="lar self-center la-star rounded-full bg-primary text-white text-3xl p-4"></i>
                <div>
                  <h2 className="text-lg md:text-2xl md:font-semibold xxl:4xl xxl:font-semibold 3xl:text-[40px]">
                    <CounterElement end={7.6} decimals={1} />k
                  </h2>
                  <p>Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 xxl:col-span-6 rounded-2xl p-4 md:p-6 lg:p-8 bg-white border">
          <div className="flex justify-between flex-wrap gap-3 items-center mb-6">
            <h3 className="h3">Guest Activity</h3>
            <div className="flex items-center flex-wrap gap-3">
              <span>Sort By:</span>
              <div className="p-3 border rounded-full ml-2">
                <select className="focus:outline-none">
                  <option value="1">Last 7 Month</option>
                  <option value="2">Last 7 Week</option>
                  <option value="3">Last 7 Days</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            
          </div>
        </div>
      </section>

   

      {/* Recent bookings */}
      <section className="bg-[var(--bg-2)] px-3 lg:px-6 pb-4 lg:pb-6 mt-4 lg:mt-6">
        <div className="p-3 sm:p-4 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white">
          <div className="flex flex-wrap gap-2 justify-between mb-7">
            <h3 className="h3">Recent Bookings</h3>
            <Link
              href="/admin/booking"
              className="text-primary font-semibold flex items-center gap-2">
              View All <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[var(--bg-1)] border-b border-dashed">
                  <th className="py-3 lg:py-4 px-2 xl:px-4">User</th>
                  <th className="py-3 lg:py-4 px-2">Vendor</th>
                  <th className="py-3 lg:py-4 px-2">Amount</th>
                  <th className="py-3 lg:py-4 px-2">Location</th>
                  <th className="py-3 lg:py-4 px-2">Guests</th>
                  <th className="py-3 lg:py-4 px-2">Check In Date</th>
                  <th className="py-3 lg:py-4 px-2">Status</th>
                  <th className="py-3 lg:py-4 px-2">Action</th>
                </tr>
              </thead> 
              <tbody>
              {!data ? (
              <p>No booking available</p>
              ) : (
                data.map((packageInfo) => (
                  <PackageCard key={packageInfo._id} packageInfo={packageInfo} />
                ))
              )}
              </tbody>
            </table>
       
          </div>
        </div>
      </section>

      
      {/* Footer */}
      <Footer />
    </div>
  );
};

