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
import AddVendor from "@/components/addVendor/AddVendor";

const page = () => {
  return (
    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
      <AddVendor />
    </div>
  );
};

export default page;
