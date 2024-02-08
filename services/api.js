import axios from "axios";
import environment from "../environment";

const api = axios.create({
  baseURL: environment.api,
});

// // getItems without pagination
// export const getItems = async () => {
//   try {
//     const response = await api.get("/items");
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching items:", error);
//     throw error;
//   }
// };

export const getItems = async (page) => {
  try {
    const response = await api.get(`/items?page=${page ? page : 1}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const getItem = async (id) => {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const createItem = async (item) => {
  try {
    const response = await api.post("/items", item);
    window.location.reload(); // This is a easy way to fetch & display modified data after api request but if you have time improve that flow this is not best practice.
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

export const updateItem = async (id, item) => {
  try {
    const response = await api.put(`/items/${id}`, item);
    window.location.reload(); // This is a easy way to fetch & display modified data after api request but if you have time improve that flow this is not best practice.
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/items/${id}`);
    window.location.reload(); // This is a easy way to fetch & display modified data after api request but if you have time improve that flow this is not best practice.
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
