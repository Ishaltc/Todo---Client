import axios from "axios";
import { baseUrl } from "../constants/url";
export const login = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}login`,data);
    return response.data;
  } catch (error) {
    console.log("Error in login", error);
    throw error;
  }
};

export const singUp = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}register`,data);
    return response.data;
  } catch (error) {
    console.log("Error in login", error);
    throw error;
  }
};
