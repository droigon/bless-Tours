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
  location: string;
  description: string;
  images: string[];
  category: string;
  cancellation_policy: string;
  refund_policy: string;
  amount: number | null;
  guests: number | null;
  exclusion: string[];
  inclusion: string[];
  itenary: Itenary[];
}

interface Itenary {
  name: string;
  location: string;
  title: string;
  description: string;
}

const AddTour = () => {
  const { data: session } = useSession();
  const token = session?.user.token;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [tourDetails, setTourDetails] = useState<FormInputs>({
    name: "",
    location: "",
    description: "",
    category: "",
    amount: null,
    guests: null,
    cancellation_policy: "",
    refund_policy: "",
    inclusion: [],
    exclusion: [],
    itenary: [],
    images: [],
  });

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
    setTourDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleInclusionChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedInclusionArray = [...tourDetails.inclusion];
    updatedInclusionArray[index] = event.target.value;
    setTourDetails((prev) => ({ ...prev, inclusion: updatedInclusionArray }));
  };

  const removeInclusion = (index: number) => {
    const updatedInclusionArray = [...tourDetails.inclusion];
    updatedInclusionArray.splice(index, 1);
    setTourDetails((prev) => ({ ...prev, inclusion: updatedInclusionArray }));
  };

  const handleExclusionChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedExclusionArray = [...tourDetails.exclusion];
    updatedExclusionArray[index] = event.target.value;
    setTourDetails((prev) => ({ ...prev, exclusion: updatedExclusionArray }));
  };

  const removeExclusion = (index: number) => {
    const updatedExclusionArray = [...tourDetails.exclusion];
    updatedExclusionArray.splice(index, 1);
    setTourDetails((prev) => ({ ...prev, exclusion: updatedExclusionArray }));
  };

  const handleAddItenary = () => {
    setTourDetails((prev) => ({
      ...prev,
      itenary: [
        ...prev.itenary,
        { name: "", location: "", title: "", description: "" },
      ],
    }));
  };

  const handleRemoveItenary = (index: number) => {
    const updatedItenary = [...tourDetails.itenary];
    updatedItenary.splice(index, 1);
    setTourDetails((prev) => ({ ...prev, itenary: updatedItenary }));
  };

  const handleRemoveImage = (index: number) => {
    const updatedImage = [...tourPictures];
    updatedImage.splice(index, 1);
    setTourPictures(updatedImage);
  };

  const handleItenaryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedItenary = [...tourDetails.itenary];
    updatedItenary[index][name as keyof Itenary] = value;
    setTourDetails((prev) => ({ ...prev, itenary: updatedItenary }));
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
      console.log(tourDetails);
      e.preventDefault();
      //   router.prefetch("/auth/login");
      const images = await Promise.all(
        tourPictures
          .filter((picture) => typeof picture !== "string")
          .map((file) => cloudinaryUpload(file as File))
      );
      const checkinDate: number = new Date(startDate!).getTime() / 1000;
      const checkoutDate: number = new Date(endDate!).getTime() / 1000;

      const res: any = await fetch(
        `${url}/api/v1/tours/add`,
        {
          method: "POST",
          body: JSON.stringify({
            ...tourDetails,
            images,
            checkin: checkinDate,
            checkout: checkoutDate,
          }),
          headers: {
            "Content-Type": "application/json",
            "x-vendor-token": `${token}`,
          },
        }
      );
      const response = await res.json();
      if (response.statusCode === 201) {
        toast.success("Tour Created Successfull");
        router.push("/vendor/listings");
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setTourDetails({
        name: "",
        location: "",
        description: "",
        category: "",
        amount: null,
        guests: null,
        cancellation_policy: "",
        refund_policy: "",
        inclusion: [],
        exclusion: [],
        itenary: [],
        images: [],
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
                  <h3 className="h3">Add Tour </h3>
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
                          value={tourDetails.name}
                        />
                      </div>
                    </div>
                    <div className="flex items-center flex-grow gap-2 gap-md-4">
                      <div className="flex-grow">
                        <p className="mt-6 mb-4 text-xl font-medium">
                          {" "}
                          Location:{" "}
                        </p>
                        <input
                          type="text"
                          name="location"
                          onChange={handleSetNewData}
                          className="w-full border p-2 focus:outline-none rounded-md text-base"
                          placeholder="Enter location"
                          value={tourDetails.location}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 mb-4 text-xl font-medium">Description :</p>
                  <textarea
                    rows={5}
                    className="w-full border p-2 focus:outline-none rounded-md "
                    placeholder="Description.."
                    name="description"
                    onChange={handleSetNewData}
                    value={tourDetails.description}
                  />

                  <p className="mt-6 mb-4 text-xl font-medium"> Category </p>
                  <select
                    className="w-full bg-transparent px-5 py-3 focus:outline-none border rounded-md text-base pr-3"
                    name="category"
                    onChange={handleSetNewData}
                    value={tourDetails.category}
                  >
                    <option>------</option>
                    <option value="Others">Others</option>
                    <option value="Holy land">Holy Land</option>
                    <option value="Holy city">Holy City</option>
                  </select>

                  <div className="flex flex-wrap items-center flex-grow gap-4 gap-md-10">
                    <div className="flex items-center flex-grow gap-2 gap-md-4">
                      <div className="flex-grow">
                        <p className="mt-6 mb-4 text-xl font-medium">
                          Amount:{" "}
                        </p>
                        <input
                          type="number"
                          name="amount"
                          onChange={handleSetNewData}
                          value={tourDetails.amount!}
                          className="w-full border p-2 focus:outline-none rounded-md text-base"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                    <div className="flex items-center flex-grow gap-2 gap-md-4">
                      <div className="flex-grow">
                        <p className="mt-6 mb-4 text-xl font-medium">
                          {" "}
                          No Of Guests :{" "}
                        </p>
                        <input
                          type="number"
                          onChange={handleSetNewData}
                          value={tourDetails.guests!}
                          name="guests"
                          className="w-full border p-2 focus:outline-none rounded-md text-base"
                          placeholder="Enter guests"
                        />
                      </div>
                    </div>
                  </div>
                  <p className="mt-6 mb-4 text-xl font-medium">
                    Duration (Days) :
                  </p>
                  <div className="w-full flex">
                    <DatePicker
                      placeholderText="Check In - Check Out"
                      selectsRange={true}
                      required
                      startDate={startDate}
                      dateFormat="dd-MM-yyyy"
                      name="date"
                      endDate={endDate}
                      onChange={(date: [Date | null, Date | null]) =>
                        setDateRange(date)
                      }
                      className="bg-[var(--bg-2)] w-full border border-r-0 border-neutral-40 rounded-s-full py-[14px] text-gray-500  ps-4 focus:outline-none"
                    />
                    <span className="bg-[var(--bg-2)] border border-l-0 border-neutral-40 rounded-e-full py-3 text-gray-500 pe-4 ps-0">
                      <i className="las text-2xl la-calendar-alt"></i>
                    </span>
                  </div>
                  <div className="rounded-2xl flex justify-between items-center">
                    <p className="mt-6 mb-4 text-xl font-medium">
                      {" "}
                      Inclusions:
                    </p>
                    <PlusCircleIcon
                      onClick={() =>
                        setTourDetails((prev) => ({
                          ...prev,
                          inclusion: [...prev.inclusion, ""],
                        }))
                      }
                      className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 cursor-pointer
                      }`}
                    />
                  </div>

                  {tourDetails.inclusion.map((inclusion, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <input
                        type="text"
                        placeholder={`Add inclusion `}
                        value={inclusion}
                        className="w-full border p-2 mt-4 focus:outline-none rounded-md text-base"
                        onChange={(event) =>
                          handleInclusionChange(index, event)
                        }
                      />
                      {tourDetails.inclusion.length > 1 && (
                        <MinusCircleIcon
                          style={{
                            cursor: "pointer",
                            color: "red",
                            width: "20px",
                            marginLeft: "10px",
                          }}
                          onClick={() => removeInclusion(index)}
                        />
                      )}
                    </div>
                  ))}

                  <div className="rounded-2xl flex justify-between items-center">
                    <p className="mt-6 mb-4 text-xl font-medium">
                      {" "}
                      Exclusions:
                    </p>
                    <PlusCircleIcon
                      onClick={() =>
                        setTourDetails((prev) => ({
                          ...prev,
                          exclusion: [...prev.exclusion, ""],
                        }))
                      }
                      className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 cursor-pointer
                      }`}
                    />
                  </div>
                  {tourDetails.exclusion.map((exclusion, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <input
                        type="text"
                        placeholder={`Add exclusion `}
                        value={exclusion}
                        className="w-full border p-2 mt-4 focus:outline-none rounded-md text-base"
                        onChange={(event) =>
                          handleExclusionChange(index, event)
                        }
                      />
                      {tourDetails.exclusion.length > 1 && (
                        <MinusCircleIcon
                          style={{
                            cursor: "pointer",
                            color: "red",
                            width: "20px",
                            marginLeft: "10px",
                          }}
                          onClick={() => removeExclusion(index)}
                        />
                      )}
                    </div>
                  ))}

                  <p className="mt-6 mb-4 text-xl font-medium">
                    Cancellation Policy :
                  </p>
                  <textarea
                    rows={5}
                    name="cancellation_policy"
                    onChange={handleSetNewData}
                    className="w-full border p-2 focus:outline-none rounded-md "
                    placeholder="Description.."
                  />

                  <p className="mt-6 mb-4 text-xl font-medium">
                    Refund Policy :
                  </p>
                  <textarea
                    rows={5}
                    name="refund_policy"
                    onChange={handleSetNewData}
                    className="w-full border p-2 focus:outline-none rounded-md "
                    placeholder="Description.."
                  />

                  <div className="flex flex-col gap-2">
                    <div className="rounded-2xl flex justify-between items-center">
                      <p className="mt-6 mb-4 text-xl font-medium"> Images:</p>
                      <PlusCircleIcon
                        onClick={handleAddImages}
                        className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 cursor-pointer
              }`}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      {tourPictures.map((picture, index) => (
                        <div
                          key={index}
                          className="w-[80%] h-50 flex items-start justify-between"
                        >
                          {typeof picture === "string" ? (
                            <label
                              htmlFor={`tourpic-${index}`}
                              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover.bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover.bg-gray-600"
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
                                name={`tourpic-${index}`}
                                id={`tourpic-${index}`}
                                className="hidden"
                                accept=".jpg,.png,.jpeg"
                                onChange={(e) => imageHandler(e, index)}
                              />
                            </label>
                          ) : (
                            <div className="w-25 h-50 relative">
                              <Image
                                src={URL.createObjectURL(picture)}
                                alt={`tourpic-${index}`}
                                height={100}
                                width={100}
                                className="w-full h-full"
                              />
                              <button
                                type="button"
                                className="bg-gray-100 rounded-full w-8 h-8 absolute top-0 right-0"
                                onClick={() => {
                                  const prevImages = [...tourPictures];
                                  prevImages[index] = "";
                                  setTourPictures(prevImages);
                                }}
                              >
                                <XCircleIcon />
                              </button>
                            </div>
                          )}
                          {tourPictures.length > 1 && (
                            <MinusCircleIcon
                              style={{
                                cursor: "pointer",
                                color: "red",
                                width: "20px",
                                marginLeft: "10px",
                              }}
                              onClick={() => handleRemoveImage(index)}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl flex justify-between items-center">
                    <p className="mt-6 mb-4 text-xl font-medium"> Itenary:</p>
                    <PlusCircleIcon
                      onClick={handleAddItenary}
                      className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 cursor-pointer
              }`}
                    />
                  </div>
                  {tourDetails.itenary.map((field, index) => (
                    <div key={index}>
                      <div className="flex  mb-4">
                        <input
                          type="text"
                          placeholder="Name"
                          className="w-half mr-6 border p-2 focus:outline-none rounded-md text-base"
                          value={field.name}
                          name="name"
                          onChange={(e) => handleItenaryChange(e, index)}
                        />
                        <input
                          type="text"
                          placeholder="Location"
                          className="w-half mr-6 border p-2 focus:outline-none rounded-md text-base"
                          value={field.location}
                          name="location"
                          onChange={(e) => handleItenaryChange(e, index)}
                        />
                        <input
                          type="text"
                          placeholder="Title"
                          className="w-half mr-6 border p-2 focus:outline-none rounded-md text-base"
                          value={field.title}
                          name="title"
                          onChange={(e) => handleItenaryChange(e, index)}
                        />
                      </div>
                      <textarea
                        rows={5}
                        name="description"
                        onChange={(e) => handleItenaryChange(e, index)}
                        value={field.description}
                        className="w-full border p-2 focus:outline-none rounded-md "
                        placeholder="Description.."
                      ></textarea>

                      {tourDetails.itenary.length > 0 && (
                        <button onClick={() => handleRemoveItenary(index)}>
                          <MinusCircleIcon
                            style={{
                              cursor: "pointer",
                              color: "red",
                              width: "20px",
                              marginLeft: "10px",
                            }}
                          />{" "}
                          Remove Field
                        </button>
                      )}
                    </div>
                  ))}
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
              {loading ? "Creating..." : `Add Tour `}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTour;
