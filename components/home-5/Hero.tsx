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
    if (query === "" && value === 0) {
      return alert("Please provide some input");
    }


    //const countryNames = locations.map((location: { name: any; }) => location.name);

    updateSearchParams(query, value);
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

    const newPathname = `${
      window.location.pathname
    }search/?${searchParams.toString()}`;
    router.push(newPathname);
  };
  return (
    <div className="relative px-3  after:bg-no-repeat after:w-full after:h-full after:absolute after:right-20 after:top-20 after:bg-right-top after:-z-[2] bg-cover bg-no-repeat bg-center">
      <div
        onClick={() => setOpen(true)}
        className="absolute top-[83px] right-[42%] hidden xl:block cursor-pointer z-10"
      >
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

  
    </div>
  );
};

export default Hero;
