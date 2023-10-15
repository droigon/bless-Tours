"use client";
import CommonHeader from "@/components/CommonHeader";
import Footer from "@/components/Footer";
import HeaderTop from "@/components/home-1/HeaderTophome1";
import Authors from "@/components/home-1/Authors";
import Benefit from "@/components/home-1/Benefit";
import Calculate from "@/components/home-1/Calculate";
import Category from "@/components/home-1/Category";
import Faq from "@/components/home-1/Faq";
import Hero from "@/components/home-5/Hero";
import NewListing from "@/components/home-1/NewListing";
import Property from "@/components/home-1/Property";
import Services from "@/components/home-1/Services";
import StartListing from "@/components/home-1/StartListing";
import Testimonial from "@/components/home-2/Testimonial";
import MobileMenu from "@/components/MobileMenu";
import Counter from "@/components/home-4/Counter";

import WhyChoose from "@/components/home-5/WhyChoose";
import Featured from "@/components/home-5/Featured";
import DiscountCard from "@/components/home-5/DiscountCard";
import TravelMemory from "@/components/home-5/TravelMemory";
import TopCategory from "@/components/home-5/TopCategory";
import GuestDropdown from "@/components/home-5/GuestDropdown";
import CardList from "@/components/cardList/CardList"


export default function Home({}) {

  const page = 1;
  return (
    <main>
      <HeaderTop />
      <CommonHeader />
      <MobileMenu />
      <Hero />

      <WhyChoose />
      <Featured />
    
      <TravelMemory />
     
     
      <Testimonial />

      <Footer />
    </main>
  );
}
