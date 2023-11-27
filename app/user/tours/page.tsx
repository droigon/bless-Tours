"use client";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PaginationControls from "@/components/PaginationControls";
import { useSearchParams } from "next/navigation";
import {url} from "@/utils/index";
interface PackageInfo {
  _id: string;
  NAME: string;
  DURATION: string;
  AMOUNT: number;
  GUESTS: number;
}

interface ApiResponse {
  data: PackageInfo[];
  count?: number;
}

const fetchFeaturedCategory = async (
  search: string | null,
  page: number
): Promise<ApiResponse> => {
  const response = await fetch(
    `${url}/api/v1/tours/category/tours?category=${search}&page=${page}&limit=6`
  );
  const responseData: ApiResponse = await response.json();
  return responseData;
};

const fetchFeaturedPackages = async (page: number): Promise<ApiResponse> => {
  const response = await fetch(
    `${url}/api/v1/tours/?page=${page}&limit=6`
  );
  const responseData: ApiResponse = await response.json();
  return responseData;
};

const fetchFeaturedDates = async (
  checkin: string,
  checkout: string,
  page: number
): Promise<ApiResponse> => {
  const response = await fetch(
    `${url}/api/v1/tours/search/tours/date?checkin=${checkin}&checkout=${checkout}&page=${page}&limit=6`
  );
  const responseData: ApiResponse = await response.json();
  return responseData;
};

const fetchFeaturedTitle = async (
  title: string,
  page: number
): Promise<ApiResponse> => {
  const response = await fetch(
    `${url}/api/v1/tours/search/tours/title?q=${title}&page=${page}&limit=6`
  );
  const responseData: ApiResponse = await response.json();
  return responseData;
};

const fetchFeaturedGuests = async (
  guest: string,
  page: number
): Promise<ApiResponse> => {
  const response = await fetch(
    `${url}/api/v1/tours/search/tours?q=${guest}&page=${page}&limit=6`
  );
  const responseData: ApiResponse = await response.json();
  return responseData;
};

const PackageCard: React.FC<{ packageInfo: PackageInfo }> = ({
  packageInfo,
}) => {
  const { _id, NAME, DURATION, AMOUNT, GUESTS } = packageInfo;

  return (
    <div key={_id} className="col-span-12 md:col-span-6 group">
      <div className="bg-white rounded-2xl p-3">
        <div className="relative">
          <div className="rounded-2xl">
            <Image
              width={400}
              height={306}
              src="/img/tour-details-img-2.jpg"
              alt="image"
              className=" w-full rounded-2xl"
            />
          </div>
          <div className="flex items-center justify-between p-4 absolute top-0 w-full">
            <span className="inline-block py-2 px-5 rounded-full bg-[#58DA90]">
              {} Places
            </span>
            <span className="inline-block py-2 px-5 rounded-full bg-[#FFBF47]">
              {} Activities
            </span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between mb-2">
            <Link
              href={`/user/tours/${_id}`}
              className="link block flex-grow text-xl font-medium"
            >
              {NAME}
            </Link>
            <div className="flex gap-1 items-center shrink-0">
              <i className="las la-star text-[var(--tertiary)]"></i>
              <span className="block"> {} </span>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            <li className="col-span-1">
              <div className="flex items-center gap-2">
                <i className="las la-clock text-xl text-[#22804A]"></i>
                <span className="block"> {DURATION} </span>
              </div>
            </li>
            <li className="col-span-1">
              <div className="flex items-center gap-2">
                <i className="las la-user-friends text-xl text-[#22804A]"></i>
                <span className="block"> Capacity {GUESTS} </span>
              </div>
            </li>
          </ul>
        </div>

        <div className="border-b border-dash-long my-3 mx-4"></div>

        <div className="p-4">
          <div className="flex flex-wrap justify-between items-center">
            <span className="block text-xl font-medium text-primary">
              ${AMOUNT}
              <span className="inline-block font-normal text-base">/trip</span>
            </span>
            <Link
              href={`/user/tours/${_id}`}
              className="btn-outline  font-semibold"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default async function Page() {
  const urlsearchParams = useSearchParams();
  const optionSearchParams = new URLSearchParams(urlsearchParams?.toString());
  const category = optionSearchParams.get("category");
  const title = optionSearchParams.get("title");
  const guests = optionSearchParams.get("guests");
  const checkin = optionSearchParams.get("checkin");
  const checkout = optionSearchParams.get("checkout");
  const [page, setPage] = useState<number>(1);
  let data: PackageInfo[] | null = null;
  let dataCount;
  if (category) {
    const result = await fetchFeaturedCategory(category, page);
    data = result.data;
    dataCount = result.count;
  } else if (title) {
    const result = await fetchFeaturedTitle(title, page);
    data = result.data;
    dataCount = result.count;
  } else if (guests) {
    const result = await fetchFeaturedGuests(guests, page);
    data = result.data;
    dataCount = result.count;
  } else if (checkin && checkout) {
    const result = await fetchFeaturedDates(checkin, checkout, page);
    data = result.data;
    dataCount = result.count;
  } else {
    const result = await fetchFeaturedPackages(page);
    data = result.data;
    dataCount = result.count;
  }

  const endIndex = Math.min(page * 6, dataCount!);

  return (
    <>
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
      {data ? (
        data.map((packageInfo) => (
          <PackageCard key={packageInfo._id} packageInfo={packageInfo} />
        ))
      ) : (
        <h1> No tours found</h1>
      )}

      <PaginationControls
        dataCount={dataCount!}
        page={page}
        setPage={setPage}
      />
    </>
  );
}
