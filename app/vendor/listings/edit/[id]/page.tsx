import { getServerSession } from "next-auth";
import UpdateTour from "@/components/updateTour/UpdateTour";
interface Field {
  value: string;
}

interface FormInputs {
  NAME: string;
  LOCATION: string;
  DESCRIPTION: string;
  CATEGORY: string;
  AMOUNT: number;
  GUESTS: number;
  DURATION: string;
  CANCELLATION_POLICY: string;
  REFUND_POLICY: string;
  INCLUSION: string[];
  EXCLUSION: string[];
  IMAGES: string[];
  ITENARY: Itenary[];
  VENDOR_ID: string;
}

interface UserData {
  id: string;
  FIRSTNAME: string;
  EMAIL: string;
  isVerified: boolean;
  token: string;
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

const fetchTourData = async (id: string) => {
  try {
    const response = await fetch(
      `https://blesstours.onrender.com/api/v1/tours/${id}`,
      {
        cache: "no-store",
      }
    );
    const res: ApiResponse = await response.json();
    return res.data;
  } catch (error) {

  }
};

export default async function Page({ params }: { params: { id: string } }) {

  const tourData = await fetchTourData(params.id);

  return (
    <div className="py-[30px] lg:py-[60px] bg-[var(--bg-2)] px-3">
      <UpdateTour data={tourData!} id={params.id} />
    </div>
  );
}
