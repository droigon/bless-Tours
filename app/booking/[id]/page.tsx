"use client";
import Image from "next/image";
import Link from "next/link";
import {url} from "@/utils/index";
import DatePicker from "react-datepicker";
import SubmitForm from "@/components/booking/SubmitForm";
import "react-datepicker/dist/react-datepicker.css";
interface ErrorResponse {
  message: string;
}

type PostProps = {
  _id: string;
  ID: number;
  REFUND_POLICY: string;
  CANCELLATION_POLICY: string;
  NAME: string;
  DESCRIPTION: string;
  LOCATION: string;
  AMOUNT: number;
  DURATION: string;
  INCLUSION: string[];
  EXCLUSION: string[];
  IMAGES: [string];
  ITENARY: {
    name: string;
    description: string;
    location: string;
    title: string;
    _id: number;
  }[];
};







async function getTour(id: string) {
  try {
    const response: any = await fetch(
      `${url}/api/v1/tours/${id}`
    );
    const res = await response.json();
    if (res.statusCode == 200) {
      return res.data;
    } else {
      throw new Error(res.message);
    }
  } catch (error: any) {
    throw new Error(`failed to fetch tour:${error.message}`);
  }
}




export default async function BookingPage({
    params: { id },
    searchParams:{guests, checkinDate, checkoutdate}
  }: {
    params: { id: string };
    searchParams:{guests:number,checkinDate:number,checkoutdate:number}
  })
  {


  const checkin: Date = new Date(checkinDate * 1000);
  const checkout: Date = new Date(checkoutdate * 1000);

  const formattedcheckinDate: string = checkin.toLocaleDateString('en-US', {
    month: 'short', // Display full month name
    day: 'numeric', // Display day of the month
  });
  const formattedcheckOutDate: string = checkout.toLocaleDateString('en-US', {
    month: 'short', // Display full month name
    day: 'numeric', // Display day of the month
  });
  const tourData: PostProps = await getTour(id);


  

  return (
     <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
       <div className="container">
         <div className="grid grid-cols-12 gap-4 lg:gap-6">
          
           <div className="col-span-12 lg:col-span-8">
             <div className="pb-lg-0">
               <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 mb-6">
                 <h3 className="mb-0 h3"> Your Booking Info </h3>
                 <div className="border border-dashed my-6"></div>
                 <div className="grid grid-cols-12 gap-4 md:gap-3 mb-8">
                   <div className="col-span-12 md:col-span-4">
                     <div className="border border-neutral-40 rounded-2xl bg-[var(--bg-1)] py-4 px-4 px-xxl-8">
                       <div className="flex items-center justify-between gap-3 mb-1">
                         <span className="clr-neutral-400 inline-block text-sm">
                           Booking date
                         </span>
                         <i className="text-2xl las la-edit"></i>
                       </div>
                       <p className="mb-0 text-lg font-medium">
                      {formattedcheckinDate} - {formattedcheckOutDate}
                       </p>
                       
                     </div>
                   </div>
                   <div className="col-span-12 md:col-span-4">
                     <div className="border border-neutral-40 rounded-2xl bg-[var(--bg-1)] py-4 px-8">
                       <div className="flex items-center justify-between gap-3 mb-1">
                         <span className="clr-neutral-400 inline-block text-sm">
                           Guests
                         </span>
                         <i className="las la-user-friends text-2xl"></i>
                         
                       </div>
                       <p className="mb-0 text-lg font-medium"> {guests} </p>
                     </div>
                   </div>
                   <div className="col-span-12 md:col-span-4">
                     <div className="border border-neutral-40 rounded-2xl bg-[var(--bg-1)] py-4 px-8">
                       <div className="flex items-center justify-between gap-3 mb-1">
                         <span className="clr-neutral-400 inline-block text-sm">
                           Duration 
                         </span>
                         <i className="las text-2xl la-clock"></i>
                       </div>
                       <p className="mb-0 text-lg font-medium"> {tourData.DURATION} days</p>
                     </div>
                   </div>
                 </div>
                 <div className="flex flex-wrap border items-center rounded-2xl">
                   <div className="rounded-2xl p-2">
                     <Image
                       width={347}
                       height={243}
                       src={tourData?.IMAGES[0]}
                       alt="image"
                       className=" w-full rounded-2xl"
                     />
                   </div>

                   <div className="p-4">
                     <div className="property-card__body">
                       <Link
                         href={`/tour/${tourData._id}`}
                         className="link block text-[var(--neutral-700)] hover:text-primary text-xl font-medium mb-5"
                       >
                         {tourData.NAME}
                       </Link>
                       <div className="flex flex-row-reverse gap-3">
                        <div className="flex items-end ml-32 gap-1">
                          <i className="las la-dollar text-xl text-[var(--tertiary)]"></i>
                          <span className="inline-block clr-neutral-500">
                            ${tourData.AMOUNT}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <i className="las la-map-marker-alt text-xl text-[#22804A]"></i>
                          <span className="inline-block"> {tourData?.LOCATION} </span>
                        </div>
                      </div>
                       <div className="border border-dashed my-6"></div>
                       <ul className="flex flex-wrap gap-6">
                         <li>
                           <span className="material-symbols-outlined mat-icon clr-neutral-600 inline-block mb-1">
                           
                           </span>
                         </li>
                         <li>
                           <span className="material-symbols-outlined postion-left mat-icon clr-neutral-600 inline-block mb-1">
                           {" "}
                           </span>
                           <span className="block text-sm">
                             {" "}
                             
                           </span>
                         </li>
                         
                       </ul>

                       
                     </div>
                   </div>
                   
                 </div>
               </div>
               
               <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6">
                 <h4 className="mb-6 text-2xl font-semibold">
                   {" "}
                   Payment methods{" "}
                 </h4>
                 <ul className="flex flex-wrap items-center gap-6">
                   <li>
                     <div className="flex items-center gap-2">
                       <input
                         className="accent-[var(--primary)] scale-125"
                         type="radio"
                         name="property-type"
                         id="credit-card"
                       />
                       <label
                         className="inline-block text-lg font-medium cursor-pointer"
                         htmlFor="credit-card"
                       >
                         Credit card
                       </label>
                     </div>
                   </li>
                   <li>
                     <div className="flex items-center gap-2">
                       <input
                         className="accent-[var(--primary)] scale-125"
                         type="radio"
                         name="property-type"
                         id="debit-card"
                       />
                       <label
                         className="inline-block text-lg font-medium cursor-pointer"
                         htmlFor="debit-card"
                       >
                         Debit card
                       </label>
                     </div>
                   </li>
                   <li>
                     <div className="flex items-center gap-2">
                       <input
                         className="accent-[var(--primary)] scale-125"
                         type="radio"
                         name="property-type"
                         id="paypal"
                       />
                       <label
                         className="inline-block text-lg font-medium cursor-pointer"
                         htmlFor="paypal"
                       >
                         PayPal
                       </label>
                     </div>
                   </li>
                 </ul>
                 <div className="border border-dashed my-6"></div>
                 <div className="grid grid-cols-12 gap-4 lg:gap-6">
                   <div className="col-span-12">
                     <label
                       htmlFor="card-number"
                       className="text-xl font-medium block mb-3"
                     >
                       Card number
                     </label>
                     <input
                       type="text"
                       className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-full py-3 px-5"
                       placeholder="2456 1665 5155 5151"
                       id="card-number"
                     />
                   </div>
                   <div className="col-span-12 md:col-span-6">
                     <label
                       htmlFor="expiry-date"
                       className="text-xl font-medium block mb-3"
                     >
                       Expiry date
                     </label>
                     <input
                       type="text"
                       className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-full py-3 px-5"
                       placeholder="DD/MM/YY"
                       id="expiry-date"
                     />
                   </div>
                   <div className="col-span-12 md:col-span-6">
                     <label
                       htmlFor="cvc"
                       className="text-xl font-medium block mb-3"
                     >
                       CVC / CVV
                     </label>
                     <input
                       type="text"
                       className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-full py-3 px-5"
                       placeholder="3 digits"
                       id="cvc"
                     />
                   </div>
                   <div className="col-span-12">
                     <label
                       htmlFor="card-name"
                       className="text-xl font-medium block mb-3"
                     >
                       Name on card
                     </label>
                     <input
                       type="text"
                       className="w-full bg-[var(--bg-1)] focus:outline-none border border-neutral-40 rounded-full py-3 px-5"
                       placeholder="Jab Archur"
                       id="card-name"
                     />
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <div className="col-span-12 lg:col-span-4">
             <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 mb-6">
               <h4 className="mb-6 text-2xl font-semibold">
                 {" "}
                 Enter Promo Code{" "}
               </h4>
               <div className="p-2 rounded-full border border-neutral-40 bg-[var(--bg-2)] mb-4">
                 <form action="#" className="flex items-center">
                   <input
                     type="text"
                     placeholder="Promo Code"
                     className="w-full border-0 bg-transparent text-[var(--neutral-700)] px-3 py-2 ::placeholder-neutral-600 focus:outline-none"
                   />
                   <button
                     type="button"
                     className="grid place-content-center px-6 py-3 rounded-full bg-primary text-white border-0 text-sm"
                   >
                     Apply
                   </button>
                 </form>
               </div>
               <span className="block text-[var(--neutral-700)]">
               
               </span>
             </div>
             <div className="bg-white rounded-2xl p-3 sm:p-4 lg:p-6 border">
               <h4 className="mb-0 text-2xl font-semibold">Order Summary</h4>
               <div className="border border-dashed my-8"></div>
               <ul className="gap-4">
                 <li className="flex items-center justify-between flex-wrap">
                   <p className="mb-0">Amount</p>
                   <p className="mb-0 font-medium">${tourData.AMOUNT}</p>
                 </li>
                 <li className="flex items-center justify-between flex-wrap">
                   <p className="mb-0">Service charge</p>
                   <p className="mb-0 font-medium">10%</p>
                 </li>
                 <li className="flex items-center justify-between flex-wrap">
                   <p className="mb-0">Tax</p>
                   <p className="mb-0 font-medium">5%</p>
                 </li>
                 <li className="flex items-center justify-between flex-wrap">
                   <p className="mb-0">Promo Code</p>
                   <p className="mb-0 font-medium">20% off</p>
                 </li>
               </ul>
               <div className="border border-dashed my-8"></div>
               <div className="flex items-center justify-between flex-wrap mb-6">
                 <p className="mb-0">Payable Now</p>
                 <p className="mb-0 font-medium">{tourData.AMOUNT * guests}</p>
               </div>
            

               <SubmitForm amount={tourData.AMOUNT} tourId={tourData._id} guests={guests} checkinDate={checkinDate} checkoutdate={checkoutdate} />
             </div>
           </div>

         </div>
       </div>
     </div>
   
  );
}
