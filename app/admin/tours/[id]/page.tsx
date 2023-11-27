"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Tooltip } from "react-tooltip";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Link from "next/link";
import { useState } from "react";
import { Tab } from "@headlessui/react";
import { CheckIcon, StarIcon } from "@heroicons/react/20/solid";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowsRightLeftIcon,
  CalendarDaysIcon,
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleLeftRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  HandThumbUpIcon,
  HeartIcon,
  MapPinIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import HotelDetailsFeaturedRoom from "@/components/HotelDetailsFeaturedRoom";
import CheckboxCustom from "@/components/Checkbox";
import {url} from "@/utils/index";


function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface PackageInfo {
  _id: string;
  NAME: string;
  LOCATION: string;
  DESCRIPTION: string;
  IMAGE: string;
  PRICE: number;
  AMOUNT: 46456;
  CANCELLATION_POLICY: string;
  CATEGORY: string;
  DURATION: number;
  EXCLUSION: [string];
  GUESTS: number;
  ID: string;
  IMAGES: [string];
  INCLUSION: [string];
  ITENARY: [
    {
      description: string;
      location: string;
      name: string;
      title: string;
    }
  ];
  REFUND_POLICY: string;
  VENDOR_ID: {
    ID:string;
    NAME:string;
    PROFILE:string;
    allBookings:[];
    joinedOn:string;
  };
}

const Tour = async (id: string): Promise<PackageInfo> => {
  try {
    const response = await fetch(
      `${url}/api/v1/tours/${id}`
    );
    const res = await response.json();
    if (res.statusCode == 200) {
      return res.data;
    } else {
      throw new Error(res.message);
    }
  } catch (error: any) {
    throw new Error(`failed to fetch tour:${error.message}`);
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const data = await Tour(params.id);
  console.log("listing data:", data);

  const tooltipStyle = {
    backgroundColor: "#3539E9",
    color: "#fff",
    borderRadius: "10px",
  };

  return (
    <main>
      <div className="bg-[var(--bg-2)]">
        <div className="container-fluid p-0">
          <div>
            <div className="col-span-12">
              <Swiper
                loop={true}
                slidesPerView="auto"
                spaceBetween={16}
                centeredSlides={true}
                centeredSlidesBounds={true}
                navigation={{
                  nextEl: ".btn-next",
                  prevEl: ".btn-prev",
                }}
                breakpoints={{
                  576: {
                    slidesPerView: 2.25,
                  },
                  768: {
                    slidesPerView: 2.5,
                  },
                  1200: {
                    slidesPerView: 3.25,
                  },
                }}
                modules={[Navigation]}
                className="swiper property-gallery-slider"
              >
                <div className="swiper-wrapper">
                  {data.IMAGES.map((image, index) => {
                    return (
                      <SwiperSlide className="swiper-slide" key={index}>
                        <Image
                          width={618}
                          height={600}
                          src={image}
                          alt={`image ${index}`}
                          className=" rounded-2xl"
                        />
                      </SwiperSlide>
                    );
                  })}
                </div>
                <button className="btn-prev absolute top-[45%] left-4 z-[1] bg-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary hover:text-white duration-300">
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button className="btn-next absolute top-[45%] right-4 z-[1] bg-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-primary hover:text-white duration-300">
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--bg-2)] py-[30px] lg:py-[60px] px-3">
        <div className="container">
          <div className="grid grid-cols-12 gap-4 lg:gap-6">
            <div className="col-span-12 xl:col-span-8">
              <div className="section-space--sm">
                <div className="p-3 sm:p-4 lg:p-6 bg-white rounded-2xl mb-10">
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
                    <h2 className="mt-4 h2 mb-0"> {data.NAME} </h2>
                    <ul className="flex gap-3 items-center">
                      <li>
                        <Link
                          href="#"
                          className="link w-8 h-8 grid place-content-center bg-[var(--primary-light)] text-primary rounded-full hover:bg-primary hover:text-white"
                        >
                          <HeartIcon className="h-5 w-5" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="link w-8 h-8 grid place-content-center bg-[var(--primary-light)] text-primary rounded-full hover:bg-primary hover:text-white"
                        >
                          <ArrowsRightLeftIcon className="w-5 h-5" />
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="#"
                          className="link w-8 h-8 grid place-content-center bg-[var(--primary-light)] text-primary rounded-full hover:bg-primary hover:text-white"
                        >
                          <ShareIcon className="w-5 h-5" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <ul className="flex flex-wrap items-center justify-between gap-4 gap-md-0">
                    <li>
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="w-5 h-5 text-[var(--secondary-500)]" />
                        <p className="mb-0"> {data.LOCATION} </p>
                      </div>
                    </li>
                    <li className="text-primary text-lg">•</li>
                    <li>
                      <p className="mb-0">
                        ID: <span className="text-primary">{data.ID}</span>
                      </p>
                    </li>
                    <li className="text-primary text-lg">•</li>
                    <li>
                      <div className="flex items-center gap-1">
                        <StarIcon className="w-5 h-5 text-[var(--tertiary)]" />
                        <p className="mb-0"> 4.5(66) </p>
                      </div>
                    </li>
                    <li className="text-primary text-lg">•</li>
                    <li>
                      <p className="mb-0">
                        <span className="clr-neutral-500">Published:</span> Feb
                        9, 23
                      </p>
                    </li>
                  </ul>
                  <div className="border border-dashed my-8"></div>
                  <ul className="flex items-center flex-wrap gap-3">
                    <li>
                      <span className="block text-lg font-medium">
                        Facilities -
                      </span>
                    </li>
                    <li>
                      <div
                        data-tooltip-id="parking"
                        className="grid place-content-center w-10 h-10 rounded-full bg-[var(--bg-2)] text-primary"
                      >
                        <Image
                          width={28}
                          height={28}
                          src="/img/icon-car-parking.png"
                          alt="image"
                          className=" w-7 h-7 object-fit-contain"
                        />
                      </div>
                    </li>
                    <li>
                      <div
                        data-tooltip-id="restaurent"
                        className="grid place-content-center w-10 h-10 rounded-full bg-[var(--bg-2)] text-primary"
                      >
                        <Image
                          width={28}
                          height={28}
                          src="/img/icon-breakfast.png"
                          alt="image"
                          className=" w-7 h-7 object-fit-contain"
                        />
                      </div>
                    </li>
                    <li>
                      <div
                        data-tooltip-id="room"
                        className="grid place-content-center w-10 h-10 rounded-full bg-[var(--bg-2)] text-primary"
                      >
                        <Image
                          width={28}
                          height={28}
                          src="/img/icon-room-service.png"
                          alt="image"
                          className=" w-7 h-7 object-fit-contain"
                        />
                      </div>
                    </li>
                    <li>
                      <div
                        data-tooltip-id="fitness"
                        className="grid place-content-center w-10 h-10 rounded-full bg-[var(--bg-2)] text-primary"
                      >
                        <Image
                          width={28}
                          height={28}
                          src="/img/icon-fitness.png"
                          alt="image"
                          className=" w-7 h-7 object-fit-contain"
                        />
                      </div>
                    </li>
                    <li>
                      <div
                        data-tooltip-id="swimming"
                        className="grid place-content-center w-10 h-10 rounded-full bg-[var(--bg-2)] text-primary"
                      >
                        <Image
                          width={28}
                          height={28}
                          src="/img/icon-swimming-pool.png"
                          alt="image"
                          className=" w-7 h-7 object-fit-contain"
                        />
                      </div>
                    </li>
                    <li>
                      <div
                        data-tooltip-id="laundry"
                        className="grid place-content-center w-10 h-10 rounded-full bg-[var(--bg-2)] text-primary"
                      >
                        <Image
                          width={28}
                          height={28}
                          src="/img/icon-laundry.png"
                          alt="image"
                          className=" w-7 h-7 object-fit-contain"
                        />
                      </div>
                    </li>
                    <li>
                      <div
                        data-tooltip-id="free"
                        className="grid place-content-center w-10 h-10 rounded-full bg-[var(--bg-2)] text-primary"
                      >
                        <Image
                          width={28}
                          height={28}
                          src="/img/icon-glob.png"
                          alt="image"
                          className=" w-7 h-7 object-fit-contain"
                        />
                      </div>
                    </li>
                  </ul>
                  <Tooltip
                    id="parking"
                    style={tooltipStyle}
                    offset={7}
                    content="Parking"
                  />
                  <Tooltip
                    id="restaurent"
                    style={tooltipStyle}
                    offset={7}
                    content="Restaurent"
                  />
                  <Tooltip
                    id="room"
                    style={tooltipStyle}
                    offset={7}
                    content="Room Service"
                  />
                  <Tooltip
                    id="fitness"
                    style={tooltipStyle}
                    offset={7}
                    content="Fitness"
                  />
                  <Tooltip
                    id="swimming"
                    style={tooltipStyle}
                    offset={7}
                    content="Swimming"
                  />
                  <Tooltip
                    id="laundry"
                    style={tooltipStyle}
                    offset={7}
                    content="Laundry"
                  />
                  <Tooltip
                    id="free"
                    style={tooltipStyle}
                    offset={7}
                    content="Free Internet"
                  />
                </div>
                <div className="p-3 sm:p-4 lg:p-6 bg-white rounded-2xl mb-10">
                  <h4 className="mb-5 text-2xl font-semibold"> Description </h4>
                  <p className="mb-5 clr-neutral-500">{data.DESCRIPTION}</p>
                  <span
                    // href="#"
                    className="link flex items-center gap-2 text-primary"
                  >
                    <span className="font-semibold inline-block">
                      Read More
                    </span>
                    <ArrowLongRightIcon className="w-5 h-5" />
                  </span>
                </div>
                <div className="p-3 sm:p-4 lg:p-6 bg-white rounded-2xl mb-10">
                  <h4 className="mb-5 text-2xl font-semibold"> Services </h4>
                  <div className="mb-10">
                    <div className="grid grid-cols-12 gap-4 lg:gap-6">
                      <div className="col-span-12 md:col-span-4 lg:col-span-3">
                        <ul className="flex flex-col gap-4">
                          {data.INCLUSION.map((service, index) => {
                            return (
                              <li key={index}>
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                                    <i className="las la-check text-lg text-primary"></i>
                                  </div>
                                  <span className="inline-block">
                                    {service}
                                  </span>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <span
                    // href="#"
                    className="link flex items-center gap-2 text-primary"
                  >
                    <span className="font-semibold inline-block">
                      Read More
                    </span>
                    <ArrowLongRightIcon className="w-5 h-5" />
                  </span>
                </div>
                <div className="p-3 sm:p-4 lg:p-6 bg-white rounded-2xl mb-10">
                  <h4 className="mb-5 text-2xl font-semibold"> Excludes </h4>
                  <ul className="flex flex-col gap-4 mb-5">
                    {data.EXCLUSION.map((excludes, index) => {
                      return (
                        <li key={index}>
                          <div className="flex gap-4">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block">{excludes}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <span
                    // href="#"
                    className="link flex items-center gap-2 text-primary"
                  >
                    <span className="font-semibold inline-block">
                      Read More
                    </span>
                    <ArrowLongRightIcon className="w-5 h-5" />
                  </span>
                </div>

                <div className="p-3 sm:p-4 lg:p-6 bg-white rounded-2xl mb-10">
                  <h4 className="mb-5 text-2xl font-semibold">
                    {" "}
                    Cancellation policy{" "}
                  </h4>
                  <p className="mb-5 clr-neutral-500">
                    {data.CANCELLATION_POLICY}
                  </p>
                  <span
                    // href="#"
                    className="link flex items-center gap-2 text-primary"
                  >
                    <span className="font-semibold inline-block">
                      Read More
                    </span>
                    <ArrowLongRightIcon className="w-5 h-5" />
                  </span>
                </div>
                <div className="p-3 sm:p-4 lg:p-6 bg-white rounded-2xl mb-10">
                  <h4 className="mb-5 text-2xl font-semibold">Refund policy</h4>
                  <p className="mb-5 clr-neutral-500">{data.REFUND_POLICY}</p>
                  <span
                    // href="#"
                    className="link flex items-center gap-2 text-primary"
                  >
                    <span className="font-semibold inline-block">
                      Read More
                    </span>
                    <ArrowLongRightIcon className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-4">
              <div className="bg-white rounded-2xl py-8 px-6">
                <div className="w-32 h-32 border border-[var(--primary)] rounded-full bg-white p-4 grid place-content-center relative mx-auto mb-10">
                  <Image
                    width={96}
                    height={96}
                    src={data.VENDOR_ID.PROFILE}
                    alt={`image ${data.VENDOR_ID.PROFILE}`}
                    className="rounded-full"
                  />
                  <div className="w-8 h-8 grid place-content-center rounded-full border-2 white text-white bg-primary absolute bottom-0 right-0">
                    <CheckIcon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-center text-2xl font-semibold mb-4">
                {data.VENDOR_ID.NAME}
                </h4>
                <ul className="flex items-center gap-3 justify-center flex-wrap mb-7">
                  <li>
                    <p className="mb-0">
                      ID: <span className="text-primary">{data.VENDOR_ID?.ID}</span>
                    </p>
                  </li>
                  <li className="text-primary text-lg">•</li>
                  <li>
                    <p className="mb-0"> Property: {data.VENDOR_ID?.allBookings.length} </p>
                  </li>
                  <li className="text-primary text-lg">•</li>
                  <li>
                    <div className="flex gap-1 items-center">
                      <i className="las la-star text-[var(--tertiary)]"></i>
                      <p className="mb-0"> 4.8 </p>
                    </div>
                  </li>
                </ul>
                <ul className="flex justify-center flex-wrap gap-3">
                  <li>
                    <Link
                      href="#"
                      className="link grid place-content-center duration-300 w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                    >
                      <i className="lab la-facebook-f text-xl"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="link grid place-content-center duration-300 w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                    >
                      <i className="lab la-twitter text-xl"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="link grid place-content-center duration-300 w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                    >
                      <i className="lab la-instagram text-xl"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="link grid place-content-center duration-300 w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                    >
                      <i className="lab la-linkedin-in text-xl"></i>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="link grid place-content-center duration-300 w-9 h-9 rounded-full bg-[var(--primary-light)] text-primary hover:bg-primary hover:text-white"
                    >
                      <i className="lab la-dribbble text-xl"></i>
                    </Link>
                  </li>
                </ul>
                <div className="border border-dashed my-7"></div>
                <ul className="flex flex-col gap-4 mb-10 max-text-30 mx-auto">
                  <li>
                    <div className="flex items-center gap-2">
                      <CalendarDaysIcon className="w-5 h-5 text-primary" />
                      <p className="mb-0"> Joined in June {data.VENDOR_ID?.joinedOn} </p>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-[var(--secondary)]" />
                      <p className="mb-0"> Response rate - 100% </p>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-[var(--tertiary)]" />
                      <p className="mb-0"> Fast response </p>
                    </div>
                  </li>
                </ul>
                <div className="text-center">
                  <Link href="#" className="btn-outline  font-semibold">
                    See Host Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
