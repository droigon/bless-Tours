"use client";
import {
  BellIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import iconGoogle from "@/public/img/icon-google.png";
import iconDropbox from "@/public/img/icon-dropbox.png";
import iconSlack from "@/public/img/icon-slack.png";
import iconMailChimp from "@/public/img/icon-mailchimp.png";
import iconJira from "@/public/img/icon-jira.png";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import Accordion from "@/components/Accordion";
import CheckboxCustom from "@/components/Checkbox";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useRef, useState } from "react";
import { Tab } from "@headlessui/react";
import CustomSwitch from "@/components/Switch";
import { candlestick } from "@/public/data/candlestick";
import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Page = () => {
  const [active, setActive] = useState("profile");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("/img/team-1.jpg");

  const handleImageClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImageSrc(reader.result.toString());
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };
  return (
    <>
      <div className="bg-[var(--bg-1)] px-3 lg:px-6 relative before:bg-[var(--dark)] before:w-full before:h-[70px] before:absolute before:top-0 before:left-0 pb-6">
        <Tab.Group>
          <div className="grid grid-cols-12 gap-4 lg:gap-6 z-[1] relative">
            <div className="bg-white border col-span-12 rounded-2xl p-3 md:p-5 lg:py-8 lg:px-10">
              <h3 className="h3 border-b pb-4">Settings</h3>
              <Tab.List className="flex gap-3 flex-wrap pt-4 lg:pt-6">
                <Tab
                  onClick={() => setActive("profile")}
                  className={`rounded-xl py-2 md:py-3 px-3 md:px-4 inline-flex items-center gap-2 bg-[var(--primary-light)] text-primary ${
                    active === "profile" && "bg-primary text-white"
                  }`}>
                  <Cog6ToothIcon className="w-5 h-5" />
                  Edit Profile
                </Tab>
               
                <Tab
                  onClick={() => setActive("account")}
                  className={`rounded-xl py-2 md:py-3 px-3 md:px-4 inline-flex items-center gap-2 bg-[var(--primary-light)] text-primary ${
                    active === "account" && "bg-primary text-white"
                  }`}>
                  <UserCircleIcon className="w-5 h-5" />
                  Account Settings
                </Tab>
              </Tab.List>
            </div>
          </div>
          <Tab.Panels>
            <Tab.Panel className="grid grid-cols-12 gap-4 lg:gap-6 mt-6">
              <div className="col-span-12 lg:col-span-6 ">
                <div className="bg-white border rounded-2xl p-3 md:p-5 lg:py-8 lg:px-10">
                  <Accordion
                    buttonContent={(open) => (
                      <div className="rounded-2xl flex justify-between items-center">
                        <h3 className="h3">Basic Info </h3>
                        <ChevronDownIcon
                          className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    )}
                    initialOpen={true}>
                    <div className="pt-4 lg:pt-6">
                      <div>
                        <div className="relative mx-auto ms-md-0 mb-6">
                          <div className="avatar-upload__edit">
                            <input
                              type="file"
                              id="imageUpload"
                              accept=".png, .jpg, .jpeg"
                              className="hidden"
                              ref={inputFileRef}
                              onChange={handleFileChange}
                            />
                            <label
                              htmlFor="imageUpload"
                              className="avatar-upload__label"></label>
                          </div>
                          <div className="relative w-[180px] h-[180px]">
                            <Image
                              onClick={handleImageClick}
                              width={180}
                              height={180}
                              className="rounded-full border-[6px] border-[#F5F5FE] shadow-md"
                              src={imageSrc}
                              alt="avatar"
                            />
                            <span className="w-8 h-8 absolute cursor-pointer text-primary top-4 right-4 hover:bg-primary duration-300 hover:text-white rounded-full bg-white flex justify-center items-center border border-primary">
                              <PencilIcon className="w-5 h-5" />
                            </span>
                          </div>
                        </div>
                        <form action="#" className="grid grid-cols-12 gap-4">
                          <div className="col-span-12 lg:col-span-6">
                            <label
                              htmlFor="full-name"
                              className="block mb-2 font-medium clr-neutral-500">
                              Full name :
                            </label>
                            <input
                              type="text"
                              id="full-name"
                              className="border w-full focus:outline-none py-3 px-6 rounded-2xl"
                              placeholder="Enter name"
                            />
                          </div>
                          <div className="col-span-12 lg:col-span-6">
                            <label
                              htmlFor="user-email"
                              className="block mb-2 font-medium clr-neutral-500">
                              Email :
                            </label>
                            <input
                              type="text"
                              id="user-email"
                              className="border w-full focus:outline-none py-3 px-6 rounded-2xl"
                              placeholder="Enter email"
                            />
                          </div>
                          <div className="col-span-12 lg:col-span-12">
                            <label
                              htmlFor="user-phone"
                              className="block mb-2 font-medium clr-neutral-500">
                              Phone (Optional) :
                            </label>
                            <input
                              type="text"
                              id="user-phone"
                              className="border w-full focus:outline-none py-3 px-6 rounded-2xl"
                              placeholder="Enter number"
                            />
                          </div>
                          <div className="col-span-12 lg:col-span-12">
                            <label className="block mb-2 font-medium clr-neutral-500">
                              Gender :
                            </label>
                            <ul className="flex flex-wrap items-center gap-6">
                              <li>
                                <div className="flex items-center gap-2">
                                  <input
                                    className="accent-[var(--primary)] scale-125"
                                    type="radio"
                                    name="gender"
                                    id="male"
                                  />
                                  <label
                                    className="inline-block font-medium cursor-pointer clr-neutral-500"
                                    htmlFor="male">
                                    Male
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="flex items-center gap-2">
                                  <input
                                    className="accent-[var(--primary)] scale-125"
                                    type="radio"
                                    name="gender"
                                    id="female"
                                  />
                                  <label
                                    className="inline-block font-medium cursor-pointer clr-neutral-500"
                                    htmlFor="female">
                                    Female
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="col-span-12">
                            <label className="block mb-2 font-medium clr-neutral-500">
                              BIO :
                            </label>
                            <textarea
                              rows={4}
                              placeholder="Write your bio"
                              className="border w-full focus:outline-none py-3 px-6 rounded-2xl"></textarea>
                          </div>

                          <div className="col-span-12 lg:col-span-12">
                            <label
                              htmlFor="user-phone"
                              className="block mb-2 font-medium clr-neutral-500">
                              Link Title :
                            </label>
                            <input
                              type="text"
                              id="user-link"
                              className="border w-full focus:outline-none py-3 px-6 rounded-2xl"
                              placeholder="Enter Link Title"
                            />
                          </div>

                          <div className="col-span-12 lg:col-span-12">
                            <label
                              htmlFor="user-phone"
                              className="block mb-2 font-medium clr-neutral-500">
                              URL :
                            </label>
                            <input
                              type="text"
                              id="user-url"
                              className="border w-full focus:outline-none py-3 px-6 rounded-2xl"
                              placeholder="Enter URL"
                            />
                          </div>

                          <div className="col-span-12">
                            <div className="flex flex-col gap-3">
                              <CheckboxCustom label="I agree to the privacy & policy" />
                              <CheckboxCustom label="I agree with all terms & conditions" />
                            </div>
                          </div>

                          <div className="col-span-12">
                            <div className="flex items-center gap-6 flex-wrap">
                              <Link
                                href="#"
                                className="link inline-block py-3 px-6 rounded-full bg-primary text-white :bg-primary-400 hover:text-white font-semibold">
                                Save Changes
                              </Link>
                              <Link
                                href="#"
                                className="btn-outline text-primary font-semibold">
                                Cancel
                              </Link>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Accordion>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 flex flex-col gap-4 lg:gap-6">
                <div className="bg-white border rounded-2xl p-3 md:p-5 lg:py-8 lg:px-10">
                  <Accordion
                    buttonContent={(open) => (
                      <div className="rounded-2xl flex justify-between items-center">
                        <h3 className="h3">Address </h3>
                        <ChevronDownIcon
                          className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    )}
                    initialOpen={true}>
                    <div className="pt-4 lg:pt-6">
                      <form action="#" className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 ">
                          <label className="block mb-2 font-medium clr-neutral-500">
                            Location :
                          </label>
                          <div className="border rounded-lg px-4 bg-transparent">
                            <select
                              className="w-full bg-transparent px-5 py-3 focus:outline-none"
                              aria-label="Default select example">
                              <option>Property Types</option>
                              <option value="1">New York</option>
                              <option value="2">Chicago</option>
                              <option value="3">Atlanta</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <label
                            id="address-line-1"
                            className="block mb-2 font-medium clr-neutral-500">
                            Address line 1 :
                          </label>
                          <input
                            type="text"
                            id="address-line-1"
                            className="border w-full focus:outline-none py-3 px-6 rounded-lg"
                            placeholder="Enter address 1"
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <label
                            id="address-line-2"
                            className="block mb-2 font-medium clr-neutral-500">
                            Address line 2:
                          </label>
                          <input
                            type="text"
                            id="address-line-2"
                            className="border w-full focus:outline-none py-3 px-6 rounded-lg"
                            placeholder="Enter address 2"
                          />
                        </div>
                        <div className="col-span-12">
                          <label
                            id="enter-code"
                            className="block mb-2 font-medium clr-neutral-500">
                            Zip code :
                          </label>
                          <input
                            type="text"
                            id="enter-code"
                            className="border w-full focus:outline-none py-3 px-6 rounded-lg"
                            placeholder="Enter code"
                          />
                        </div>
                        <div className="col-span-12">
                          <div className="flex items-center gap-6 flex-wrap">
                            <Link
                              href="#"
                              className="link inline-block py-3 px-6 rounded-full bg-primary text-white :bg-primary-400 hover:text-white font-semibold">
                              Save Changes
                            </Link>
                            <Link
                              href="#"
                              className="btn-outline text-primary font-semibold">
                              Cancel
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Accordion>
                </div>
                
              
              </div>
            </Tab.Panel>
            
            <Tab.Panel className="grid grid-cols-12 gap-4 lg:gap-6 mt-6">
              
              <div className="col-span-12 lg:col-span-6">
                <div className="bg-white p-4 sm:p-6 md:p-8  rounded-2xl border ">
                  <Accordion
                    buttonContent={(open) => (
                      <div className="rounded-2xl flex justify-between items-center">
                        <h3 className="h3">Device history </h3>
                        <ChevronDownIcon
                          className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    )}
                    initialOpen={true}>
                    <div className="pt-4 lg:pt-6">
                      <ul className="flex flex-col gap-6">
                        <li>
                          <div className="flex flex-wrap items-center justify-between gap-4 text-">
                            <div className="flex gap-6 items-center">
                              <div className="shrink-0">
                                <ComputerDesktopIcon className="w-8 h-8" />
                              </div>
                              <div className="flex-grow">
                                <h5 className="font-medium mb-1">
                                  {" "}
                                  Dell XPS 20{" "}
                                </h5>
                                <ul className="flex flex-wrap items-center list-divider-half-xs">
                                  <li>
                                    <span className="inline-block text-sm">
                                      IP : 213.230.93.79
                                    </span>
                                  </li>
                                  <li>
                                    <span className="inline-block text-sm">
                                      active : Now
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="shrink-0">
                              <Link
                                href="#"
                                className="btn-outline text-primary font-semibold">
                                Log out
                              </Link>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-6 items-center">
                              <div className="shrink-0">
                                <ComputerDesktopIcon className="w-8 h-8" />
                              </div>
                              <div className="flex-grow">
                                <h5 className="font-medium mb-1">
                                  {" "}
                                  Microsoft Studio{" "}
                                </h5>
                                <ul className="flex flex-wrap items-center list-divider-half-xs">
                                  <li>
                                    <span className="inline-block text-sm">
                                      IP : 213.230.93.79
                                    </span>
                                  </li>
                                  <li>
                                    <span className="inline-block text-sm">
                                      active : 3 days ago
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="shrink-0">
                              <Link
                                href="#"
                                className="btn-outline text-primary font-semibold">
                                Log out
                              </Link>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex gap-6 items-center">
                              <div className="shrink-0">
                                <DevicePhoneMobileIcon className="w-8 h-8" />
                              </div>
                              <div className="flex-grow">
                                <h5 className="font-medium mb-1"> GitHub </h5>
                                <ul className="flex flex-wrap items-center list-divider-half-xs">
                                  <li>
                                    <span className="inline-block text-sm">
                                      IP : 213.230.93.79
                                    </span>
                                  </li>
                                  <li>
                                    <span className="inline-block text-sm">
                                      active : 22 min ago
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="shrink-0">
                              <Link
                                href="#"
                                className="btn-outline text-primary font-semibold">
                                Log out
                              </Link>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </Accordion>
                </div>
              </div>
              <div className=" col-span-12 lg:col-span-6">
                <div className="bg-white p-4 sm:p-6 md:p-8  rounded-2xl border ">
                  <Accordion
                    buttonContent={(open) => (
                      <div className="rounded-2xl flex justify-between items-center">
                        <h3 className="h3">Password </h3>
                        <ChevronDownIcon
                          className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 ${
                            open ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    )}
                    initialOpen={true}>
                    <div className="pt-4 lg:pt-6">
                      <form action="#" className="grid grid-cols-12 gap-4">
                        <div className="col-span-12">
                          <label
                            htmlFor="current-password-setup"
                            className="block mb-2 font-medium clr-neutral-500">
                            Current password :
                          </label>
                          <input
                            type="password"
                            id="current-password-setup"
                            className="w-full focus:outline-none border py-3 px-6 rounded-lg"
                            placeholder="Enter current password"
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <label
                            htmlFor="new-password"
                            className="block mb-2 font-medium clr-neutral-500">
                            New password :
                          </label>
                          <input
                            type="password"
                            id="new-password"
                            className="w-full focus:outline-none border py-3 px-6 rounded-lg"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                          <label
                            htmlFor="confirm-password"
                            className="block mb-2 font-medium clr-neutral-500">
                            Confirm password :
                          </label>
                          <input
                            type="password"
                            id="confirm-password"
                            className="w-full focus:outline-none border py-3 px-6 rounded-lg"
                            placeholder="Confirm your new password"
                          />
                        </div>
                        <div className="col-span-12">
                          <h5 className="font-medium mb-4">
                            {" "}
                            Password requirements :{" "}
                          </h5>
                          <ul className=" list-disc pl-4 gap-3">
                            <li>
                              {" "}
                              Minimum 8 characters long - the more, the better{" "}
                            </li>
                            <li> At least one lowercase character </li>
                            <li> At least one uppercase character </li>
                            <li>
                              At least one number, symbol, or whitespace
                              character
                            </li>
                          </ul>
                        </div>
                        <div className="col-span-12">
                          <div className="flex items-center gap-6 flex-wrap">
                            <Link
                              href="#"
                              className="link inline-block py-3 px-6 rounded-full bg-primary text-white :bg-primary-400 hover:text-white font-semibold">
                              Update Password
                            </Link>
                            <Link
                              href="#"
                              className="btn-outline text-primary font-semibold">
                              Cancel
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </Accordion>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <Footer />
    </>
  );
};

export default Page;
