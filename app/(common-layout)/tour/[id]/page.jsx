//import getTours from "@/public/libs/request";
import getTour from "@/public/data/api/getTour";

import { Suspense } from "react";
//import UserPosts from "@/app/components/UserPosts";
import Page from "@/app/(common-layout)/tour-listing-details/page"

export default async function UserPage({params: {id}}) {

    
    // initiate both request in parallel
    const tourData = await getTour(id)
    //const userPosts = getUserPosts(id)

 
 

    return (
        <div>
    
            <Suspense fallback={<p className="text-center text-5xl">Loading...</p>}>
                 <Page promise={tourData.data} />
            </Suspense>
        </div>
    )
}