"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import Conversations from "../../../components/conversations/Conversations";
async function fetchTour(tourId: string): Promise<any> {
  const response = await fetch(
    `https://blesstours.onrender.com/api/v1/tours/${tourId}`
  );
  const data = await response.json();
  console.log("tours data", data);

  return data.data;
}

// async function fetchUserBookings(userId: string): Promise<any> {
//   const response = await fetch(
//     `https://blesstours.onrender.com/api/v1/booking/user/${userId}`
//   );
//   const data = await response.json();
//   // console.log("bookings", data.data);

//   const tourIds = data?.data.map(({ tourId }: { tourId: string }) => tourId);
//   const toursData = await Promise.all(
//     tourIds?.map((id: string) => fetchTour(id))
//   );

//   return toursData;
//   const toursDataWithBookingId = await Promise.all(
//     data.data.map(async ({ tourId, _id }: { tourId: string; _id: string }) => {
//       const tourData = await fetchTour(tourId);
//       return { ...tourData, bookingId: _id }; // Add booking _id as 'bookingId' attribute
//     })
//   );

//   return toursDataWithBookingId;
// }

async function fetchUserBookings(userId: string): Promise<any> {
  try {
    const response = await fetch(
      `https://blesstours.onrender.com/api/v1/booking/user/${userId}`
    );
    const data = await response.json();

    // Check if data and data.data are defined before operating on them
    const tourIds = data?.data?.map(({ tourId }: { tourId: string }) => tourId);

    if (!tourIds || tourIds.length === 0) {
      return []; // Return an empty array or handle empty data according to your logic
    }

    const toursData = await Promise.all(
      tourIds.map((id: string) => fetchTour(id))
    );

    return toursData;
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    // Handle error: return an empty array or throw the error based on your application's error handling
    return [];
  }
}

const Page = async () => {
  const { data: session } = useSession();
  console.log("session", session?.user.id);

  const bookings = await fetchUserBookings(session?.user?.id!);
  console.log("bookings", bookings);

  return (
    <div className="min-h-full rounded-2xl bg-white shadow-3 grid grid-cols-12">
      <Conversations
        bookings={bookings}
        id={session?.user.id!}
        token={session?.user.token!}
      />
    </div>
  );
};

export default Page;
