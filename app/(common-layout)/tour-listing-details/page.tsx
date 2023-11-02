"use client";
import { Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import "react-datepicker/dist/react-datepicker.css";
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ArrowRightIcon,
  ArrowsRightLeftIcon,
  ChatBubbleLeftRightIcon,
  HandThumbUpIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import DatePicker from "react-datepicker";
import { useState } from "react";
import CheckboxCustom from "@/components/Checkbox";
import { useRouter } from "next/navigation";
import { useAppContext } from '@/providers/BookProvider';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const tooltipStyle = {
  backgroundColor: "#3539E9",
  color: "#fff",
  borderRadius: "10px",
};

type FormInputs = {
  guests: number;
  location: string;
  dateRange: string;
};

type PostProps = {
  _id: string;
  ID: number;
  REFUND_POLICY:string;
  CANCELLATION_POLICY:string;
  NAME: string;
  DESCRIPTION: string;
  LOCATION: string;
  AMOUNT: number;
  DURATION: string;
  INCLUSION: string[];
  EXCLUSION: string[];
  ITENARY: { name:string,description:string,location:string,title:string, _id: number; }[];
  
};




const Page: React.FC<{ promise: Promise<PostProps> }> = ({ promise }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  const [post, setPost] = useState<PostProps | null>(null);
  
  const { setGuests, setLocation, setTourID,setCheckout,setCheckin } = useAppContext();
  
  const router = useRouter();

  const process = async () => {
    
    setGuests(data.current.guests)
    setLocation(data.current.location)
    setTourID(post?._id || "")
    setCheckout(endDate?.toDateString() || "")
    setCheckin(startDate?.toDateString() || "")

    if (!data.current.location || data.current.location==="") {
      // Throw an error if location is empty
      throw new Error('Location cannot be empty.');
    }
    
    console.log("routing")
    router.push('/booking/book-tour');

  };

  const data = useRef<FormInputs>({
    guests:1,
    location:"",
    dateRange:"",
  });

 

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await promise;
        //const { NAME, DESCRIPTION, PRICE } = posts;
        setPost(posts)
        console.log("Posts:", posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    fetchPosts();
  }, []);
  


  //const fetchPosts = async () => {
  //  try {
  //    const posts = await promise;
  //    //const { NAME, DESCRIPTION, PRICE } = posts;
  //    setPost(posts)
  //    console.log("Posts:", posts);
  //  } catch (error) {
  //    console.error("Error fetching posts:", error);
  //  }
  //};

  //fetchPosts();

  

  return (
    <main>
      <div className="bg-[var(--bg-2)]">
        <div className="py-4">
          <div className="px-3">
            <div className="grid grid-cols-12 gap-4 lg:gap-6">
              <div className="col-span-12 xl:col-span-4">
                <div className="grid grid-cols-12 gap-4 lg:gap-6">
                  <div className="col-span-12 sm:col-span-6 xl:col-span-12">
                    <Link
                      href="/img/tour-details-img-1.jpg"
                      className="link property-gallery">
                      <Image
                        width={610}
                        height={288}
                        src="/img/tour-details-img-1.jpg"
                        alt="image"
                        className=" w-full rounded-2xl"
                      />
                    </Link>
                  </div>
                  <div className="col-span-12 sm:col-span-6 xl:col-span-12">
                    <Link
                      href="/img/tour-details-img-2.jpg"
                      className="link property-gallery">
                      <Image
                        width={610}
                        height={681}
                        src="/img/tour-details-img-2.jpg"
                        alt="image"
                        className=" w-full rounded-2xl"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <Link
                  href="/img/tour-details-img-3.jpg"
                  className="link block property-gallery h-full">
                  <Image
                    width={610}
                    height={288}
                    src="/img/tour-details-img-3.jpg"
                    alt="image"
                    className=" w-full h-full object-fit-cover rounded-2xl"
                  />
                </Link>
              </div>
              <div className="col-span-12 md:col-span-6 xl:col-span-4">
                <div className="grid grid-cols-12 gap-4 lg:gap-6">
                  <div className="col-span-12">
                    <Link
                      href="/img/tour-details-img-4.jpg"
                      className="link property-gallery">
                      <Image
                        width={610}
                        height={288}
                        src="/img/tour-details-img-4.jpg"
                        alt="image"
                        className=" w-full rounded-2xl"
                      />
                    </Link>
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <Link
                      href="/img/tour-details-img-5.jpg"
                      className="link property-gallery">
                      <Image
                        width={293}
                        height={284}
                        src="/img/tour-details-img-5.jpg"
                        alt="image"
                        className=" w-full rounded-2xl"
                      />
                    </Link>
                  </div>
                  <div className="col-span-12 sm:col-span-6">
                    <Link
                      href="/img/tour-details-img-6.jpg"
                      className="link property-gallery">
                      <Image
                        width={293}
                        height={284}
                        src="/img/tour-details-img-6.jpg"
                        alt="image"
                        className=" w-full rounded-2xl"
                      />
                    </Link>
                  </div>
                </div>
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
                      <h2 className="h2 m-0"> {post?.NAME} </h2>
                      <ul className="flex gap-3 items-center">
                        
                      </ul>
                    </div>
                    <ul className="columns-1 md:columns-2 lg:columns-3 pt-4 border-t border-dashed gap-md-0">
                      <li className="py-2">
                        <p className="mb-0">
                          ID:
                          <span className="text-primary">{post?.ID}</span>
                        </p>
                      </li>
                      <li className="py-2">
                        <div className="flex items-center gap-1">
                          <span>
                            Location:{" "}
                            <span className="text-primary">{post?.LOCATION}</span>
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
                          <span className="text-primary">{post?.DURATION}</span>
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
                      {post?.DESCRIPTION}
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
                              <span className="inline-block">
                                Dubai Fountain
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                                <i className="las la-check text-lg text-primary"></i>
                              </div>
                              <span className="inline-block">
                                Jumeirah Beach
                              </span>
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
                              <span className="inline-block">
                                Palm Jumeirah
                              </span>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                                <i className="las la-check text-lg text-primary"></i>
                              </div>
                              <span className="inline-block">
                                Miracle Garden
                              </span>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 lg:p-6 bg-[var(--bg-1)] rounded-2xl border border-neutral-40 mb-6 lg:mb-10">
                    <h4 className="mb-6 text-2xl font-semibold"> Itinerary </h4>
                    <ul className="flex flex-col gap-6">
                    {post?.ITENARY.map((tag, index) => (
                     

                      <li
                      key={index}
                      className="relative md:before:absolute before:top-[120px] before:bottom-[-14px] before:left-[52px] before:w-[1px] md:before:border-l before:border-dashed before:border-[var(--primary)]">
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
                              className="link block shrink-0 w-full lg:w-auto">
                              
                            </Link>
                            <div className="flex-grow">
                              <Link
                                href="tour-listing-details"
                                className="link block text-lg text-[var(--neutral-700)] hover:text-primary mb-2">
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
                                  className="grid place-content-center w-10 h-10 rounded-full bg-[var(--bg-2)] text-primary">
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
                                  className="grid place-content-center w-10 h-10 rounded-full bg-[var(--bg-2)] text-primary">
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
                                  className="grid place-content-center w-10 h-10 rounded-full bg-[var(--bg-2)] text-primary">
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
                                  className="grid place-content-center w-10 h-10 rounded-full bg-[var(--bg-2)] text-primary">
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
                    {post?.INCLUSION?.map((inclusion, index) => (
                      
                      <li  key={index}>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 grid place-content-center rounded-full shrink-0 bg-[var(--primary-light)]">
                            <i className="las la-check text-lg text-primary"></i>
                          </div>
                          <span className="inline-block">
                          {inclusion}
                          </span>
                        </div>
                      </li>
                    ))}
                      
                    </ul>
                    <h6 className="mb-4 font-semibold"> Exclusions </h6>
                    <ul className="flex flex-col gap-4 mb-10">
                    {post?.INCLUSION?.map((inclusion, index) => (
                      <li  key={index}>
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
                    <h4 className="mb-0 text-2xl font-semibold">
                      {" "}
                      Tour Policy{" "}
                    </h4>
                    <div className="hr-dashed my-5"></div>
                    <h6 className="mb-4 font-semibold">
                      {" "}
                      Confirmation Policy :{" "}
                    </h6>
                    <p className="mb-4">
                     {post?.CANCELLATION_POLICY}
                    </p>
                    
                 
                    <h6 className="mb-4 font-semibold"> Refund Policy : </h6>
                    <p className="mb-0">
                     {post?.REFUND_POLICY}
                    </p>
                  </div>
                </div>
              </div>
              

              
            </div>

            <div className="col-span-12 xl:col-span-4">
              <div className="pb-0 mb-6 relative">
                <div className="bg-white rounded-2xl p-3 sm:p-4 lg:py-8 lg:px-6">
                  <p className="mb-3 text-lg font-medium"> Price </p>
                  <div className="flex items-start gap-2 mb-6">
                    <div className="flex gap-3 items-center">
                      <i className="las la-tag text-2xl"></i>
                      <p className="mb-0"> From </p>
                      <h3 className="h3 mb-0"> ${post?.AMOUNT} </h3>
                    </div>
                    <i className="las la-info-circle text-2xl"></i>
                  </div>

                  <Tab.Group>
                    <Tab.List className="flex gap-3 about-tab mb-7">
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "focus:outline-none",
                            selected ? "text-primary font-medium" : ""
                          )
                        }>
                        Booking Form
                      </Tab>{" "}
                      <span>|</span>
                      <Tab
                        className={({ selected }) =>
                          classNames(
                            "focus:outline-none",
                            selected ? "text-primary font-medium" : ""
                          )
                        }>
                        Enquiry Form
                      </Tab>
                    </Tab.List>
                    <Tab.Panels className="tab-content mb-8">
                      <Tab.Panel>
                        <div className="grid grid-cols-1 gap-3">
                          <div className="col-span-1">
                            <div className="w-full flex">
                              <input
                                type="text"
                                required
                                className="w-[83%] min-[400px]:w-full focus:outline-none bg-[var(--bg-2)] border border-r-0 border-neutral-40 rounded-s-full rounded-end-0 py-3 px-5"
                                onChange={(e) => (data.current.location = e.target.value)}
                                placeholder="Location"
                              />
                              <span className="bg-[var(--bg-2)] border border-l-0 border-neutral-40 rounded-e-full py-[14px] text-gray-500 pe-4 ps-0">
                                <i className="las text-2xl la-map-marker-alt"></i>
                              </span>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="w-full flex">
                              <DatePicker
                                placeholderText="Check In - Check Out"
                                selectsRange={true}
                                required
                                startDate={startDate}
                                dateFormat="dd-MM-yyyy"
                                endDate={endDate}
                                onChange={(update) => setDateRange(update)}
                                className="bg-[var(--bg-2)] w-full border border-r-0 border-neutral-40 rounded-s-full py-[14px] text-gray-500  ps-4 focus:outline-none"
                              />
                              <span className="bg-[var(--bg-2)] border border-l-0 border-neutral-40 rounded-e-full py-3 text-gray-500 pe-4 ps-0">
                                <i className="las text-2xl la-calendar-alt"></i>
                              </span>
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="w-full flex">
                              <input
                                type="number"
                                required
                                onChange={(e) => (data.current.guests = e.target.valueAsNumber)}
                                className="w-[83%] min-[400px]:w-full focus:outline-none bg-[var(--bg-2)] border border-r-0 border-neutral-40 rounded-s-full rounded-end-0 py-3 px-5"
                                placeholder="Guest"
                              />
                              <span className="bg-[var(--bg-2)] border border-l-0 border-neutral-40 rounded-e-full py-[14px] text-gray-500 pe-4 ps-0">
                                <i className="las la-user-friends text-2xl"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                       
                      </Tab.Panel>
                      <Tab.Panel>
                        <form className="flex flex-col gap-5">
                          <input
                            type="text"
                            placeholder="Name..."
                            className="w-full rounded-full bg-[var(--bg-1)] border focus:outline-none py-2 px-3 md:py-3 md:px-4"
                            required
                          />
                          <input
                            type="email"
                            placeholder="Email..."
                            className="w-full rounded-full bg-[var(--bg-1)] border focus:outline-none py-2 px-3 md:py-3 md:px-4"
                            required
                          />
                          <textarea
                            rows={6}
                            placeholder="Message..."
                            className="w-full rounded-3xl bg-[var(--bg-1)] border focus:outline-none py-2 px-3 md:py-3 md:px-4"></textarea>
                          <CheckboxCustom label="I agree with Terms of Service and Privacy Statement" />
                        </form>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>

                  <button
                    onClick={process}
                    className="link inline-flex items-center gap-2 py-3 px-6 rounded-full bg-primary text-white :bg-primary-400 hover:text-white font-medium w-full justify-center mb-6">
                    <span className="inline-block"> Proceed Booking </span>
                  </button>
                  <ul className="flex justify-center gap-6">
                    <li>
                      <div className="flex items-center gap-2">
                        <button className="w-7 h-7 rounded-full bg-[var(--primary-light)] text-primary grid place-content-center">
                          <HeartIcon className="w-5 h-5" />
                        </button>
                        <span className="inline-block text-sm clr-neutral-500">
                          Save To Wish List
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};


export default Page;