
export default async function getUser(id) {
    const response = await fetch(`https://blesstours.onrender.com/api/v1/tours/${id}`)

    if(!response.ok) {
        throw new Error('failed to fetch tour')
    }

    return response.json()
}