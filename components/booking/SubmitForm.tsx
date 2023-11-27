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
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";
import Link from "next/link";
function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

const SubmitForm = ({
  amount,
  tourId,
  guests,
  checkinDate,
  checkoutdate,
}: {
  amount: number;
  tourId: string;
  guests: number;
  checkinDate: number;
  checkoutdate: number;
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

  const router = useRouter()


  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {

   
    try {
      e.preventDefault();
      setLoading(true);
      
      const response: any = await fetch(
        `${url}/api/v1/booking/add`,
        {
          method: "POST",
          body: JSON.stringify({
            userId: session?.user.id,
            tourId,
            guests: guests,
            checkinDate: checkinDate,
            checkoutDate: checkoutdate,
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


  return (
    <div className="col-span-12 xl:col-span-4">
      <div className="pb-0 mb-6 relative">
        <div className="bg-white rounded-2xl p-3 sm:p-4 lg:py-8 lg:px-6">
           
        <button
                    onClick={handleSubmit}
                    type="submit"
                    className="link inline-flex items-center gap-2 py-3 px-6 rounded-full bg-primary text-white :bg-primary-400 hover:text-white font-medium w-full justify-center mb-6"
                  >
                    <span className="inline-block">
                      {loading ? "loading..." : `Book Tour`}{" "}
                    </span>
                  </button>

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

export default SubmitForm;
