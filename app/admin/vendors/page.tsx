"use client";
import {
  ArrowDownTrayIcon,
  EllipsisVerticalIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneArrowUpRightIcon,
  PlusCircleIcon,
  UserPlusIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Pagination from "@/components/vendor-dashboard/Pagination";
import { SearchIcon } from "@/public/data/icons";
import Image from "next/image";
import { Menu } from "@headlessui/react";
import { agentList } from "@/public/data/agentList";
import { useState } from "react";
import PaginationControls from "@/components/PaginationControls";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react"
import VendorListingList from "@/components/admin-dashboard/VendorListingList";
import {url} from "@/utils/index";

interface PackageInfo {
  _id: string;
  NAME: string;
  EMAIL: string;
  PROFILE: string;
}

interface ApiResponse {
  data: PackageInfo[];
  count?: number;
}

const fetchVendors = async (page: number): Promise<ApiResponse> => {
  const { data: session } = useSession();
  const response = await fetch(
    `${url}/api/v1/vendors/?page=${page}&limit=6`, {
      headers: {
        'Content-Type': 'application/json',
        "x-admin-token": `${session?.user.token!}`, 
        // Add any additional headers if needed
      },
    });
  const responseData: ApiResponse = await response.json();
  return responseData;
};




const PackageCard: React.FC<{ packageInfo: PackageInfo }> = ({
  packageInfo,
}) => {
  const { _id, } = packageInfo;

  return <VendorListingList key={_id} item={packageInfo} />;
};



export default async function Page() {
  const urlsearchParams = useSearchParams();
  const optionSearchParams = new URLSearchParams(urlsearchParams?.toString());
  const pageNo = optionSearchParams.get("page");
  const { data: session } = useSession();
  const [page, setPage] = useState<number>(1);
  
  
  let data: PackageInfo[] | null = null;
  let dataCount;
  
  const result = await fetchVendors(page);
  data = result.data;
  dataCount = result.count;
  

  const endIndex = Math.min(page * 6, dataCount!);


  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Vendor List</h2>
        <Link href="/admin/add-new-vendor" className="btn-primary">
          <UserPlusIcon className="w-5 h-5" /> Add Vendor
        </Link>
      </div>

      {/* Recent bookings */}
      <section className="bg-[var(--bg-2)] px-3 lg:px-6 pb-4 lg:pb-6  relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[60px] after:top-0 after:left-0 ">
        <div className=" py-4 lg:py-8 px-4 xxl:p-8 4xl:px-10 border rounded-2xl bg-white z-[1] relative ">
          <div className="flex flex-wrap gap-3 justify-between mb-7">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="h3">Available Vendors</h3>
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
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            
          {data && (
            <div className="col-span-12">
              <div className="bg-white rounded-lg py-2 px-6 shadow-lg">
                <ul className="flex justify-between items-center flex-wrap gap-3 ">
                  <li className="hidden xl:block">
                    <p className="mb-0 clr-neutral-500">
                      Showing {endIndex} of {dataCount} Results
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {data && (
            data.map((packageInfo) => (
              <PackageCard key={packageInfo._id} packageInfo={packageInfo} />
            ))
          )}
          
         
            
            <div className="col-span-12">
            <PaginationControls
              dataCount={dataCount!}
              page={page}
              setPage={setPage}
            />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

