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

    

    console.log("Loca",locations)

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
        <div className="flex flex-wrap gap-5 mt-6 bg-white p-5 rounded-xl shadow-lg">
        <div className="w-full md:w-[48%] xl:w-[22%] flex pr-3 items-center justify-between rounded-full sm:text-sm bg-[var(--bg-1)] border">
            <input
              placeholder="Location"
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-[var(--bg-1)] p-3 rounded-full focus:outline-none"
            />
          </div>

      

          <div className="w-full md:w-[48%] xl:w-[22%] flex pr-3 items-center justify-between rounded-full sm:text-sm bg-[var(--bg-1)] border">
            <DatePicker
              placeholderText="Check In - Check Out"
              selectsRange={true}
              startDate={startDate}
              dateFormat="dd-MM-yyyy"
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              className="w-full bg-[var(--bg-1)] p-3 rounded-full focus:outline-none"
            />
            <CalendarDaysIcon className="w-6 h-6 text-gray-600 shrink-0" />
          </div>
          <GuestDropdown />
          <HeroDropdown4 value={value} setValue={setValue} />
          
          
          <button type='submit' onClick={handleSearch} className="py-[14px] px-6 w-full flex justify-center xl:w-auto text-white bg-primary rounded-full" >          
            <SearchIcon />
          </button>
  
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
