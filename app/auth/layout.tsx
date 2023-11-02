"use client";
import Footer from "@/components/Footer";
import CommonHeader from "@/components/CommonHeader";
import HeaderTop from "@/components/HeaderTop";
import MobileMenu from "@/components/MobileMenu";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderTop />
      <CommonHeader />
      <MobileMenu />
      {children}
      <ToastContainer />
      <Footer />
    </>
  );
}
