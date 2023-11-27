"use client";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import CheckboxCustom from "@/components/Checkbox";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {url} from "@/utils/index";
import { Tab } from "@headlessui/react";
import BookingForm from "@/components/booking/BookingForm";
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}


async function getTour(id: string) {
  try {
    const response: any = await fetch(
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
}

type PostProps = {
  _id: string;
  ID: number;
  REFUND_POLICY: string;
  CANCELLATION_POLICY: string;
  NAME: string;
  DESCRIPTION: string;
  LOCATION: string;
  AMOUNT: number;
  DURATION: string;
  INCLUSION: string[];
  EXCLUSION: string[];
  IMAGES: [string];
  ITENARY: {
    name: string;
    description: string;
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

export default async function UserPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const tourData: PostProps = await getTour(id);

  


  return (
    <div className="bg-[var(--bg-2)]">
     
      
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
                  {tourData.IMAGES.map((image, index) => {
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

      <div className="container py-[30px] lg:py-[60px] px-3">
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 xl:col-span-8">
            <div>
              <div className="bg-white rounded-2xl p-3 sm:p-4 lg:py-8 lg:px-5">
                <div className="p-3 sm:p-4 lg:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 lg:mb-10">
                  <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
                    <h2 className="h2 m-0"> {tourData?.NAME} </h2>
                    <ul className="flex gap-3 items-center"></ul>
                  </div>
                  <ul className="columns-1 md:columns-2 lg:columns-3 pt-4 border-t border-dashed gap-md-0">
                    <li className="py-2">
                      <p className="mb-0">
                        ID:
                        <span className="text-primary">{tourData?.ID}</span>
                      </p>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center gap-1">
                        <span>
                          Location:{" "}
                          <span className="text-primary">
                            {tourData?.LOCATION}
                          </span>
                        </span>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center gap-1">
                        <span>
                          Start Point:{" "}
                          <span className="text-primary">Desert</span>
                        </span>
                      </div>
                    </li>
                  </ul>
                  <ul className="columns-1 md:columns-2 lg:columns-3">
                    <li className="py-2">
                      <p className="mb-0">
                        Duration:
                        <span className="text-primary">
                          {tourData?.DURATION}
                        </span>
                      </p>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center gap-1">
                        <span>
                          End Point:{" "}
                          <span className="text-primary">Dubai Airport</span>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="p-3 sm:p-4 lg:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 lg:mb-10">
                  <h4 className="mb-5 text-2xl font-semibold"> Overview </h4>
                  <p className="mb-5 clr-neutral-500">
                    {tourData?.DESCRIPTION}
                  </p>
                </div>
                <div className="p-3 sm:p-4 lg:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 lg:mb-10">
                  <h4 className="mb-5 text-2xl font-semibold">
                    {" "}
                    Tour Highlights{" "}
                  </h4>
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                      <ul className="flex flex-col gap-4">
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block">Burj Khalifa</span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block"> Dubai Mall </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                      <ul className="flex flex-col gap-4">
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block">Dubai Fountain</span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block">Jumeirah Beach</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                      <ul className="flex flex-col gap-4">
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block">Dubai Museum</span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block">Dubai Creek</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                      <ul className="flex flex-col gap-4">
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block">Palm Jumeirah</span>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                              <i className="las la-check text-lg text-primary"></i>
                            </div>
                            <span className="inline-block">Miracle Garden</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4 lg:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 lg:mb-10">
                  <h4 className="mb-6 text-2xl font-semibold"> Itinerary </h4>
                  <ul className="flex flex-col gap-6">
                    {tourData?.ITENARY?.map((tag, index) => (
                      <li
                        key={index}
                        className="relative md:before:absolute before:top-[120px] before:bottom-[-14px] before:left-[52px] before:w-[1px] md:before:border-l before:border-dashed before:border-[var(--primary)]"
                      >
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                          <div className="grid place-content-center ml-3 md:ml-0 relative w-28 h-28 rounded-full bg-primary after:scale-[1.18] text-white shrink-0 after:w-full after:h-full after:absolute after:border-dashed after:border after:border-[var(--primary)] after:rounded-full">
                            <div className="text-center">
                              <p className="text-lg mb-0"> Day </p>
                              <h2 className="mb-0 text-white"> {index}</h2>
                            </div>
                          </div>
                          <div className="flex-grow rounded-2xl bg-white shadow-lg p-3 sm:p-4 lg:p-6">
                            <h5 className="font-semibold text-xl">
                              {" "}
                              {tag.name}
                            </h5>
                            <p className="mb-0 clr-neutral-500">
                              {tag.location}
                            </p>
                            <div className="border border-dashed my-6"></div>
                            <div className="flex flex-col lg:flex-row md:items-center gap-5">
                              <Link
                                href="tour-listing-details"
                                className="link block shrink-0 w-full lg:w-auto"
                              ></Link>
                              <div className="flex-grow">
                                <Link
                                  href="tour-listing-details"
                                  className="link block text-lg text-[var(--neutral-700)] hover:text-primary mb-2"
                                >
                                  {tag.title}
                                </Link>
                                <p className="mb-0 clr-neutral-500 text-sm">
                                  {tag.description}
                                </p>
                              </div>
                            </div>
                            <div className="border border-dashed my-6"></div>
                            <div className="flex items-center flex-wrap gap-4">
                              <p className="mb-0 text-lg clr-neutral-500 font-medium">
                                Include Service -
                              </p>
                              <ul className="flex items-center flex-wrap gap-3">
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
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 sm:p-4 lg:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 lg:mb-10">
                  <h4 className="mb-0 text-2xl font-semibold">
                    {" "}
                    Inclusions & Exclusions{" "}
                  </h4>
                  <div className="border border-dashed my-5"></div>
                  <h6 className="mb-4 font-semibold"> Inclusions </h6>
                  <ul className="flex flex-col gap-4 mb-10">
                    {tourData?.INCLUSION?.map((inclusion, index) => (
                      <li key={index}>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                            <i className="las la-check text-lg text-primary"></i>
                          </div>
                          <span className="inline-block">{inclusion}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <h6 className="mb-4 font-semibold"> Exclusions </h6>
                  <ul className="flex flex-col gap-4 mb-10">
                    {tourData?.INCLUSION?.map((inclusion, index) => (
                      <li key={index}>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[#FFF9ED]">
                            <i className="las la-times text-xl text-[#9C742B]"></i>
                          </div>
                          <span className="inline-block">
                            Lunch and dinner are not included in plans
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 sm:p-4 lg:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 lg:mb-10">
                  <h4 className="mb-0 text-2xl font-semibold"> Tour Policy </h4>
                  <div className="hr-dashed my-5"></div>
                  <h6 className="mb-4 font-semibold">
                    {" "}
                    Confirmation Policy :{" "}
                  </h6>
                  <p className="mb-4">{tourData?.CANCELLATION_POLICY}</p>

                  <h6 className="mb-4 font-semibold"> Refund Policy : </h6>
                  <p className="mb-0">{tourData?.REFUND_POLICY}</p>
                </div>
              </div>
            </div>
          </div>

          <BookingForm amount={tourData?.AMOUNT} tourId={tourData?._id}/>

        
        </div>
      </div>
    </div>
  );
}
