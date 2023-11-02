"use client"; 
//import { Button } from "@/components/Button";
import InputBox from "@/components/InputBox";
//import { Backend_URL } from "@/lib/Constants";
import React, { useRef } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";
import CheckboxCustom from "@/components/Checkbox";
import LoginImg from "@/public/img/login-img.png";
import toast from "react-hot-toast";

type FormInputs = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

const SignupPage = () => {

  const router = useRouter();

  const register = async (event:any) => {
    
    event.preventDefault();
    const res = await fetch("https://blesstours.onrender.com/api/v1/users/signup", {
      method: "POST",
      body: JSON.stringify({
        lastname: data.current.lastname,
        firstname: data.current.firstname,
        email: data.current.email,
        password: data.current.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const response = await res.json();
    
    
    console.log(response);
    if (response.status === "OK"){
      toast.success("Registration Successful")
      alert("Registration Successful");
    }
    else{
      alert(response.message);
      router.push('/signup');
    }
    router.push('/auth/login');
  };
  const data = useRef<FormInputs>({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
  });

  
  return (


    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-1)] signup-section">
    <div className="container">
      <div className="flex flex-wrap items-center gap-4 md:gap-0 mx-3">
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-2xl p-4 md:p-6 lg:p-8">
            <form onSubmit={register}>
              <h3 className="mb-4 h3"> Let’s Get Started! </h3>
              <p className="mb-10">
                Please enter your email address to join us
              </p>

              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-6">
                  <label
                    htmlFor="first-name"
                    className="text-base sm:text-lg md:text-xl font-normal sm:font-medium block mb-3">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-[var(--bg-1)] border focus:outline-none rounded-full py-3 px-5"
                    placeholder="Enter First Name"
                    id="first-name"
                    onChange={(e) => (data.current.firstname = e.target.value)}
                    
                  />
                </div>
                <div className="col-span-12 md:col-span-6">
                  <label
                    htmlFor="last-name"
                    className="text-base sm:text-lg md:text-xl font-normal sm:font-medium block mb-3">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-[var(--bg-1)] border focus:outline-none rounded-full py-3 px-5"
                    placeholder="Enter Last Name"
                    id="last-name"
                    onChange={(e) => (data.current.lastname = e.target.value)}
                  />
                </div>
                <div className="col-span-12">
                  <label
                    htmlFor="enter-email"
                    className="text-base sm:text-lg md:text-xl font-normal sm:font-medium block mb-3">
                    Enter Your Email ID
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-[var(--bg-1)] border focus:outline-none rounded-full py-3 px-5"
                    placeholder="Enter Your Email"
                    id="enter-email"
                    onChange={(e) => (data.current.email = e.target.value)}
                  />
                </div>
                <div className="col-span-12">
                  <label
                    htmlFor="enter-password"
                    className="text-base sm:text-lg md:text-xl font-normal sm:font-medium block mb-3">
                    Enter Your Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full bg-[var(--bg-1)] border focus:outline-none rounded-full py-3 px-5"
                    placeholder="Enter Your Password"
                    id="enter-password"
                    onChange={(e) => (data.current.password = e.target.value)}
                  />
                </div>
                <div className="col-span-12">
                  <ul className="flex flex-col gap-4">
                    <li>
                      <CheckboxCustom label=" I agree to the privacy & policy" />
                    </li>
                    <li>
                      <CheckboxCustom label="I agree with all terms & conditions" />
                    </li>
                  </ul>
                </div>
                <div className="col-span-12">
                  <p className="mb-0">
                    Do you have an account?
                    <Link
                      href="auth/login"
                      className="link font-semibold text-primary">
                      Signin
                    </Link>
                  </p>
                </div>
                
                <div className="col-span-12">
                  <button
                   type="submit"
                    
                    className="link inline-flex items-center gap-2 py-3 px-6 rounded-full bg-primary text-white :bg-primary-400 hover:text-white font-semibold">
                    <span className="inline-block"> Signup </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <Image src={LoginImg} className="w-full xxl:mr-[-200px]" alt="" />
        </div>
      </div>
    </div>
  </div>


  );
};

export default SignupPage;







