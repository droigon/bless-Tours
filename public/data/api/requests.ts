
export default async function getTours() {
    console.log("dddd")
    const response = await fetch('https://blesstours.onrender.com/api/v1/tours/')
 
    if(!response.ok) {
       throw new Error('failed to fetch users')
    }
 
     return await response.json()
 }
 


 