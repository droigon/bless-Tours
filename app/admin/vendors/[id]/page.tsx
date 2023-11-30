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
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Pagination from "@/components/vendor-dashboard/Pagination";
import Image from "next/image";
import { Menu } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { agentListing } from "@/public/data/agentListing";
import HeadlessList from "@/components/ListBox";
import {url} from "@/utils/index";





async function getVendor(id: string) {
  try {
    const response: any = await fetch(
      `${url}/api/v1/vendors/${id!}`
    );
    const res = await response.json();
    console.log(res)
    if (res.statusCode == 200) {
      return res.data;
    } else {
      throw new Error(res.message);
    }
  } catch (error: any) {
    throw new Error(`failed to fetch vendor:${error.message}`);
  }
}

type VendorProps = {
  _id: string;
  EMAIL: string;
  NAME: string;
  PROFILE: string;
  PHONE_NUMBER: string;
  
  //allTours: PackageInfo[];
};

const tooltipStyle = {
  backgroundColor: "#3539E9",
  color: "#fff",
  borderRadius: "10px",
};



interface PackageInfo {
  _id: string;
  NAME: string;
  DURATION: string;
  VENDOR_ID: string;
  AMOUNT: number;
  STATUS: string;
  CATEGORY: string;
  LOCATION: string;
  GUESTS: number;
}


interface ApiResponse {
  data: PackageInfo[];
  count?: number;
}


const BookingRow: React.FC<PackageInfo> = ({

  _id,NAME,LOCATION,AMOUNT,CATEGORY,DURATION,GUESTS
}) => (
  <tr
    key={_id}
    className="border-b border-dashed hover:bg-[var(--bg-1)] duration-300">
    <td
      className="py-3 lg:py-4 px-2 
      lg:px-4">
        <Link href={`/admin/tours/${_id}`}>
      {NAME}
      </Link>
    </td>
    <td className="py-3 lg:py-4 px-2">{LOCATION}</td>
    <td className="py-3 lg:py-4 px-2">${AMOUNT}</td>
    <td className="py-3 lg:py-4 px-2">{CATEGORY}</td>
    <td className={`py-3 lg:py-4 px-2`}>{DURATION}</td>
    <td className={`py-3 lg:py-4 px-2`}>{GUESTS}</td>
    
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

const fetchVendorTours = async (id: string): Promise<ApiResponse> => {

  const response = await fetch(
    `${url}/api/v1/tours/vendor/${id!}?page=1&limit=12`);
  const responseData: ApiResponse = await response.json();
  return responseData;
};


export default async function vendorPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const vendorData: VendorProps = await getVendor(id!);


  
  let data: PackageInfo[] | null = [];
  let dataCount;
  
  const result = await fetchVendorTours(id!);
  data = result.data;
  dataCount = result.count;
  

  return (
    <div className="bg-[var(--bg-2)]">
      <div className="flex items-center justify-between flex-wrap px-3 py-5 md:p-[30px] gap-5 lg:p-[60px] bg-[var(--dark)]">
        <h2 className="h1 font-semibold text-white">Agent Details</h2>
        <Link href="/cab/add-new-cab" className="btn-primary">
          <ArrowDownTrayIcon className="w-5 h-5" /> Download List
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
                  src={vendorData.PROFILE ? (`${vendorData.PROFILE}`)
                    : (
                      ('/img/user-1.jpg')
                    )}
                  alt="vendor "
                />
                <Menu>
                  <Menu.Button className="bg-[#EBEBFD] absolute top-0 right-0 p-2 rounded-full duration-300">
                    <EllipsisVerticalIcon className="w-6 h-6 text-neutral-700" />
                  </Menu.Button>
                  <Menu.Items className="absolute text-left right-0 mt-2 top-8 min-w-[150px] bg-white rounded-md border py-1">
                    <Menu.Item>
                      <button className="w-full text-left p-2 hover:bg-primary hover:text-white duration-300">
                        Edit
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button className="w-full text-left p-2 hover:bg-primary hover:text-white duration-300">
                        Delete
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button className="w-full text-left p-2 hover:bg-primary hover:text-white duration-300">
                        Block
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
              <h5 className="text-xl font-semibold mt-5 text-center">
                {vendorData?.NAME}
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
                    (316) 555-0116
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
                    href={`mailto:/${vendorData?.EMAIL}`} 
                    className="text-lg font-medium">
                    {vendorData?.EMAIL}
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
                    Full Name :{" "}
                    <span className="font-medium">{vendorData?.NAME}</span>
                  </p>
                  <p>
                    User Name : <span className="font-medium">Jenny5485</span>
                  </p>
                  <p>
                    Phone Number :{" "}
                    <span className="font-medium">{vendorData?.PHONE_NUMBER}</span>
                  </p>
                </div>
                <div className="col-span-12 sm:col-span-6 xl:col-span-6 xxl:col-span-3 flex flex-col gap-3">
                  <p>
                    Email ID :{" "}
                    <span className="font-medium">{vendorData?.EMAIL}</span>
                  </p>
                  <p>
                    Gender : <span className="font-medium">Female</span>
                  </p>
                  <p>
                    Location : <span className="font-medium">Dubai, UAE</span>
                  </p>
                </div>
                <div className="col-span-12 sm:col-span-6 xl:col-span-6 xxl:col-span-3 flex flex-col gap-3">
                  <p>
                    Joining Date :{" "}
                    <span className="font-medium">29 Aug 2021 </span>
                  </p>
                  <p>
                    Agent License :{" "}
                    <span className="font-medium">2626JH5D78</span>
                  </p>
                  <p>
                    Tax Number : <span className="font-medium">TR65212JH4</span>
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
                    Total Listings : <span className="font-medium">65.4k</span>
                  </p>
                  <p>
                    Total Earning : <span className="font-medium">$759k</span>
                  </p>
                </div>
              </div>
              <p className="mt-5 text-center">
                
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-white p-4 xl:p-6 mt-6">
          <h3 className="h3 my-4">Listing List</h3>
          <div className="overflow-x-auto">
            <table className="w-full whitespace-nowrap">
              <thead>
                <tr className="text-left bg-[var(--bg-1)] border-b border-dashed">
                  <th className="py-3 lg:py-4 px-2">Name</th>
                  <th className="py-3 lg:py-4 px-2">Location</th>
                  <th className="py-3 lg:py-4 px-2">Amount</th>
                  <th className="py-3 lg:py-4 px-2">Category</th>
                  <th className="py-3 lg:py-4 px-2">Duration</th>
                  <th className="py-3 lg:py-4 px-2">Guests</th>
                  <th className="py-3 lg:py-4 px-2">Action</th>
                </tr>
              </thead>
              <tbody>


              {data ? (
                data.map((tour) => (
                  <BookingRow key={tour._id} {...tour} />
                ))
              ) : (
                <>No tour listing</>
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
