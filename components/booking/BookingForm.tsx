"use client"; 
import { Tab } from "@headlessui/react";
import { useState } from "react";
import CheckboxCustom from "@/components/Checkbox";
import DatePicker from "react-datepicker";
import { HeartIcon } from "@heroicons/react/24/outline";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import {url} from "@/utils/index";
import Link from "next/link";
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const BookingForm = ({
  amount,
  tourId,
}: {
  amount: number;
  tourId: string;
}) => {
  //   const [[startDate, endDate], setDateRange] = useState<
  //     [number | null, number | null]
  //   >([null, null]);
  const { data: session } = useSession();
  const [[startDate, endDate], setDateRange] = useState<
    [Date | null, Date | null]
  >([null, null]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<{
    guests: number | null;
  }>({ guests: null });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {

   
    try {
      e.preventDefault();
      setLoading(true);
      const checkinDate: number = new Date(startDate!).getTime() / 1000;
      const checkoutDate: number = new Date(endDate!).getTime() / 1000;
      const response: any = await fetch(
        `${url}/api/v1/booking/add`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: session?.user.id,
            tourId,
            guests: formData.guests,
            checkinDate,
            checkoutDate,
          }),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-user-token": session?.user.token as string,
          },
        }
      );
      const res: any = await response.json();
      console.log(res)
      if (res.statusCode == 201) {
        toast.success("Tour booked successfully");
        return res.data;
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log("formData:", formData);

  console.log("startDate", startDate, "endDate", endDate);

  console.log(new Date(startDate!).getTime() / 1000);

  return (
    <div className="col-span-12 xl:col-span-4">
      <div className="pb-0 mb-6 relative">
        <div className="bg-white rounded-2xl p-3 sm:p-4 lg:py-8 lg:px-6">
          <p className="mb-3 text-lg font-medium"> Price </p>
          <div className="flex items-start gap-2 mb-6">
            <div className="flex gap-3 items-center">
              <i className="las la-tag text-2xl"></i>
              <p className="mb-0"> From </p>
              <h3 className="h3 mb-0"> ${amount} </h3>
            </div>
            <i className="las la-info-circle text-2xl"></i>
          </div>

          <Tab.Group>
            <Tab.List className="flex gap-3 about-tab mb-7">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "focus:outline-none",
                    selected ? "text-primary font-medium" : ""
                  )
                }
              >
                Booking Form
              </Tab>
              <span>|</span>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "focus:outline-none",
                    selected ? "text-primary font-medium" : ""
                  )
                }
              >
                Enquiry Form
              </Tab>
            </Tab.List>
            <Tab.Panels className="tab-content mb-8">
              <Tab.Panel>
                <form className="grid grid-cols-1 gap-3">
                  {/* <div className="col-span-1">
                    <div className="w-full flex">
                      <input
                        type="text"
                        required
                        className="w-[83%] min-[400px]:w-full focus:outline-none bg-[var(--bg-2)] border border-r-0 border-neutral-40 rounded-s-full rounded-end-0 py-3 px-5"
                        onChange={handleInputChange}
                        name="location"
                        placeholder="Location"
                      />
                      <span className="bg-[var(--bg-2)] border border-l-0 border-neutral-40 rounded-e-full py-[14px] text-gray-500 pe-4 ps-0">
                        <i className="las text-2xl la-map-marker-alt"></i>
                      </span>
                    </div>
                  </div> */}
                  <div className="col-span-1">
                    <div className="w-full flex">
                      <DatePicker
                        placeholderText="Check In - Check Out"
                        selectsRange={true}
                        required
                        startDate={startDate}
                        dateFormat="dd-MM-yyyy"
                        name="date"
                        endDate={endDate}
                        // onChange={handleDateChange}
                        onChange={(date: [Date | null, Date | null]) =>
                          setDateRange(date)
                        }
                        className="bg-[var(--bg-2)] w-full border border-r-0 border-neutral-40 rounded-s-full py-[14px] text-gray-500  ps-4 focus:outline-none"
                      />
                      <span className="bg-[var(--bg-2)] border border-l-0 border-neutral-40 rounded-e-full py-3 text-gray-500 pe-4 ps-0">
                        <i className="las text-2xl la-calendar-alt"></i>
                      </span>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <div className="w-full flex">
                      <input
                        type="number"
                        required
                        onChange={handleInputChange}
                        name="guests"
                        className="w-[83%] min-[400px]:w-full focus:outline-none bg-[var(--bg-2)] border border-r-0 border-neutral-40 rounded-s-full rounded-end-0 py-3 px-5"
                        placeholder="Guest"
                      />
                      <span className="bg-[var(--bg-2)] border border-l-0 border-neutral-40 rounded-e-full py-[14px] text-gray-500 pe-4 ps-0">
                        <i className="las la-user-friends text-2xl"></i>
                      </span>
                    </div>
                  </div>
                  <Link href={{pathname:`/booking/${tourId}`,query:{guests:formData.guests,checkinDate:new Date(startDate!).getTime() / 1000, checkoutdate:new Date(endDate!).getTime() / 1000 } }} 
                  className="link inline-flex items-center gap-2 py-3 px-6 rounded-full bg-primary text-white :bg-primary-400 hover:text-white font-medium w-full justify-center mb-6">
                  <span className="inline-block">
                      {loading ? "loading..." : `Proceed Booking`}{" "}
                    </span>

                  </Link>
                </form>
              </Tab.Panel>
              <Tab.Panel>
                <form className="flex flex-col gap-5">
                  <input
                    type="text"
                    placeholder="Name..."
                    className="w-full rounded-full bg-[var(--bg-1)] border focus:outline-none py-2 px-3 md:py-3 md:px-4"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email..."
                    className="w-full rounded-full bg-[var(--bg-1)] border focus:outline-none py-2 px-3 md:py-3 md:px-4"
                    required
                  />
                  <textarea
                    rows={6}
                    placeholder="Message..."
                    className="w-full rounded-3xl bg-[var(--bg-1)] border focus:outline-none py-2 px-3 md:py-3 md:px-4"
                  ></textarea>
                  <CheckboxCustom label="I agree with Terms of Service and Privacy Statement" />
                  <button
                    // onClick={handleSubmit}
                    className="link inline-flex items-center gap-2 py-3 px-6 rounded-full bg-primary text-white :bg-primary-400 hover:text-white font-medium w-full justify-center mb-6"
                  >
                    <span className="inline-block"> Enquire </span>
                  </button>
                </form>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          <ul className="flex justify-center gap-6">
            <li>
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 rounded-full bg-[var(--primary-light)] text-primary grid place-content-center">
                  <HeartIcon className="w-5 h-5" />
                </button>
                <span className="inline-block text-sm clr-neutral-500">
                  Save To Wish List
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
