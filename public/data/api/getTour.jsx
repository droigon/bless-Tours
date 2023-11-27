async function getTour(id) {
  try {
    const response = await fetch(
      `https://blesstours.onrender.com/api/v1/tours/${id}`
    );
    const res = await response.json();
    if (res.statusCode == 200) {
      return res.data;
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    throw new Error(`failed to fetch tour:${error.message}`);
  }
}
