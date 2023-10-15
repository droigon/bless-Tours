import SubHeadingBtn from "../SubHeadingBtn";
import process1 from "@/public/img/work-process-icon-1.png";
import process2 from "@/public/img/work-process-icon-2.png";
import process3 from "@/public/img/work-process-icon-3.png";
import Image from "next/image";

const WorkingProcess = () => {
  return (
    <section className="bg-white py-[60px] lg:py-[120px] px-3 xl:px-0">
      <div className="container">
        <div className="max-w-[630px] mx-auto flex flex-col items-center text-center">
          <SubHeadingBtn text="Working Process" classes="bg-white" />
          <h2 className="h2 mt-3 leading-tight">
            How to Book Your Tour Tickets: A Step-by-Step Guide
          </h2>
          <p className="text-neutral-600 pt-5 pb-8 lg:pb-14">

          Tours can be booked, experienced, guided, or customized, and can present a valuable adventure opportunity. 

          </p>
        </div>
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          <div className="col-span-12 md:col-span-6 lg:col-span-4 border p-6 lg:p-8 rounded-2xl text-center flex flex-col items-center">
            <div className="relative mb-4 lg:mb-6">
              <Image src={process1} alt="work process" />
              <span className="bg-primary text-white w-10 h-10 rounded-full absolute -top-1 -left-1 text-xl font-medium flex items-center justify-center">
                1
              </span>
            </div>
            <h4 className="text-[32px] leading-[38px] font-semibold mb-3">
              Search Choice
            </h4>
            <p>
            Explore and research potential travel destinations based on your interests, budget, and preferred activities.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 border p-6 lg:p-8 rounded-2xl text-center flex flex-col items-center">
            <div className="relative mb-4 lg:mb-6">
              <Image src={process2} alt="work process" />
              <span className="bg-primary text-white w-10 h-10 rounded-full absolute -top-1 -left-1 text-xl font-medium flex items-center justify-center">
                2
              </span>
            </div>
            <h4 className="text-[32px] leading-[38px] font-semibold mb-3">
              Select Destination
            </h4>
            <p>
              Determine the type of tour you want
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 border p-6 lg:p-8 rounded-2xl text-center flex flex-col items-center">
            <div className="relative mb-4 lg:mb-6">
              <Image src={process3} alt="work process" />
              <span className="bg-primary text-white w-10 h-10 rounded-full absolute -top-1 -left-1 text-xl font-medium flex items-center justify-center">
                3
              </span>
            </div>
            <h4 className="text-[32px] leading-[38px] font-semibold mb-3">
            Confirmation and Documentation
            </h4>
            <p>
            Receive the tour confirmation and make sure to keep all relevant documentation in a safe and accessible place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
