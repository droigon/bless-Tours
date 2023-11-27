"use client";
import Accordion from "@/components/Accordion";
import CheckboxCustom from "@/components/Checkbox";
import CustomRangeSlider from "@/components/RangeSlider";
import { propertyAmenities } from "@/public/data/addpropertyAmenities";
import {
  ChevronDownIcon,
  CloudArrowUpIcon,
  InformationCircleIcon,
  PlusCircleIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSession } from "next-auth/react";
import React, { useState, useRef, useEffect } from "react";
import { UploadButton } from "src/utils/uploadthing";
import "@uploadthing/react/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddTour from "@/components/addTour/AddTour";
import {url} from "@/utils/index";
interface Field {
  value: string;
}

type FormInputs = {
  name: string;
  location: string;
  description: string;
  category: string;
  amount: number;
  guests: number;
  duration: string;
  cancellation: string;
  refund: string;
};

interface UserData {
  id: string;
  FIRSTNAME: string;
  EMAIL: string;
  isVerified: boolean;
  token: string;
  // Add other properties based on your API response
}

interface ApiResponse {
  data: UserData;
}

interface ErrorResponse {
  message: string;
}

interface Itenary {
  name: string;
  location: string;
  title: string;
  description: string;
}

async function fetchUserData(userId: string): Promise<UserData | null> {
  try {
    const response = await fetch(
      `${url}/api/v1/vendors/${userId}`
    );
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.message);
    }

    const data: ApiResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

const page = () => {
  return (
    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
      <AddTour />
    </div>
  );
};

export default page;
