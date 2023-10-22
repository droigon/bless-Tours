import "./globals.css";
import { Inter } from "next/font/google";
import "@/public/styles/styles.scss";
import "@/public/styles/line-awesome.min.css";
//import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import AuthProvider from '../providers/AuthProvider'
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bless Tours - Online Tour Booking Platform ",
  description: "Welcome to our online tour platform, where we've crafted a remarkable way to explore the world without leaving your home. Whether you're an avid traveler, a student on a quest for knowledge, or simply planning your next adventure, we've got something extraordinary waiting for you.",
};


interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      
      <body
        className={`${inter.className} bg-[var(--bg-1)] text-[var(--neutral-700)]`}>
        
          <AuthProvider>
            {children}
          </AuthProvider>
       
      </body>
    </html>
  );
}
