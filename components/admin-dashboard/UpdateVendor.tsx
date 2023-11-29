"use client";
import Accordion from "@/components/Accordion";
import {
  ChevronDownIcon,
  CloudArrowUpIcon,
  InformationCircleIcon,
  PlusCircleIcon,
  MinusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import Axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import "react-datepicker/dist/react-datepicker.css";
import {url} from "@/utils/index";

interface FormInputs {
  name?: string;
  email?: string;
  NAME: string;
  LOCATION: string;
  DESCRIPTION: string;
  CATEGORY: string;
  AMOUNT: number;
  GUESTS: number;
  DURATION: string;
  CANCELLATION_POLICY: string;
  REFUND_POLICY: string;
  INCLUSION: string[];
  EXCLUSION: string[];
  IMAGES: string[];
  VENDOR_ID: string;
}




const UpdateVendor = ({ data, id }: { data: FormInputs; id: string }) => {
  const { data: session } = useSession();
  const token = session?.user.token;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tourDetails, setTourDetails] = useState<FormInputs>();


  const [tourPictures, setTourPictures] = useState<(File | string)[]>([""]);

  const [[startDate, endDate], setDateRange] = useState<
    [Date | null, Date | null]
  >([null, null]);

  const handleSetNewData = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    
  };

  
  const handleAddImages = () => {
    setTourPictures((prev) => {
      return prev.concat("");
    });
  };

  const imageHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    try {
      const form = e.target;
      const files = form.files;
      if (!files || files.length === 0) {
        return toast.error("No files selected");
      }
      const file = files[0];
      if (!file) return;
      const prevPictures = [...tourPictures];
      prevPictures[index] = file;
      setTourPictures(prevPictures);
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

  const handleUpdate = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault();
      router.prefetch("/admin/vendors");
   

      const body = {
        ...tourDetails,

      };

     

      const jsonBody = JSON.stringify(body);

      const res: any = await fetch(
        `${url}/api/v1/tours/update/${id}`,
        {
          method: "PUT",
          body: jsonBody,
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": `${token}`,
          },
        }
      );
      const response = await res.json();
      if (response.statusCode === 200) {
        toast.success("Update Tour Successfull");
        router.push(`/admin/vendor/${id}`);
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
//  <div className="container">
//    <div className="w-full xl:w-[83.33%] xxl:w-[66.66%] mx-auto">
//      {/* Item 1 */}
//      <form
//      // onSubmit={handleUpdate}
//      >
//        <div className="bg-white p-4 sm:p-6 md:p-10 mb-5 sm:mb-8 md:mb-12 rounded-2xl">
//          <Accordion
//            buttonContent={(open) => (
//              <div className="rounded-2xl flex justify-between items-center">
//                <h3 className="h3">Update Tour </h3>
//                <ChevronDownIcon
//                  className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 ${
//                    open ? "rotate-180" : ""
//                  }`}
//                />
//              </div>
//            )}
//            initialOpen={true}
//          >
//            <div className="pt-4">
//              <div className="border-t pt-4">
//                <div className="flex flex-wrap items-center flex-grow gap-4 gap-md-10">
//                  <div className="flex items-center flex-grow gap-2 gap-md-4">
//                    <div className="flex-grow">
//                      <p className="mt-6 mb-4 text-xl font-medium"> Name: </p>
//                      <input
//                        type="text"
//                        defaultValue={data.name}
//                        onChange={handleSetNewData}
//                        name="NAME"
//                        className="w-full border p-2 focus:outline-none rounded-md text-base"
//                        placeholder="Enter name"
//                        value={tourDetails.name}
//                      />
//                    </div>
//                  </div>
//                  <div className="flex items-center flex-grow gap-2 gap-md-4">
//                    <div className="flex-grow">
//                      <p className="mt-6 mb-4 text-xl font-medium">
//                        {" "}
//                        Location:{" "}
//                      </p>
//                      <input
//                        type="text"
//                        defaultValue={data.email}
//                        name="EMAIL"
//                        onChange={handleSetNewData}
//                        className="w-full border p-2 focus:outline-none rounded-md text-base"
//                        placeholder="Enter location"
//                        value={tourDetails.email}
//                      />
//                    </div>
//                  </div>
//                </div>
//
//               
//                
//
//                
//                <div className="flex flex-col gap-2">
//                  <div className="rounded-2xl flex justify-between items-center">
//                    <p className="mt-6 mb-4 text-xl font-medium"> Images:</p>
//                    <PlusCircleIcon
//                      onClick={handleAddImages}
//                      className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 cursor-pointer
//            }`}
//                    />
//                  </div>
//                  <div className="flex flex-col gap-3">
//                    {tourPictures.map((picture, index) => (
//                      <div
//                        key={index}
//                        className="w-[80%] h-50 flex items-start justify-between"
//                      >
//                        {typeof picture === "string" ? (
//                          <label
//                            htmlFor={`tourpic-${index}`}
//                            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover.bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover.bg-gray-600"
//                          >
//                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                              <svg
//                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                                aria-hidden="true"
//                                xmlns="http://www.w3.org/2000/svg"
//                                fill="none"
//                                viewBox="0 0 20 16"
//                              >
//                                <path
//                                  stroke="currentColor"
//                                  strokeLinecap="round"
//                                  strokeLinejoin="round"
//                                  strokeWidth="2"
//                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                                />
//                              </svg>
//                              <p className="text-sm text-gray-500 dark:text-gray-400">
//                                <span className="font-semibold">
//                                  Click to upload
//                                </span>{" "}
//                                or drag and drop
//                              </p>
//                              <p className="text-xs text-gray-500 dark:text-gray-400">
//                                SVG, PNG, JPG or JPEG (MAX. 800x400px)
//                              </p>
//                            </div>
//                            <input
//                              type="file"
//                              name={`tourpic-${index}`}
//                              id={`tourpic-${index}`}
//                              className="hidden"
//                              accept=".jpg,.png,.jpeg"
//                              onChange={(e) => imageHandler(e, index)}
//                            />
//                          </label>
//                        ) : (
//                          <div className="w-25 h-50 relative">
//                            <Image
//                              src={URL.createObjectURL(picture)}
//                              alt={`tourpic-${index}`}
//                              height={100}
//                              width={100}
//                              className="w-full h-full"
//                            />
//                            <button
//                              type="button"
//                              className="bg-gray-100 rounded-full w-8 h-8 absolute top-0 right-0"
//                              onClick={() => {
//                                const prevImages = [...tourPictures];
//                                prevImages[index] = "";
//                                setTourPictures(prevImages);
//                              }}
//                            >
//                              <XCircleIcon />
//                            </button>
//                          </div>
//                        )}
//                        {tourPictures.length > 1 && (
//                          <MinusCircleIcon
//                            style={{
//                              cursor: "pointer",
//                              color: "red",
//                              width: "20px",
//                              marginLeft: "10px",
//                            }}
//                            onClick={() => handleRemoveImage(index)}
//                          />
//                        )}
//                      </div>
//                    ))}
//                  </div>
//                </div>
//
//             
//              </div>
//            </div>
//          </Accordion>
//        </div>
//        <button
//          type="button"
//          onClick={handleUpdate}
//          className="mt-6 btn-primary font-semibold"
//        >
//          <span className="inline-block">
//            {loading ? "Uploading..." : `Upload Tour `}
//          </span>
//        </button>
//      </form>
//    </div>
//  </div>
<>hello</>
);
  }

export default UpdateVendor;
