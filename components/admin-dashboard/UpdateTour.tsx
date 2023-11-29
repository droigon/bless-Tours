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
  NAME?: string;
  LOCATION?: string;
  DESCRIPTION?: string;
  CATEGORY?: string;
  AMOUNT?: number;
  GUESTS?: number;
  DURATION?: string;
  CANCELLATION_POLICY?: string;
  REFUND_POLICY?: string;
  INCLUSION?: string[];
  EXCLUSION?: string[];
  ITENARY?: Itenary[];
  IMAGES?: string[];
}

interface Itenary {
  name: string;
  location: string;
  title: string; 
  description: string;
}

const UpdateTour = ({ data, id }: { data: FormInputs; id: string }) => {
  const { data: session } = useSession();
  const token = session?.user.token;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tourDetails, setTourDetails] = useState<FormInputs>({});


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
    let updatedInclusionArray: string[];
    if (tourDetails.INCLUSION) {
      updatedInclusionArray = [...tourDetails.INCLUSION];
    } else {
      updatedInclusionArray = [];
    }
    updatedInclusionArray[index] = event.target.value;
    setTourDetails((prev) => ({ ...prev, INCLUSION: updatedInclusionArray }));
  };

  const removeInclusion = (index: number) => {
    if (tourDetails.INCLUSION?.length && tourDetails.INCLUSION.length > 0) {
      const updatedInclusionArray = [...tourDetails.INCLUSION];
      updatedInclusionArray.splice(index, 1);
      setTourDetails((prev) => ({ ...prev, INCLUSION: updatedInclusionArray }));
    } else if (
      tourDetails.INCLUSION?.length &&
      tourDetails.INCLUSION.length === 0
    ) {
      const { INCLUSION, ...rest } = tourDetails;
      setTourDetails(rest);
    }
  };

  const handleExclusionChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let updatedExclusionArray: string[];
    if (tourDetails.EXCLUSION) {
      updatedExclusionArray = [...tourDetails.EXCLUSION];
    } else {
      updatedExclusionArray = [];
    }
    updatedExclusionArray[index] = event.target.value;
    setTourDetails((prev) => ({ ...prev, EXCLUSION: updatedExclusionArray }));
  };

  const removeExclusion = (index: number) => {
    if (tourDetails.EXCLUSION?.length && tourDetails.EXCLUSION.length > 0) {
      const updatedExclusionArray = [...tourDetails.EXCLUSION];
      updatedExclusionArray.splice(index, 1);
      setTourDetails((prev) => ({ ...prev, EXCLUSION: updatedExclusionArray }));
    } else if (
      tourDetails.EXCLUSION?.length &&
      tourDetails.EXCLUSION.length === 0
    ) {
      const { EXCLUSION, ...rest } = tourDetails;
      setTourDetails(rest);
    }
  };

  const handleAddItenary = () => {
    setTourDetails((prev) => ({
      ...prev,
      ITENARY: [
        ...(prev.ITENARY || []), // If ITENARY exists, spread its values, otherwise start with an empty array
        { name: "", location: "", title: "", description: "" }, // Add the new object
      ],
    }));
  };

  const handleRemoveItenary = (index: number) => {
    if (tourDetails.ITENARY?.length && tourDetails.ITENARY.length > 0) {
      const updatedInclusionArray = [...tourDetails.ITENARY];
      updatedInclusionArray.splice(index, 1);
      setTourDetails((prev) => ({ ...prev, ITENARY: updatedInclusionArray }));
    } else if (
      tourDetails.ITENARY?.length &&
      tourDetails.ITENARY.length === 0
    ) {
      const { ITENARY, ...rest } = tourDetails;
      setTourDetails(rest);
    }
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
    let updatedItenary: Itenary[];
    if (tourDetails.ITENARY) {
      updatedItenary = [...tourDetails.ITENARY];
    } else {
      updatedItenary = [];
    }
    updatedItenary[index][name as keyof Itenary] = value;
    setTourDetails((prev) => ({ ...prev, ITENARY: updatedItenary }));
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
      let images: string[] | null;
      router.prefetch("/admin/tours");
      images = await Promise.all(
        tourPictures
          .filter((picture) => typeof picture !== "string")
          .map((file) => cloudinaryUpload(file as File))
      );
      if (images.length == 0) {
        images = null;
      }

      const body = {
        ...tourDetails,
      };

      if (images !== null) {
        body["IMAGES"] = images;
      }

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
        router.push("/admin/tours");
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
                  <h3 className="h3">Update Tour </h3>
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
                          defaultValue={data.NAME}
                          onChange={handleSetNewData}
                          name="NAME"
                          className="w-full border p-2 focus:outline-none rounded-md text-base"
                          placeholder="Enter name"
                          value={tourDetails.NAME}
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
                          defaultValue={data.LOCATION}
                          name="LOCATION"
                          onChange={handleSetNewData}
                          className="w-full border p-2 focus:outline-none rounded-md text-base"
                          placeholder="Enter location"
                          value={tourDetails.LOCATION}
                        />
                      </div>
                    </div>
                  </div>

                  <p className="mt-6 mb-4 text-xl font-medium">Description :</p>
                  <textarea
                    rows={5}
                    defaultValue={data.DESCRIPTION}
                    className="w-full border p-2 focus:outline-none rounded-md "
                    placeholder="Description.."
                    name="DESCRIPTION"
                    onChange={handleSetNewData}
                    value={tourDetails.DESCRIPTION}
                  ></textarea>

                  <p className="mt-6 mb-4 text-xl font-medium"> Category </p>
                  <select
                    className="w-full bg-transparent px-5 py-3 focus:outline-none border rounded-md text-base pr-3"
                    defaultValue={data.CATEGORY}
                    name="CATEGORY"
                    onChange={handleSetNewData}
                    value={tourDetails.CATEGORY}
                  >
                    <option>------</option>
                    <option value="Vacation">Vacation</option>
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
                          defaultValue={data.AMOUNT}
                          name="AMOUNT"
                          onChange={handleSetNewData}
                          value={tourDetails.AMOUNT}
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
                          defaultValue={data.GUESTS}
                          onChange={handleSetNewData}
                          value={tourDetails.GUESTS}
                          name="GUESTS"
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
                          INCLUSION: [...(prev.INCLUSION || []), ""],
                        }))
                      }
                      className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 cursor-pointer
                      }`}
                    />
                  </div>

                  {tourDetails.INCLUSION &&
                    tourDetails.INCLUSION.map((inclusion, index) => (
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
                        {tourDetails.INCLUSION &&
                          tourDetails.INCLUSION.length > 1 && (
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
                          EXCLUSION: [...(prev.EXCLUSION || []), ""],
                        }))
                      }
                      className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 cursor-pointer
                      }`}
                    />
                  </div>
                  {tourDetails.EXCLUSION &&
                    tourDetails.EXCLUSION.map((exclusion, index) => (
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
                        {tourDetails.EXCLUSION &&
                          tourDetails.EXCLUSION.length > 1 && (
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
                    defaultValue={data.CANCELLATION_POLICY}
                    name="CANCELLATION_POLICY"
                    onChange={handleSetNewData}
                    className="w-full border p-2 focus:outline-none rounded-md "
                    placeholder="Description.."
                  ></textarea>

                  <p className="mt-6 mb-4 text-xl font-medium">
                    Refund Policy :
                  </p>
                  <textarea
                    rows={5}
                    defaultValue={data.REFUND_POLICY}
                    name="REFUND_POLICY"
                    onChange={handleSetNewData}
                    className="w-full border p-2 focus:outline-none rounded-md "
                    placeholder="Description.."
                  ></textarea>

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
                  {tourDetails.ITENARY &&
                    tourDetails.ITENARY.map((field, index) => (
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
                        />

                        {tourDetails.ITENARY &&
                          tourDetails.ITENARY.length > 0 && (
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
              {loading ? "Uploading..." : `Upload Tour `}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTour;
