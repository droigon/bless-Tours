"use client";

import CheckboxCustom from "@/components/Checkbox";
import CustomRangeSlider from "@/components/RangeSlider";
import { SearchIcon } from "@/public/data/icons";
import { placeTypes } from "@/public/data/placeTypes";
import { tourtypes } from "@/public/data/tourtypes";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  ListBulletIcon,
  MapPinIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState,useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const path = usePathname();
  const router = useRouter();
  const title= useRef('')
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  
  console.log(path)

  const filterByTitle = () => { 
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("q", title.toString());
    console.log(searchParams)

    const newPathname = `/filter/?q=${title.current}&limit=5`;
    //Router.push("/user/personal-info");
    setDateRange([null,null])
    router.push(newPathname);
  }
  
  const filterByDate = () => { 
    console.log("send")
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("q", title.toString());
    
    const firstDate = startDate ? startDate.getTime() / 1000 : 0;
    const lastDate = endDate ? endDate.getTime() / 1000 : 0;

    const newPathname = `/filter/?checkin=${firstDate}&checkout=${lastDate}`;
    //Router.push("/user/personal-info");
    setTimeout(() => {
      router.push(newPathname,{ shallow: true });
    }, 0); 
   
  }
  


  return (
    <>
      <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
        <div className="container">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <div className="col-span-12 lg:col-span-4 order-2 lg:order-1">
              <div className="p-3 sm:p-4 lg:py-6 lg:px-8 bg-white rounded-2xl shadow-lg">
                <h4 className="mb-0 text-2xl font-semibold"> Filter </h4>
                <div className="border-t border-dashed my-6"></div>
                <div className="flex items-center justify-between rounded-full border border-neutral-40 bg-[var(--bg-2)] px-5 py-3">
                  <input
                    type="text"
                    className="w-full bg-transparent border-0 focus:outline-none"
                    placeholder="Search by title"
                    onChange={(e) => (title.current = e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={filterByTitle}
                    className="border-0 bg-transparent p-0 lh-1">
                    <SearchIcon />
                  </button>
                </div>
              
                
                <div className="border-t border-dashed my-6"></div>
                <p className="mb-4 text-[var(--neutral-700)] text-xl font-medium">
                  Date and Guest
                </p>
                <div className="flex items-center justify-between rounded-full border border-neutral-40 bg-[var(--bg-2)] px-5 py-3">
                <DatePicker
                  placeholderText="Check In - Check Out"
                  selectsRange={true}
                  startDate={startDate}
                  dateFormat="dd-MM-yyyy"
                  endDate={endDate}
                  onChange={(update) => setDateRange(update)}
                  className="w-full bg-transparent border-0 focus:outline-none"
                />
                  
                  <button
                    type="button"
                    onClick={filterByDate}
                    className="border-0 bg-transparent p-0 lh-1">
                    <SearchIcon />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-full border border-neutral-40 bg-[var(--bg-2)] px-5 py-3">
                  <input
                    type="text"
                    className="w-full bg-transparent border-0 focus:outline-none"
                    placeholder="Guests"
                  />
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 lh-1">
                    <SearchIcon />
                  </button>
                </div>
                
                <div className="border-t border-dashed my-6"></div>
                <p className="mb-4 text-[var(--neutral-700)] text-xl font-medium">
                 Holy Land Places
                </p>
                <ul className="flex flex-col gap-3">
                  {placeTypes.map((place) => (
                    <li
                      className="flex justify-between items-center"
                      key={place.id}>
                      <CheckboxCustom label={place.title} />
                      <span>{place.number}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-dashed my-6"></div>

                
                <div className="border-t border-dashed my-6"></div>
                <Link
                  href="#"
                  className="btn-outline  w-full flex justify-center items-center text-primary gap-2">
                  <ArrowPathIcon className="w-5 h-5" />
                  Reset Filters
                </Link>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8 order-1 lg:order-2">
              <div className="grid grid-cols-12 gap-4 lg:gap-6">
                
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
