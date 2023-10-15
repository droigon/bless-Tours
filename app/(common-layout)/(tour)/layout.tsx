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


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
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
                    placeholder="Search by car name"
                  />
                  <button
                    type="button"
                    className="border-0 bg-transparent p-0 lh-1">
                    <SearchIcon />
                  </button>
                </div>
                <div className="border-t border-dashed my-6"></div>
                
                <div className="border-t border-dashed my-6"></div>
                <p className="mb-4 text-[var(--neutral-700)] text-xl font-medium">
                  Pricing scale
                </p>
                <CustomRangeSlider />
                <div className="border-t border-dashed my-6"></div>
                <p className="mb-4 text-[var(--neutral-700)] text-xl font-medium">
                  Types of Places
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
