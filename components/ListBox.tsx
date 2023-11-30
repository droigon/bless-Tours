import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {url} from "@/utils/index";

interface HeadlessListProps {
  initialValue: string;
  _id: string;
}

const people = [{ name: "upcoming" }, { name: "completed" }, { name: "cancelled" }];

export default function HeadlessList({ initialValue, _id }: HeadlessListProps) {
  const [selected, setSelected] = useState({ name: initialValue });
  const { data: session } = useSession();
  const Router = useRouter();

  const handleValueChange = async (newValue: { name: string }) => {
    // Your additional logic or processing with the new value
    console.log('Selected value:', newValue, _id);
    let value;

    
    if (newValue.name === "completed"){
      value = "complete"
    }else if (newValue.name === "cancelled"){
      value = "cancel"
    }
    else{
      toast.error("You cant change booking to upcoming");
      //throw new Error("Error occurred");
    }
    


    
    try {
        const response = await fetch(`${url}/api/v1/booking/${value!}/${_id!}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "x-admin-token":  session!.user?.token!, 
          // Add any additional headers if needed
        },
    });
  
    const res = await response.json();
    console.log("eee",res)
    if (res.statusCode == 200) {
        toast.success("Booking updated successfully");
        setSelected(newValue);
       
      } else {
        throw new Error(res.message);
      }
    } catch (error: any) {
      toast.error("Error updating booking:", error.message);
    }
    
  };

  

  return (
    <Listbox value={selected}  onChange={handleValueChange}>
      <div className="relative mt-1">
        <Listbox.Button
          className={`relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left ${
            selected.name == "upcoming" && "bg-[#FFF9ED] text-[#9C742B]"
          } ${
            selected.name == "completed" &&
            "bg-[var(--primary-light)] text-primary"
          } ${selected.name == "cancelled" && "bg-[#EBFBF2] text-[#22804A]"}`}>
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white z-[5] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {people.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-4 `
                }
                value={person}>
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}>
                      {person.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
