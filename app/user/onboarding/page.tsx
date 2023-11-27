"use client";
import Accordion from "@/components/Accordion";
import { ChevronDownIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState, useCallback } from "react";
import React, { useRef } from "react";
import "@uploadthing/react/styles.css";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Image from "next/image";
import Axios from "axios";
import {url} from "@/utils/index";

interface ErrorType {
  statusText: string;
  // Add other properties based on your API response
}

type FormInputs = {
  phoneNumber: string;
};

export default function Page() {
  const router = useRouter();
  const urlsearchParams = useSearchParams();
  const optionSearchParams = new URLSearchParams(urlsearchParams?.toString());
  const id = optionSearchParams.get("id");
  const [picture, setProfilePicture] = useState<File | null>(null);
  const [identity, setIdentity] = useState<File | null>(null);
  const [insurance, setInsurance] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [pdfPreview, setPdfPreview] = useState<string>("");
  const [insurancePreview, setInsurancePreview] = useState<string>("");

  const [phone, setPhone] = useState(""); 

  const [loading, setLoading] = useState(false);

  const data = useRef<FormInputs>({
    phoneNumber: "",
  });

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const form = e.target;
      const files = form.files;
      if (!files || files.length === 0) {
        return toast.error("No files selected");
      }
      const file = files[0];
      if (!file) return;
      setProfilePicture(file);
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target) {
            setImagePreview(event.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const identityHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const form = e.target;
      const files = form.files;
      if (!files || files.length === 0) {
        return toast.error("No files selected");
      }
      const file = files[0];
      if (!file) return;
      setIdentity(file);
      if (file && file.type === "application/pdf") {
        const objectURL = URL.createObjectURL(file);
        setPdfPreview(objectURL);
      } else {
        setPdfPreview(""); // Clear the iframe if an invalid file is selected
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const insuranceHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const form = e.target;
      const files = form.files;
      if (!files || files.length === 0) {
        return toast.error("No files selected");
      }
      const file = files[0];
      if (!file) return;
      setInsurance(file);
      if (file && file.type === "application/pdf") {
        const objectURL = URL.createObjectURL(file);
        setInsurancePreview(objectURL);
      } else {
        setInsurancePreview(""); // Clear the iframe if an invalid file is selected
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const cloudinaryUpload = async (file: File) => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Bless-Tours");
      data.append("cloud_name", "dycbwnss2");
      const res: any = await Promise.race([
        Axios.post(
          `https://api.cloudinary.com/v1_1/dycbwnss2/image/upload`,
          data
        ),
        new Promise((_, rej) => {
          setTimeout(() => {
            rej(new Error("Network Timeout"));
          }, 20000);
        }),
      ]);
      return res.data.secure_url;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const handleUpload = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      router.prefetch("/auth/login");
      const [pictureUrl, identityUrl, insuranceUrl] = await Promise.all(
        [picture, identity, insurance].map((file) => cloudinaryUpload(file!))
      );
      const res: any = await fetch(
        `http://localhost:3001/api/v1/users/verify/${id}`,
        {
          method: "POST",
          body: JSON.stringify({
            picture: pictureUrl,
            identity: identityUrl,
            insurance: insuranceUrl,
            phone: phone,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const response = await res.json();
      if (response.statusCode === 201) {
        toast.success("Verification Successfull");
        router.push("/auth/login");
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
      <div className="container">
        <div className="w-full xl:w-[93.33%] xxl:w-[86.66%] mx-auto">
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
              initialOpen={true}
            >
              <div className="pt-4">
                <div className="border-t pt-4">
                  <form onSubmit={handleUpload}>
                    <div className="col-span-12 lg:col-span-12">
                      <label
                        htmlFor="user-phone"
                        className="block mb-2 font-medium clr-neutral-500"
                      >
                        Phone (Optional) :
                      </label>
                      <PhoneInput
                        defaultCountry="ua"
                        //onChange={(e) => (data.current.phoneNumber = e.target.value)}
                        required
                        inputClassName=" border w-full h-[200] focus:outline-none mx-16 py-16 px-32 m -32 rounded-3xl"
                        onChange={(phone) => setPhone(phone)}
                      />
                    </div>

                    <div className="pt-10 property-card__body">
                      <div className="flex flex-wrap justify-between items-center">
                        <p className="mt-6 mb-4 text-xl font-medium">
                          Profile Picture :
                        </p>
                        {picture ? (
                          <div className="w-25 h-50 relative">
                            <Image
                              src={imagePreview}
                              alt="profile picture"
                              height={100}
                              width={100}
                              className="w-full h-full"
                            />
                            <button
                              type="button"
                              className="bg-gray-100 rounded-full w-8 h-8 absolute top-0 right-0"
                              onClick={() => setProfilePicture(null)}
                            >
                              <XCircleIcon />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="profile picture"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or JPEG (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              type="file"
                              name="profile picture"
                              id="profile picture"
                              className="hidden"
                              accept=".jpg,.png,.jpeg"
                              onChange={imageHandler}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="pt-10 property-card__body">
                      <div className="flex flex-wrap justify-between items-center">
                        <p className="mt-6 mb-4 text-xl font-medium">
                          Identity Document :
                        </p>
                        {identity ? (
                          <div className="w-30 h-50 relative">
                            <iframe
                              src={`${pdfPreview}#toolbar=0`}
                              width="100%"
                              height="400px"
                            />
                            <button
                              type="button"
                              className="bg-gray-100 rounded-full w-8 h-8 absolute top-0 right-0"
                              onClick={() => setIdentity(null)}
                            >
                              <XCircleIcon />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="identity"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PDF or DOC (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              type="file"
                              name="identity"
                              id="identity"
                              className="hidden"
                              accept=".doc,.pdf"
                              onChange={identityHandler}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="pt-10 property-card__body">
                      <div className="flex flex-wrap justify-between items-center">
                        <p className="mt-6 mb-4 text-xl font-medium">
                          Insurance Document:
                        </p>
                        {insurance ? (
                          <div className="w-30 h-50 relative">
                            <iframe
                              src={`${insurancePreview}#toolbar=0`}
                              width="100%"
                              height="400px"
                            />
                            <button
                              type="button"
                              className="bg-gray-100 rounded-full w-8 h-8 absolute top-0 right-0"
                              onClick={() => setInsurance(null)}
                            >
                              <XCircleIcon />
                            </button>
                          </div>
                        ) : (
                          <label
                            htmlFor="insurance"
                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                PDF or DOC (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              type="file"
                              name="insurance"
                              id="insurance"
                              className="hidden"
                              accept=".doc,.pdf"
                              onChange={insuranceHandler}
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="mt-8 pt-10">
                      <button
                        type="submit"
                        className="btn-primary font-semibold"
                      >
                        <span className="inline-block">
                          {loading ? "Verifying..." : "Verify"}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Accordion>
          </div>
          {/* Item 2 */}
        </div>
      </div>
    </div>
  );
}
