"use client";
import Accordion from "@/components/Accordion";
import CheckboxCustom from "@/components/Checkbox";
import { ChevronDownIcon, PencilIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useSession } from "next-auth/react"
import Link from "next/link";
import { ChangeEvent, useRef, useState, useEffect } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

interface UserData {
  id: string;
  FIRSTNAME:string;
  LASTNAME:string;
  PHONE_NUMBER:string;
  EMAIL:string;
  PROFILE_PICTURE:string;
  isVerified:boolean;
  // Add other properties based on your API response
}

interface ApiResponse {
  data: UserData;
}

interface ErrorResponse {
  message: string;
}

async function fetchUserData(userId: string): Promise<UserData | null> {
  try {
    const response = await fetch(`https://blesstours.onrender.com/api/v1/users/${userId}`);
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.message);
    }

    const data: ApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}



const Page = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("/img/team-1.jpg");

  const { data } = useSession();
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);


  const [phone, setPhone] = useState('');

  const [isVerified, setisVerified] = useState(true);

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

  useEffect(() => {
    
    if (session) {
      const userId = session.user?.id || "";

      fetchUserData(userId)
        .then((userData) => {
          if (userData) {
            setUserData(userData);
            setisVerified(userData.isVerified);
            setImageSrc(userData.PROFILE_PICTURE);
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [session]);
  
  
  return (
    <>
      <div className="bg-white p-4 sm:p-6 md:p-8 mb-6 rounded-2xl shadow-lg">
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
                    defaultValue={userData?.LASTNAME + ' ' + userData?.FIRSTNAME}
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
                    defaultValue={userData?.EMAIL}
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
                  <PhoneInput
                    defaultCountry="ua"
                    value={(userData?.PHONE_NUMBER)?.toString()} 
                    //defaultMask="111"
                    inputClassName=" border w-full h-[200] focus:outline-none mx-16 py-16 px-32 m -32 rounded-3xl"
                    onChange={(phone) => setPhone(phone)} />
               
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
      <div className="bg-white p-4 sm:p-6 md:p-8 mb-6 rounded-2xl shadow-lg">
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
                  Country :
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
      
      
    </>
  );
};

export default Page;
