"use client";
import {
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  EllipsisVerticalIcon,
  EnvelopeOpenIcon,
  MapPinIcon,
  PencilSquareIcon,
  PhoneArrowUpRightIcon,
  TicketIcon,
  TrashIcon,
  PencilIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Pagination from "@/components/vendor-dashboard/Pagination";
import Image from "next/image";
import { Menu } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { agentListing } from "@/public/data/agentListing";
import HeadlessList from "@/components/ListBox";
import DeleteModal from '@/components/admin-dashboard/DeleteModal';
import { getServerSession } from "next-auth";
import { toast } from "react-toastify";
import {url} from "@/utils/index";

async function getUser(id: string) {
  try {
    const response: any = await fetch(
      `${url}/api/v1/users/${id}`
    );
    const res = await response.json();
    if (res.statusCode == 200) {
      return res.data;
    } else {
      throw new Error(res.message);
    }
  } catch (error: any) {
    throw new Error(`failed to fetch vendor:${error.message}`);
  }
}

interface BookingInfo {
  name: string;
  status: string;
  location: string;
  amount: number;
  guests: number;
  _id: string;
}





interface ApiResponse {
  result: BookingInfo[];
  count?: number;
}

type UserProps = {
  _id: string;
  ID: string;
  EMAIL: string;
  NAME: string;
  PROFILE: string;
  FIRSTNAME: string;
  LASTNAME: string;
  IDENTITY: string;
  INSURANCE_DOC: string;
  PROFILE_PICTURE:string;
  PHONE_NUMBER: number;
  joinedOn: string;
  
  bookings: {
    name: string;
    description: string;
    status: string;
    location: string;
    title: string;
    _id: number;
  }[];
};

const tooltipStyle = {
  backgroundColor: "#3539E9",
  color: "#fff",
  borderRadius: "10px",
};

const BookingRow: React.FC<BookingInfo> = ({
  name,
  status,
  location,
  guests,
  amount,
  _id,
}) => (
  <tr
    key={_id}
    className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300">
    <td
      className="py-3 lg:py-4 px-2 lg:px-4">
      {name}
    </td>
    <td className="py-3 lg:py-4 px-2">{location}</td>
    <td className="py-3 lg:py-4 px-2">{}</td>
    <td className="py-3 lg:py-4 px-2">$ {}</td>
    <td className={`py-3 lg:py-4 px-2`}>
      <div className={`w-32`}>
        <HeadlessList initialValue={status} _id={_id} />
      </div>
    </td>
    <td className="py-3 lg:py-4 px-2">
      <span className="flex gap-1 items-center">
        <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
        {}
      </span>
    </td>
    <td className="py-3 lg:py-4 px-2 flex gap-2 items-center">
      <button className="text-primary">
        <PencilSquareIcon className="w-5 h-5" />
      </button>
      <button className="text-[var(--secondary-500)]">
        <TrashIcon className="w-5 h-5" />
      </button>
      <button>
        <EllipsisVerticalIcon className="w-5 h-5" />
      </button>
    </td>
  </tr>
);



const fetchBookings = async (page: string): Promise<ApiResponse> => {

  const response = await fetch(
    `${url}/api/v1/booking/user/?page=${page!}&limit=6`);
  const responseData: ApiResponse = await response.json();
  return responseData;
};

export default async function Page({ params }: { params?: { id: string } }) {
  const userId = params?.id || ''; // Default to an empty string if params or id is undefined
  const userData: UserProps = await getUser(userId);
  // Rest of your code...
  
  
  


  let data: BookingInfo[] | null = [];
  let dataCount;
  
  const result = await fetchBookings(params?.id!);
  data = result.result;
  dataCount = result.count;
  



  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h1 font-semibold text-white">User Details</h2>
        <Link href="#" className="btn-primary">
          <PencilIcon className="w-5 h-5" /> Edit User
        </Link>
      </div>

      {/* Recent bookings */}
      <section className="bg-[var(--bg-2)] px-3 lg:px-6 pb-4 lg:pb-6 relative after:absolute after:bg-[var(--dark)] after:w-full after:h-[60px] after:top-0 after:left-0 ">
        <div className="grid grid-cols-12 gap-4 lg:gap-6 relative z-[1]">
          <div className="col-span-12 xl:col-span-4 xxl:col-span-3">
            <div className="rounded-2xl bg-white p-4 xl:p-6">
              <div className="relative w-full flex justify-center">
                <Image
                  width={80}
                  height={80}
                  className="rounded-full"
                  src={userData.PROFILE_PICTURE ? (`${userData?.PROFILE_PICTURE}`)
                    : (
                      ('/img/user-1.jpg')
                    )}
                  alt="user"
                />

              </div>
              <h5 className="text-xl font-semibold mt-5 text-center">
              {userData?.FIRSTNAME} {userData?.LASTNAME}
              </h5>
              <div className="flex gap-2 justify-center text-[var(--tertiary)] mt-2 border-b border-dashed pb-5">
                <i className="las la-star"></i>
                <i className="las la-star"></i>
                <i className="las la-star"></i>
                <i className="las la-star"></i>
                <i className="las la-star-half-alt"></i>
              </div>
              <h5 className="text-xl font-medium mt-4">Contact Details</h5>
              <div className="mt-5 flex gap-3 items-center">
                <div className="rounded-full bg-[var(--primary-light)] w-14 h-14 flex items-center justify-center">
                  <PhoneArrowUpRightIcon className="w-7 h-8 text-primary" />
                </div>
                <div className="">
                  <p className="text-sm">Phone</p>
                  <Link href="tel:00000000000" className="text-lg font-medium">
                  +{userData?.PHONE_NUMBER}
                  </Link>
                </div>
              </div>
              <div className="mt-5 flex gap-3 items-center">
                <div className="rounded-full bg-[#EBFBF2] w-14 h-14 flex items-center justify-center">
                  <EnvelopeOpenIcon className="w-7 h-8 text-[var(--secondary-500)]" />
                </div>
                <div className="">
                  <p className="text-sm">Email</p>
                  <Link
                    href={`mailto:/${userData?.EMAIL}`} 
                    className="text-lg font-medium">
                    {userData?.EMAIL}
                  </Link>
                </div>
              </div>
              <div className="mt-5 flex gap-3 items-center">
                <div className="rounded-full bg-[#FFF9ED] w-14 h-14 flex items-center justify-center">
                  <MapPinIcon className="w-7 h-8 text-[#9C742B]" />
                </div>
                <div className="">
                  <p className="text-sm">Address</p>
                  <span className="text-lg font-medium">Dubai, UAE</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-8 xxl:col-span-9">
            <div className="rounded-2xl bg-white p-4 xl:p-6">
              <h3 className="h3 mb-5 xl:mb-7">Personal Informatoin</h3>
              <div className="flex flex-wrap gap-4 xl:gap-6 border-b pb-8 border-dashed">
                <div className="bg-white border w-[300px] md:w-[350px] rounded-2xl p-4 xl:p-6 flex items-center gap-4 xxl:gap-8">
                  <div className="w-20 h-20 flex items-center justify-center bg-[var(--primary-light)] rounded-full">
                    <TicketIcon className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h2 className="h2 mb-2">65.4k</h2>
                    <span>Total Listings</span>
                  </div>
                </div>
                <div className="bg-white border w-[300px] md:w-[350px] rounded-2xl p-4 xl:p-6 flex items-center gap-4 xxl:gap-8">
                  <div className="w-20 h-20 flex items-center justify-center bg-[#EBFBF2] rounded-full">
                    <CalendarDaysIcon className="w-10 h-10 text-[var(--secondary-500)]" />
                  </div>
                  <div>
                    <h2 className="h2 mb-2">120</h2>
                    <span>Booking this month</span>
                  </div>
                </div>
                <div className="bg-white border w-[300px] md:w-[350px] rounded-2xl p-4 xl:p-6 flex items-center gap-4 xxl:gap-8">
                  <div className="w-20 h-20 flex items-center justify-center bg-[#FFF9ED] rounded-full">
                    <ChartBarIcon className="w-10 h-10 text-[#9C742B]" />
                  </div>
                  <div>
                    <h2 className="h2 mb-2">$795k</h2>
                    <span>Total Earning</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 mt-6 border-b border-dashed pb-7">
                <div className="col-span-12 sm:col-span-6 xl:col-span-6 xxl:col-span-3 flex flex-col gap-3">
                  <p>
                    First Name :{" "}
                    <span className="font-medium">{userData?.FIRSTNAME} </span>
                  </p>
                  <p>
                    Last Name:{" "} 
                    <span className="font-medium">{userData?.LASTNAME}</span>
                  </p>
                  <p>
                   
                  </p>
                </div>
                <div className="col-span-12 sm:col-span-6 xl:col-span-6 xxl:col-span-3 flex flex-col gap-3">
                  <p>
                    Email ID :{" "}
                    <span className="font-medium"> {userData?.EMAIL} </span>
                  </p>
                  <p>
                    Gender : <span className="font-medium">Male</span>
                  </p>
           
                </div>
                <div className="col-span-12 sm:col-span-6 xl:col-span-6 xxl:col-span-3 flex flex-col gap-3">
                  <p>
                    Joining Date :{" "}
                    <span className="font-medium">{userData?.joinedOn}</span>
                  </p>
                  <p>
                    Phone Number :{" "}
                    <span className="font-medium">{userData?.PHONE_NUMBER}</span>
                  </p>
              
                </div>
                <div className="col-span-12 sm:col-span-6 xl:col-span-6 xxl:col-span-3 flex flex-col gap-3">
                  <p className="flex">
                    Reviews :{" "}
                    <span className="font-medium flex">
                      <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
                      4.8
                    </span>
                  </p>
                  <p>
                  Location : <span className="font-medium">Dubai, UAE</span>
                  </p>
                 
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4  mt-6 border-b border-dashed pb-7">
                <div className="col-span-12 xl:col-span-12">
                  <div className="w-30 h-50 relative">
                  <p className="mt-6 mb-4 text-xl font-medium">
                          Insurance Document :
                        </p>
                    <iframe
                      src={`${userData?.INSURANCE_DOC}#toolbar=0`}
                      width="100%"
                      height="400px"
                      className=" rounded-2xl w-full"
                    />
                  </div>
                </div>
                <div className="col-span-12 xl:col-span-12">
                <p className="mt-6 mb-4 text-xl font-medium">
                          Identity Document :
                        </p>
                  <iframe
                      src={`${userData?.IDENTITY}#toolbar=0`}
                      width="100%"
                      height="400px"
                      className=" rounded-2xl w-full"
                    />
                </div>
             </div>

              <p className="mt-5 text-center">
                
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4 xl:p-6 mt-6">
          <h3 className="h3 my-4">User Bookings</h3>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[var(--bg-1)] border-b border-dashed">
                  <th className="py-3 lg:py-4 px-2">Name</th>
                  <th className="py-3 lg:py-4 px-2">Location</th>
                  <th className="py-3 lg:py-4 px-2">Date</th>
                  <th className="py-3 lg:py-4 px-2">Price</th>
                  <th className="py-3 lg:py-4 px-2">Status</th>
                  <th className="py-3 lg:py-4 px-2">Review</th>
                  <th className="py-3 lg:py-4 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
              {data ? (
                data.map((booking) => (
                  <BookingRow key={booking._id} {...booking} />
                ))
              ) : (
                <>No user booking</>
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
