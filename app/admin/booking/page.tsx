"use client";
import {
  ArrowDownTrayIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import { SearchIcon } from "@/public/data/icons";
import { guestList } from "@/public/data/guestList";
import HeadlessList from "@/components/ListBox";
import { useSession } from "next-auth/react"
import { useState } from "react";
import PaginationControls from "@/components/PaginationControls";
import Image from "next/image";

import { useRouter } from "next/navigation";
import BookListingList from "@/components/admin-dashboard/BookListingList";
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
    `${url}/api/v1/booking/?page=${page!}&limit=6`, {
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

  

  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const token = session?.user.token;

  let data: PackageInfo[] | null = null;
  let dataCount;
  
  const result = await fetchUsers(1!);
  data = result.data;
  dataCount = result.count;
  

  const endIndex = Math.min(page * 6, dataCount!);



  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h2 text-white">Booking List</h2>
        <Link href="/cab/add-new-cab" className="btn-primary">
          <ArrowDownTrayIcon className="w-5 h-5" /> Download List
        </Link>
      </div>

      {/* Recent bookings */}
      <section className="bg-[var(--bg-2)] px-3 lg:px-6 pb-4 lg:pb-6  relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[60px] after:top-0 after:left-0 xxl:pb-0">
        <div className="p-3 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white relative z-[1]">
          <div className="flex flex-wrap gap-3 justify-between mb-7">
            <div className="flex flex-wrap items-center gap-3">
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
                  <th className="py-3 lg:py-4 px-2">User</th>
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
            <PaginationControls
              dataCount={dataCount!}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

