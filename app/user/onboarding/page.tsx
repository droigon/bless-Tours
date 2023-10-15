"use client";
import Accordion from "@/components/Accordion";
import CheckboxCustom from "@/components/Checkbox";
import CustomRangeSlider from "@/components/RangeSlider";
import { propertyAmenities } from "@/public/data/addpropertyAmenities";
import {
  ChevronDownIcon,
  CloudArrowUpIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from 'react'
import React, { useRef } from "react";
import "@uploadthing/react/styles.css";
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react"
 
import { UploadButton } from "src/utils/uploadthing";



export default function Page() {
  const Router = useRouter()
  const [insurance, setInsurnace] = useState<{
    fileUrl: string;
      fileKey: string;
  }[]>([])
  const [identity, setIdentity] = useState<{
    fileUrl: string;
      fileKey: string;
  }[]>([])
  const [picture, setPicture] = useState<{
    fileUrl: string;
      fileKey: string;
  }[]>([])
  const { data: session } = useSession();
  
  const [images, setImages] = useState<{
    fileUrl: string;
      fileKey: string;
  }[]>([])

  const title = images.length ? (
    <>
        <p>Upload Complete!</p>
        <p className="mt-2">{images.length} files</p>
    </>
  ) : null

  const imgList = (
      <>
          {title}
          <ul>
              {images.map(image => (
                  <li key={image.fileUrl} className="mt-2">
                      <Link href={image.fileUrl} target="_blank">
                          {image.fileUrl}
                      </Link>
                  </li>
              ))}
          </ul>
      </>
  )

  type FormInputs = {
    phone: string;
  };

  const Register = async () => {
    
    //console.log(picture,insurance,identity)
    const res = await fetch(`https://blesstours.onrender.com/api/v1/users/verify/${session?.user?.data?.id}`, {
      method: "POST",
      body: JSON.stringify({  
        
        picture:picture.at(0)?.fileUrl,
        insurance:insurance.at(0)?.fileUrl,
        identity:identity.at(0)?.fileUrl,
        phone:"080000000"

      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("onboarding")
    const response = await res.json();
    //alert("User Registered!");
    
    //console.log({ response });

    Router.push("/user/personal-info")

  };

  const data = useRef<FormInputs>({
    
    phone: "",
  });


  return (
    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
      <div className="container">
        <div className="w-full xl:w-[83.33%] xxl:w-[66.66%] mx-auto">
          {/* Item 1 */}
          <div className="bg-white p-4 sm:p-6 md:p-10 mb-5 sm:mb-8 md:mb-12 rounded-2xl">
            <Accordion
              buttonContent={(open) => (
                <div className="rounded-2xl flex justify-between items-center">
                  <h3 className="h3">Onboarding </h3>
                  <ChevronDownIcon
                    className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
              initialOpen={true}>
              <div className="pt-4">
                <div className="border-t pt-4">
                  
                  
                  <p className="mt-6 mb-4 text-xl font-medium">Phone Number:</p>
                  <input
                    type="text"
                    className="w-full border p-2 focus:outline-none rounded-md text-base"
                    placeholder="Enter your phone number"
                  />
                  

                 

                      <div className="pt-10 property-card__body">
                      <div className="flex flex-wrap justify-between items-center">
                        
                        <p className="mt-6 mb-4 text-xl font-medium">Picture :</p>
                        <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  // Do something with the response
                                  if (res) {
                                    setPicture(res)
                                    const json = JSON.stringify(res)
                                    // Do something with the response
                                    console.log(json);
                                }
                                }}
                                onUploadError={(error: Error) => {
                                  // Do something with the error.
                                  alert(`ERROR! ${error.message}`);
                                }}
                              />
                      
                      </div>
                    </div>
                      
                      <div className="pt-10 property-card__body">
                      <div className="flex flex-wrap justify-between items-center">
                        
                        <p className="mt-6 mb-4 text-xl font-medium">Identity :</p>
                        <UploadButton
                                endpoint="imageUploader"
                                onClientUploadComplete={(res) => {
                                  // Do something with the response
                                  if (res) {
                                    setIdentity(res)
                                    const json = JSON.stringify(res)
                                    // Do something with the response
                                    console.log(json);
                                }
                                  
                                }}
                                onUploadError={(error: Error) => {
                                  // Do something with the error.
                                  alert(`ERROR! ${error.message}`);
                                }}
                              />
                      
                      </div>
                    </div>


               

                  <div className="pt-10">
                  <p className="mt-6 mb-4 text-xl font-medium"> Insurance:</p>
                <div className="flex items-center justify-center border-dashed rounded-2xl w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full cursor-pointer bg-[var(--bg-2)] rounded-2xl border border-dashed">
                    <span className="flex flex-col items-center justify-center py-12">
                      <CloudArrowUpIcon className="w-[60px] h-[60px]" />
                      
                      <span className="h3 clr-neutral-500 text-center mt-4 mb-3">
                        Drag & Drop
                      </span>
                      <span className="block text-center mb-6 clr-neutral-500">
                        OR
                      </span>
                      
                      <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        if (res) {
                          setInsurnace(res)
                          const json = JSON.stringify(res)
                          // Do something with the response
                          console.log(json);
                      }
                        
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                      <span className="flex items-center justify-center flex-wrap gap-5">
                        <span className="flex items-center gap-2">
                          <InformationCircleIcon className="w-5 h-5" />
                          <span className="block mb-0 clr-neutral-500">
                            Maximum allowed file size is 9.00 MB
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <InformationCircleIcon className="w-5 h-5" />
                          <span className="block mb-0 clr-neutral-500">
                            Maximum 10 files are allowed
                          </span>
                        </span>
                      </span>
                    </span>
                    <input type="file" id="dropzone-file" className="hidden" />
                  </label>
                </div>

                <Link href="#" onClick={Register} className="btn-primary font-semibold">
                  <span className="inline-block"> Save </span>
                </Link>
                
               
              </div>
                  
                  
                </div>
              </div>
            </Accordion>
          </div>
          {/* Item 2 */}
          

          
        </div>
      </div>
    </div>
  );
};


