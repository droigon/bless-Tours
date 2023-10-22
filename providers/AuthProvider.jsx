"use client"

import { SessionProvider } from "next-auth/react";
import { BookProvider } from "@/providers/BookProvider";

const AuthProvider = ({children}) => {
  return (
    <BookProvider>
    <SessionProvider>{children}</SessionProvider>
    </BookProvider>
  )
}

export default AuthProvider