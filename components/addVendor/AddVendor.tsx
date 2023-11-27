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
  name: string;
  email: string;
  password: string;

}



const AddVendor = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const token = session?.user.token;
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [vendorDetails, setVendorDetails] = useState<FormInputs>({
    name: "",
    email: "",
    password: "",
  });

  
  const [picture, setProfilePicture] = useState<File | null>(null);

  const handleSetNewData = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setVendorDetails((prev) => ({ ...prev, [name]: value }));
  };


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
      //   router.prefetch("/auth/login");
      
      const [pictureUrl] = await Promise.all(
        [picture].map((file) => cloudinaryUpload(file!))
      );

      const res: any = await fetch(
        `${url}/api/v1/vendors/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            ...vendorDetails,
            profile: pictureUrl,
          }),
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": `${token}`,
          },
        }
      );
      const response = await res.json();
      if (response.statusCode === 201) {
        toast.success("Vendor Created Successfully");
        router.push("/admin/vendors");
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setVendorDetails({
        name: "",
        email: "",
        password: "",
      });
      setLoading(false);
    }
  };
  return (
    <div className="container">
      <div className="w-full xl:w-[83.33%] xxl:w-[66.66%] mx-auto">
        {/* Item 1 */}
        <form
        // onSubmit={handleUpdate}
        >
          <div className="bg-white p-4 sm:p-6 md:p-10 mb-5 sm:mb-8 md:mb-12 rounded-2xl">
            <Accordion
              buttonContent={(open) => (
                <div className="rounded-2xl flex justify-between items-center">
                  <h3 className="h3">Add Vendor </h3>
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
                  <div className="flex flex-wrap items-center flex-grow gap-4 gap-md-10">
                    <div className="flex items-center flex-grow gap-2 gap-md-4">
                      <div className="flex-grow">
                        <p className="mt-6 mb-4 text-xl font-medium"> Name: </p>
                        <input
                          type="text"
                          onChange={handleSetNewData}
                          name="name"
                          className="w-full border p-2 focus:outline-none rounded-md text-base"
                          placeholder="Enter name"
                          value={vendorDetails.name}
                        />
                      </div>
                    </div>
                    <div className="flex items-center flex-grow gap-2 gap-md-4">
                      <div className="flex-grow">
                        <p className="mt-6 mb-4 text-xl font-medium">
                          {" "}
                          Email:{" "}
                        </p>
                        <input
                          type="email"
                          name="email"
                          onChange={handleSetNewData}
                          className="w-full border p-2 focus:outline-none rounded-md text-base"
                          placeholder="Enter email"
                          value={vendorDetails.email}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 mb-4 text-xl font-medium">Image :</p>

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
                  
                  

              

                  
                  
                  

                  <p className="mt-6 mb-4 text-xl font-medium">
                    Password :
                  </p>
                  <input
                          type="password"
                          name="password"
                          onChange={handleSetNewData}
                          className="w-full border p-2 focus:outline-none rounded-md text-base"
                          placeholder="Enter password"
                          value={vendorDetails.password}
                        />

                
                  

                  
                </div>
              </div>
            </Accordion>
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="mt-6 btn-primary font-semibold"
          >
            <span className="inline-block">
              {loading ? "Creating..." : `Add Vendor `}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVendor;
