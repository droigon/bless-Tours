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
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { createUrl } from "@/src/utils/createUrl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const urlsearchParams = useSearchParams();
  const optionSearchParams = new URLSearchParams(urlsearchParams?.toString());
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const [title, setTitle] = useState<string>(
    optionSearchParams.get("title") || ""
  );
  const [guest, setGuest] = useState<string>(
    optionSearchParams.get("guests") || ""
  );

  const filterByTitle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    optionSearchParams.set("title", title!);
    setGuest("");
    setDateRange([null, null]);
    optionSearchParams.delete("checkin");
    optionSearchParams.delete("checkout");
    optionSearchParams.delete("guests");
    optionSearchParams.delete("category");
    const optionUrl = createUrl(pathname!, optionSearchParams);
    router.replace(optionUrl, { scroll: false });
  };

  const filterByDate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const firstDate = startDate ? startDate.getTime() / 1000 : 0;
    const lastDate = endDate ? endDate.getTime() / 1000 : 0;

    optionSearchParams.set("checkin", firstDate.toString());
    optionSearchParams.set("checkout", lastDate.toString());
    setTitle("");
    setGuest("");
    optionSearchParams.delete("title");
    optionSearchParams.delete("guests");
    optionSearchParams.delete("category");
    const optionUrl = createUrl(pathname!, optionSearchParams);
    router.replace(optionUrl, { scroll: false });
  };

  const filterByGuests = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    optionSearchParams.set("guests", guest!);
    setTitle("");
    setDateRange([null, null]);
    optionSearchParams.delete("title");
    optionSearchParams.delete("checkin");
    optionSearchParams.delete("checkout");
    optionSearchParams.delete("category");
    const optionUrl = createUrl(pathname!, optionSearchParams);
    router.replace(optionUrl, { scroll: false });
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    optionSearchParams.delete("checkin");
    optionSearchParams.delete("checkout");
    optionSearchParams.delete("category");
    optionSearchParams.delete("guests");
    const optionUrl = createUrl(pathname!, optionSearchParams);
    router.replace(optionUrl, { scroll: false });
  };

  return (
    <>
      <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
        <div className="container">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <div className="col-span-12 lg:col-span-4 order-2 lg:order-1">
              <div className="p-3 sm:p-4 lg:py-6 lg:px-8 bg-white rounded-2xl shadow-lg">
                <h4 className="mb-0 text-2xl font-semibold"> Filter </h4>
                <div className="border-t border-dashed my-6"></div>
                <form className="flex items-center justify-between rounded-full border border-neutral-40 bg-[var(--bg-2)] px-5 py-3">
                  <input
                    type="text"
                    className="w-full bg-transparent border-0 focus:outline-none"
                    placeholder="Search by title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <button
                    type="submit"
                    onClick={filterByTitle}
                    className="border-0 bg-transparent p-0 lh-1"
                  >
                    <SearchIcon />
                  </button>
                </form>

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
                    className="border-0 bg-transparent p-0 lh-1"
                  >
                    <SearchIcon />
                  </button>
                </div>
                <form className="mt-4 flex items-center justify-between rounded-full border border-neutral-40 bg-[var(--bg-2)] px-5 py-3">
                  <input
                    type="number"
                    className="w-full bg-transparent border-0 focus:outline-none"
                    placeholder="Guests"
                    value={guest}
                    onChange={(e) => setGuest(e.target.value)}
                  />
                  <button
                    type="submit"
                    onClick={filterByGuests}
                    className="border-0 bg-transparent p-0 lh-1"
                  >
                    <SearchIcon />
                  </button>
                </form>

                <div className="border-t border-dashed my-6"></div>
                <p className="mb-4 text-[var(--neutral-700)] text-xl font-medium">
                  Holy Land Places
                </p>
                <ul className="flex flex-col gap-3">
                  {placeTypes.map((place) => (
                    <li
                      className="flex justify-between items-center"
                      key={place.id}
                    >
                      <CheckboxCustom label={place.title} />
                      <span>{place.number}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-dashed my-6"></div>

                <div className="border-t border-dashed my-6"></div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-outline  w-full flex justify-center items-center text-primary gap-2"
                >
                  <ArrowPathIcon className="w-5 h-5" />
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="col-span-12 lg:col-span-8 order-1 lg:order-2">
              <div className="grid grid-cols-12 gap-4 lg:gap-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
