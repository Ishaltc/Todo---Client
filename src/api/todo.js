import axios from "axios";
import { baseUrl } from "../constants/url";
export const addTodo = async (userId, data, token) => {
  try {
    const response = await axios.post(
      `${baseUrl}todos/${userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in adding todo", error);
    throw error;
  }
};

export const myTodos = async (userId, token) => {
  try {
    const response = await axios.get(
      `${baseUrl}todos/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error in fetching my  todo", error);
    throw error;
  }
};

export const updateTodo = async (id, data, token) => {
  try {
    const response = await axios.patch(
      `${baseUrl}todos/${id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in update todo", error);
    throw error;
  }
};

export const deleteTodo = async (id, token) => {
  try {
    const response = await axios.delete(
      `${baseUrl}todos/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Error in delete todo", error);
    throw error;
  }
};
