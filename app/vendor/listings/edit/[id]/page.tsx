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
import { useSession } from "next-auth/react"
import React, { useState, useRef, useEffect } from 'react';
import { UploadButton } from "src/utils/uploadthing";
import "@uploadthing/react/styles.css";
import { useRouter } from 'next/navigation';


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
  inclusion: string[];
  exclusion: string[];
  itinerary: Itenary[];
}; 


interface UserData {
  id: string;
  FIRSTNAME:string;
  EMAIL:string;
  isVerified:boolean;
  token:string;
  // Add other properties based on your API response
}

interface ApiResponse {
  data: FormInputs;
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
    const response = await fetch(`https://blesstours.onrender.com/api/v1/vendors/${userId}`);
    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}


export default function Page({ params }: { params: { id: string } }) {
  
  

  
  const [images, setImages] = useState<string[]>([]);


  
  //const [itenary, setItenary] = useState([{ name: '', location: '', title: '', description: '' }]);
  const [itenary, setItenary] = useState<Itenary[]>([
    { name: '', location: '', title: '', description: '' }
  ]);
  

  const { data: session } = useSession();
  const [token, setToken] = useState("");


  
  const [inclusionArray, setInclusionArray] = useState<string[]>(['']);
  const [exclusionArray, setExclusionArray] = useState<string[]>(['']);
//  const [itinerary, setItinerary] = useState<Itenary[]>([{ name: '', location: '', title: '', description: '' }]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tourDatas, setTourData] = useState<FormInputs>({
    name: '',
    location: '',
    description: '',
    category: '',
    amount: 0,
    guests: 0,
    duration: '',
    cancellation: '',
    refund: '',
    inclusion: [],
    exclusion: [],
    itinerary: [],
  });


  

  
  



  const handleAddItenary = () => {
    setItenary([...itenary, { name: '', location: '', title: '', description: '' }]);
  }

  const handleRemoveItenary = (index: number) => {
    const updatedItenary = [...itenary];
    updatedItenary.splice(index, 1);
    setItenary(updatedItenary);
  };

  const handleItenaryChange = (index: number, field: keyof Itenary, value:string) => {
    const updatedItenary = [...itenary];
    updatedItenary[index][field] = value;
    setItenary(updatedItenary);
  };

  //inclusions

  const handleInclusionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedInclusionArray = [...inclusionArray];
    updatedInclusionArray[index] = event.target.value;
    setInclusionArray(updatedInclusionArray);
  };

  const addInclusion = () => {
    setInclusionArray([...inclusionArray, '']);
  };

  const removeInclusion = (index: number) => {
    const updatedInclusionArray = [...inclusionArray];
    updatedInclusionArray.splice(index, 1);
    setInclusionArray(updatedInclusionArray);
  };
  

  //exclusions


  const handleExclusionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedExclusionArray = [...exclusionArray];
    updatedExclusionArray[index] = event.target.value;
    setExclusionArray(updatedExclusionArray);
  };

  const addExclusion = () => {
    setExclusionArray([...exclusionArray, '']);
  };

  const removeExclusion = (index: number) => {
    const updatedExclusionArray = [...exclusionArray];
    updatedExclusionArray.splice(index, 1);
    setExclusionArray(updatedExclusionArray);
  };


  //console.log('sess',session?.vendor)
  



  const data = useRef<FormInputs>({
    name: "",
    location: "",
    description: "",
    category: "",
    amount: 0,
    guests: 0,
    duration: "",
    refund: "",
    cancellation: "",
    inclusion:[],
    exclusion: [],
    itinerary: [],
  });


  useEffect(() => {

    const fetchTourData = async (tourId: string) => {
      try {
        console.log("parmas",params.id);
        const response = await fetch(`https://blesstours.onrender.com/api/v1/tours/${params.id}`);
        //console.log(response.json())
        //const response = await fetch(`https://blesstours.onrender.com/api/v1/tours/652b81a8ef047a18e6453b5c`);
        console.log("fetching----");
        if (!response.ok) {
          const errorData: ErrorResponse = await response.json();
          throw new Error(errorData.message);
        }

        //const data: ApiResponse = await response.json();

        //const data  = await response.json();
        //console.log("tours:", await response.json())
        // Transform userData to match FormInputs structure
        //console.log("tours:",tourData);
        const data: ApiResponse = await response.json();
        setTourData(data.data); 
        
        
        const DA = data.data
        console.log("tours:",DA);
        //const userData: UserData = await response.json();
        //console.log("tours:", await response.json())
        // Transform userData to match FormInputs structure
        const tourData: FormInputs = {
          name: "data.data.NAME",
          location: "ninin",
          description: data.data.description,
          category: "", // Set appropriate category value based on your logic
          amount: 0,
          guests: 0,
          duration: '',
          cancellation: '',
          refund: '',
          inclusion: [],
          exclusion: [],
          itinerary: [],
        }
        
        

        setTourData(tourData); // Set the fetched tour data
        
      } catch (error) {
        console.error('Error fetching tour data:', error);
      }
    };


    if (session ) {
      const userId = session.user?.id || "";
      const tokenz = session.user?.token || "";

      //console.log('data', userId)

      fetchUserData(userId)
        .then((userData) => {
          if (userData) {
            setUserData(userData);
            setToken(tokenz)
            if (params.id) {
              fetchTourData(params.id);
            }
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
        console.log("aaaa",tourDatas)
    }
  }, [session]);

  const handleAddItinerary = () => {
    setItenary([...itenary, { name: '', location: '', title: '', description: '' }]);
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      // Make the API call to update the tour data
      const response = await fetch(`https://blesstours.onrender.com/api/v1/tours/update/${params.id}`, {
        method: 'PUT',  // Use the appropriate HTTP method for updating data
        headers: {
          'Content-Type': 'application/json',
          "x-vendor-token": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiVkVORE9SIiwibmFtZSI6IkpvbiBkb2UiLCJwYXNzd29yZCI6IiQyYiQxMCRKS0FQb0lKdzdaZVEwTHJPcm1VVG1PUnZmOVdlR2FxamtjcHdaNnY4Si5LcVl1NkVkcU8xRyIsImlhdCI6MTY5NzM4NjUwNiwiZXhwIjoxNjk3MzkwMTA2fQ.RFTvQ3hJQDXTcfm-lPahQUutYC3LE7lK2UiLXkJlaoA`,
        },
        body: JSON.stringify({
          "NAME":data.current.name, 
          "LOCATION": data.current.location,
          "DESCRIPTION":  data.current.location,
          "IMAGE":images,
          "CATEGORY": data.current.category,
          "CANCELLATION_POLICY":data.current.cancellation,
          "REFUND_POLICY":data.current.refund,
          "PRICE":data.current.amount,
          "AMOUNT":data.current.amount,
          "GUESTS":data.current.guests,
          "DURATION": data.current.duration,
          "EXCLUSION": exclusionArray,
          "INCLUSION": inclusionArray,
          "ITENARY": itenary,
      }),  // Send the updated tour data
      });

      if (response.ok) {
        alert("Tour updated successfully!");
        console.log(response.json(),'Tour updated successfully!');
      } else {
        console.error(await response.json(), 'Failed to update tour.');
      }
    } catch (error) {
      console.error('Error updating tour:', error);
    }
  };


  return (
    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
      <div className="container">
        
        <div className="w-full xl:w-[83.33%] xxl:w-[66.66%] mx-auto">
          {/* Item 1 */}
          <form onSubmit={handleUpdate}>
          <div className="bg-white p-4 sm:p-6 md:p-10 mb-5 sm:mb-8 md:mb-12 rounded-2xl">
            <Accordion
              buttonContent={(open) => (
                <div className="rounded-2xl flex justify-between items-center">
                  <h3 className="h3">Update Tour </h3>
                  <ChevronDownIcon
                    className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </div>
              )}
              initialOpen={true}>
              <div className="pt-4">
                <div className="border-t pt-4">

                
                

                <div className="flex flex-wrap items-center flex-grow gap-4 gap-md-10">
                  <div className="flex items-center flex-grow gap-2 gap-md-4">
                    <div className="flex-grow">
                      <p className="mt-6 mb-4 text-xl font-medium"> Name: </p>
                      <input
                        type="text"
                        onChange={(e) => (data.current.name = e.target.value)}
                        className="w-full border p-2 focus:outline-none rounded-md text-base"
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>
                  <div className="flex items-center flex-grow gap-2 gap-md-4">
                    <div className="flex-grow">
                      <p className="mt-6 mb-4 text-xl font-medium"> Location: </p>
                      <input
                        type="text"
                        onChange={(e) => (data.current.location = e.target.value)}
                        className="w-full border p-2 focus:outline-none rounded-md text-base"
                        placeholder="Enter Location"
                      />
                    </div>
                  </div>
                </div>
                  
           

                    <p className="mt-6 mb-4 text-xl font-medium">Description :</p>
                    <textarea
                      rows={5}
                      onChange={(e) => (data.current.description = e.target.value)}
                      className="w-full border p-2 focus:outline-none rounded-md "
                      placeholder="Description.."></textarea>

                    <p className="mt-6 mb-4 text-xl font-medium"> Category </p>
                    <select className="w-full bg-transparent px-5 py-3 focus:outline-none border rounded-md text-base pr-3" onChange={(e) => (data.current.category = e.target.value)}>
                      <option>Choice</option>
                      <option value="vacation">Vacation</option>
                      <option value="tour">Tour</option>
                      
                    </select>

                    <div className="flex flex-wrap items-center flex-grow gap-4 gap-md-10">
                  <div className="flex items-center flex-grow gap-2 gap-md-4">
                    <div className="flex-grow">
                      <p className="mt-6 mb-4 text-xl font-medium"> Amount: </p>
                      <input
                          type="number"
                          onChange={(e) => (data.current.amount = parseInt(e.target.value))}
                          className="w-full border p-2 focus:outline-none rounded-md text-base"
                          placeholder="Enter area"
                        />
                    </div>
                  </div>
                  <div className="flex items-center flex-grow gap-2 gap-md-4">
                    <div className="flex-grow">
                      <p className="mt-6 mb-4 text-xl font-medium"> No Of Guests : </p>
                      <input
                          type="number"
                          onChange={(e) => (data.current.guests = parseInt(e.target.value))}
                          className="w-full border p-2 focus:outline-none rounded-md text-base"
                          placeholder="Enter guests"
                        />
                    </div>
                  </div>
                </div>   
                  <p className="mt-6 mb-4 text-xl font-medium">Duration (Days) :</p>
                  <input
                    type="text"
                    onChange={(e) => (data.current.duration = e.target.value)}
                    className="w-full border p-2 focus:outline-none rounded-md text-base"
                    placeholder="Enter duration"
                  />
                  <div className="rounded-2xl flex justify-between items-center">
                  <p className="mt-6 mb-4 text-xl font-medium"> Inclusions:</p>
                    <PlusCircleIcon
                      onClick={addInclusion}
                      className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 
                      }`}
                    />
                  </div>

                   
                  {inclusionArray.map((inclusion, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder={`Add inclusion `}
                        value={inclusion}
                        className="w-full border p-2 mt-4 focus:outline-none rounded-md text-base"
                        onChange={(event) => handleInclusionChange(index, event)}
                      />
                      {inclusionArray.length > 1 && (
                        <MinusCircleIcon
                          style={{ cursor: 'pointer',color:"red", width:"20px",marginLeft: '10px' }}
                          onClick={() => removeInclusion(index)}
                        />
                      )}
                    </div>
                  ))}

                  <div className="rounded-2xl flex justify-between items-center">
                  <p className="mt-6 mb-4 text-xl font-medium"> Exclusions:</p>
                    <PlusCircleIcon
                      onClick={addExclusion}
                      className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 
                      }`}
                    />
                  </div>
                  

                  {exclusionArray.map((exclusion, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder={`Add exclusion `}
                        value={exclusion}
                        className="w-full border p-2 mt-4 focus:outline-none rounded-md text-base"
                        onChange={(event) => handleExclusionChange(index, event)}
                      />
                      {exclusionArray.length > 1 && (
                        <MinusCircleIcon
                          style={{ cursor: 'pointer',color:"red", width:"20px",marginLeft: '10px' }}
                          onClick={() => removeExclusion(index)}
                        />
                      )}
                    </div>
                  ))}

                  <p className="mt-6 mb-4 text-xl font-medium">Cancellation Policy :</p>
                    <textarea
                      rows={5}
                      onChange={(e) => (data.current.cancellation = e.target.value)}
                      className="w-full border p-2 focus:outline-none rounded-md "
                      placeholder="Description.."></textarea>

                  <p className="mt-6 mb-4 text-xl font-medium">Refund Policy :</p>
                    <textarea
                      rows={5}
                      onChange={(e) => (data.current.refund = e.target.value)}
                      className="w-full border p-2 focus:outline-none rounded-md "
                      placeholder="Description.."></textarea>


                <p className="mt-6 mb-4 text-xl font-medium"> Images:</p>
                  <div className="flex items-center justify-center border-dashed rounded-2xl w-full">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-full cursor-pointer bg-[var(--bg-2)] rounded-2xl border border-dashed">
                          <span className="flex flex-col items-center justify-center py-12">
                            <CloudArrowUpIcon className="w-[60px] h-[60px]" />
                      
                      <span className="h3 clr-neutral-500 text-center mt-4 mb-3">
                        Drag & Drop
                      </span>
                      <span className="block text-center mb-6 clr-neutral-500">
                        OR
                      </span>
                      
                      <UploadButton
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        if (res) {

                          const json = JSON.stringify(res); // Assuming res is an array of objects
                          const parsedArray = JSON.parse(json);

                          // Assuming you want to access the fileUrl of the first object in the array
                          const FileUrl = parsedArray[0].fileUrl;
                          console.log(FileUrl)

                          const updatedImages = [...images];
                          updatedImages.push(FileUrl);
                          // Update state with the updated array
                          setImages(updatedImages);

                      }
                        
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                      <span className="flex items-center justify-center flex-wrap gap-5">
                        <span className="flex items-center gap-2">
                          <InformationCircleIcon className="w-5 h-5" />
                          <span className="block mb-0 clr-neutral-500">
                            Maximum allowed file size is 9.00 MB
                          </span>
                        </span>
                        <span className="flex items-center gap-2">
                          <InformationCircleIcon className="w-5 h-5" />
                          <span className="block mb-0 clr-neutral-500">
                            Maximum 10 files are allowed
                          </span>
                        </span>
                      </span>
                    </span>
                    <input type="file" id="dropzone-file" className="hidden" />
                  </label>
                </div>


          <div className="rounded-2xl flex justify-between items-center">
          <p className="mt-6 mb-4 text-xl font-medium"> Itenary:</p>
            <PlusCircleIcon
              onClick={handleAddItenary}
              className={`w-5 h-5 sm:w-6 sm:h-6 duration-300 
              }`}
            />
          </div>
                {itenary.map((field, index) => (
                  <div key={index}>
                    <div className="flex  mb-4">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-half mr-6 border p-2 focus:outline-none rounded-md text-base"
                      value={field.name}
                      onChange={(e) => handleItenaryChange(index, 'name', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      className="w-half mr-6 border p-2 focus:outline-none rounded-md text-base"
                      value={field.location}
                      onChange={(e) => handleItenaryChange(index, 'location', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      className="w-half mr-6 border p-2 focus:outline-none rounded-md text-base"
                      value={field.title}
                      onChange={(e) => handleItenaryChange(index, 'title', e.target.value)}
                    />
                    </div>
                    <textarea
                      rows={5}
                      onChange={(e) => handleItenaryChange(index, 'description', e.target.value)}
                      value={field.description}
                      className="w-full border p-2 focus:outline-none rounded-md "
                      placeholder="Description.."></textarea>
                    
                    {itenary.length > 0 && (<>
                    </>
                      /*<button onClick={() => handleRemoveItenary(index)}>
                        <MinusCircleIcon style={{ cursor: 'pointer',color:"red", width:"20px",marginLeft: '10px' }} /> Remove Field
                        
                      </button>*/
                    )}
                  </div>
                ))}
                </div>
              </div>
            </Accordion>
          </div>
          <button type="submit" className="mt-6 btn-primary font-semibold">
            <span className="inline-block"> Upload Tour </span>
          </button>
         
          </form>

        </div>
      </div>
    </div>
  );
};

