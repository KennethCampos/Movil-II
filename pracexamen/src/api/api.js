import axios from "axios";

const BASE_URL = "http://wafi.iit.cnr.it/openervm/api";

export const getPlaces = async (location, category, keyword = "") => {
  try {
    const response = await axios.get(
      `${BASE_URL}/getPlaces`,
      {
        params: {
          location,
          category,
          keyword
        }
      }
    );
    console.log("Respuesta API:", response.data); // 👈 AGREGÁ ESTO
    return response.data;
  } catch (error) {
    console.log("Error API:", error);
    throw error;
  }
};