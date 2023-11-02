"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ModalVideo from "react-modal-video";
import SubHeadingBtn from "../SubHeadingBtn";
import LocationEntry from "../home-3/LocationEntry";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { SearchIcon } from "@/public/data/icons";
import HeroDropdown4 from "../home-1/HeroDropdown4";
import GuestDropdown from "./GuestDropdown";
import { Combobox, Transition } from "@headlessui/react";
import "node_modules/react-modal-video/scss/modal-video.scss";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { useRouter } from "next/navigation";

const Hero = () => {
  const [isOpen, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;

  const [location, setLocation] = useState("");


  
  let [manufacturer, setManuFacturer] = useState("aaa");
  const [model, setModel] = useState("bbb");

  const [query, setQuery] = useState("");

  const [value, setValue] = useState(20);
  const router = useRouter();

  const handleSearch = () => {
    if (query === "" && value === 0 ) {
      return alert("Please provide some input");
    }

    //console.log(location.name.toString(),value)
    //const locations = location.name;

    //console.log("wwww",locations.indexOf("name",1))

    //const countryNames = locations.map((location: { name: any; }) => location.name);
    

    updateSearchParams(query , value);
  };

  const updateSearchParams = (locations: string, value: number) => {
    // Create a new URLSearchParams object using the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search);

    // Update or delete the 'model' search parameter based on the 'model' value
    if (locations) {
      searchParams.set("q", locations.toString());
    } else {
      searchParams.delete("q");
    }

    // Update or delete the 'manufacturer' search parameter based on the 'manufacturer' value
    if (value) {
      searchParams.set("AMOUNT", value.toString());
    } else {
       searchParams.delete("AMOUNT");
    }


    const newPathname = `${window.location.pathname}search/?${searchParams.toString()}`;
    router.push(newPathname);


    
  };
  return (
    <div className="relative px-3  after:bg-no-repeat after:w-full after:h-full after:absolute after:right-20 after:top-20 after:bg-right-top after:-z-[2] bg-cover bg-no-repeat bg-center" >
      <div
        onClick={() => setOpen(true)}
        className="absolute top-[83px] right-[42%] hidden xl:block cursor-pointer z-10">
        <Image
          width={48}
          height={48}
          src="/img/video-btn.png"
          alt="image"
          className=""
        />
      </div>
      <div className="container py-[60px] lg:py-[100px] xl:pt-[160px] xl:pb-[150px] relative xl:after:bg-[url('/img/tour-hero-bg.png')] xl:after:bg-[length:600px]  xl:after:absolute after:w-full after:h-full 3xl:after:-right-[15%] after:bottom-0 after:bg-no-repeat after:bg-right after:z-[-1]">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8 xl:col-span-6">
            <SubHeadingBtn
              text="It's time to go"
              classes="bg-[var(--primary-light)]"
            />
            <h1 className="h1 mt-4 mb-6 max-w-lg font-semibold">
              Explore the World with
              <span className="text-primary"> Bless Tours</span>
            </h1>
            <p className="mb-5 text-xl">
              Welcome to Bless Tours, your one-stop-shop for adventure, culture,
              and unforgettable experiences!
            </p>
          </div>
        </div>
       
      
      

            
          
          
  
         
      </div>
      <ModalVideo
        channel="vimeo"
        isOpen={isOpen}
        videoId="779229876"
        onClose={() => setOpen(false)}
      />

        <div className="row ">
          <div className="col-span-12">
            <Swiper
              loop={true}
              slidesPerView="auto"
              spaceBetween={8}
              navigation={{
                nextEl: ".btn-next",
                prevEl: ".btn-prev",
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
              }}
              modules={[Navigation]}
              className="swiper choice-slider z-1 mb-16">
              <SwiperSlide className="px-5 my-8">
                <div className="border rounded-2xl hover:shadow-[rgba(149,157,165,0.2)_0px_8px_24px] hover:border-none p-6 xl:p-8 text-center duration-300">
                <Link
                    href="/search?category=land&limit=5">
                  <Image
                    width={60}
                    height={60}
                    src="/img/duotone-home.png"
                    alt="image"
                    className=" mx-auto mb-6"
                  />
                  <h4 className="mb-4 text-2xl font-semibold"> Holy Land </h4>
                  <p className="mb-0">
                  Holy Land Tours: Embark on a Sacred Pilgrimage to Ancient Sites, where History and Spirituality Unite in a Profound Journey of Discovery.
                  </p>
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide className="px-5 my-8">
                <div className="border rounded-2xl hover:shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] hover:border-none p-6 xl:p-8 text-center duration-300">
                <Link
                    href="/search?category=city&limit=5">
                  <Image
                    width={60}
                    height={60}
                    src="/img/duotone-discount.png"
                    alt="image"
                    className=" mx-auto mb-6"
                  />
                  <h4 className="mb-4 text-2xl font-semibold">
                   Holy City
                  </h4>
                  <p className="mb-0">
                  Embark on a Spiritual Journey and Explore the Divine Beauty of Sacred Places, Enriching Your Soul Along the Way.
                  </p>
                  </Link>
                </div>
              </SwiperSlide>
              <SwiperSlide className="px-5 my-8">
                <div className="border rounded-2xl hover:shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] hover:border-none p-6 xl:p-8 text-center duration-300">
                <Link
                    href="/search?category=Vacation&limit=5">
                  <Image
                    width={60}
                    height={60}
                    src="/img/duotone-support.png"
                    alt="image"
                    className=" mx-auto mb-6"
                  />
                  <h4 className="mb-4 text-2xl font-semibold">Others</h4>
                  <p className="mb-0">
                    Browse other tour category
                  </p>
                  </Link>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          </div>

    </div>
  );
};

export default Hero;
