import axios from "axios";
export const login = async (data) => {
  try {
    const response = await axios.post("http://localhost:3004/api/login",data);
    return response.data;
  } catch (error) {
    console.log("Error in login", error);
    throw error;
  }
};

export const singUp = async (data) => {
  try {
    const response = await axios.post("http://localhost:3004/api/register",data);
    return response.data;
  } catch (error) {
    console.log("Error in login", error);
    throw error;
  }
};
