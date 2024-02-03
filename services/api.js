import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const getItems = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const createItem = async (item) => {
  try {
    const response = await api.post("/products", item);
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

export const updateItem = async (id, item) => {
  try {
    const response = await api.put(`/products/${id}`, item);
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
