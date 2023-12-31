"use client";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Footer from "@/components/vendor-dashboard/Vendor.Footer";
import CounterElement from "@/components/CounterElement";
import { useSession } from "next-auth/react";
import {url} from "@/utils/index";

interface ApiResponse {
  data: BookingData[];
}

interface ErrorResponse {
  message: string;
}

interface BookingData {
  _id: string;
  name: string;
  status: string;
  location: string;
  guests: number;
  amount: number;
  checkinDate: string;
  checkoutDate: string;
}

//async function fetchBookingData(
//  id: string,
//  page: string
//): Promise<BookingData[]> {
//  const response = await fetch(
//    `https://blesstours.onrender.com/api/v1/booking/vendor/${id}?page=${page}&limit=5`
//  );
//  const res = await response.json();
//  return res.data;
//}

async function fetchBookingData(
  id: string,
  page: string
): Promise<BookingData[]> {
  const response = await fetch(
    `${url}/api/v1/booking/vendor/${id}?page=${page}&limit=5`
  );
  const res = await response.json();
  return res.data;
}


export default async function Page() {
 
  const { data: session } = useSession();

  const fetchBookings = async () => {
    if (session && session.user && session.user.id) {
      const id = session.user.id;
      const bookings = await fetchBookingData(id, "1");
      return bookings;
    }
    return null;
  };

  const bookings = await fetchBookings();

  // const entries = packages.slice(start, end);
  return (
    <div>
      {/* statisticts */}
      <div className="grid z-[1] grid-cols-12 gap-4 lg:gap-6 px-6 bg-[var(--dark)] relative after:absolute xxl:after:bg-white after:w-full after:h-[50%] after:bottom-0 after:left-0 after:z-[-1] pb-10 xxl:pb-0">
        <div className="col-span-12 sm:col-span-6 xl:col-span-4 xxl:col-span-3 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD]">
          <i className="las self-center la-file-alt rounded-full bg-primary text-white text-3xl p-4"></i>
          <div>
            <h2 className="h2">
              {" "}
              <CounterElement end={66} />
            </h2>
            <p>Total Listings</p>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 xl:col-span-4 xxl:col-span-3 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#EBFBF2]">
          <i className="las self-center la-chart-area rounded-full bg-[var(--secondary-500)] text-white text-3xl p-4"></i>
          <div>
            <h2 className="h2">
              $ <CounterElement end={256} />k
            </h2>
            <p>Earning</p>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 xl:col-span-4 xxl:col-span-3 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#FFF9ED]">
          <i className="las self-center la-chart-bar rounded-full bg-[#9C742B] text-white text-3xl p-4"></i>
          <div>
            <h2 className="h2">
              {" "}
              <CounterElement end={6.4} decimals={1} />k
            </h2>
            <p>Visitors</p>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 xl:col-span-4 xxl:col-span-3 p-4 sm:p-6 lg:p-8 rounded-2xl flex gap-4 bg-[#EBEBFD]">
          <i className="lar self-center la-star rounded-full bg-primary text-white text-3xl p-4"></i>
          <div>
            <h2 className="h2">
              {" "}
              <CounterElement end={7.6} decimals={1} />k
            </h2>
            <p>Reviews</p>
          </div>
        </div>
      </div>
      {/* Charts */}

      {/* Recent bookings */}
      <section className="bg-white px-3 lg:px-6 mt-4 lg:mt-6 pb-5">
        <div className=" p-3 sm:p-4 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl">
          <div className="flex justify-between mb-7">
            <h3 className="h3">Recent Bookings</h3>
            <Link
              href="/vendor/bookings/?page=1&limit=6"
              className="text-primary font-semibold flex items-center gap-2"
            >
              View All <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
          <div className="overflow-x-auto min-h-[30vh]">
            {bookings ? (
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="text-left bg-[#F5F5FE] border-b border-dashed">
                    <th className="py-3 px-2">#</th>
                    <th className="py-3 px-2">Location</th>
                    <th className="py-3 px-2">Amount</th>
                    <th className="py-3 px-2">Guests</th>
                    <th className="py-3 px-2">check in date</th>
                    <th className="py-3 px-2">check out date</th>
                    <th className="py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(
                    ({
                      _id,
                      status,
                      location,
                      guests,
                      amount,
                      checkinDate,
                      checkoutDate,
                    }) => (
                      <tr key={_id} className="border-b border-dashed">
                        <td className="py-3 px-2">{_id}</td>
                        <td className="py-3 px-2 text-primary">{location}</td>
                        <td className="py-3 px-2">{amount}</td>
                        <td className="py-3 px-2">{guests}</td>
                        <td className="py-3 px-2">{checkinDate}</td>
                        <td className="py-3 px-2">{checkoutDate}</td>
                        <td className={`py-3 px-2`}>
                          <span
                            className={`py-2 px-3 rounded-xl ${
                              status == "rejected" &&
                              "text-[var(--secondary-500)] bg-[#EBFBF2]"
                            } ${
                              status == "completed" &&
                              "text-primary bg-[#EBEBFD]"
                            } ${
                              status == "upcoming" &&
                              "text-[#9C742B] bg-[#FFF9ED]"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            ) : (
              <h1> No bookings found</h1>
            )}
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
