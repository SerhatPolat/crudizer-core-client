import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const getItems = async () => {
  try {
    const response = await api.get("/items");
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const createItem = async (item) => {
  try {
    const response = await api.post("/items", item);
    window.location.reload(); // This is a easy way to fetch modified data after api request but if you have time improve that flow this is not best practice
    return response.data;
  } catch (error) {
    console.error("Error creating item:", error);
    throw error;
  }
};

export const updateItem = async (id, item) => {
  try {
    const response = await api.put(`/items/${id}`, item);
    window.location.reload(); // This is a easy way to fetch modified data after api request but if you have time improve that flow this is not best practice
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/items/${id}`);
    window.location.reload(); // This is a easy way to fetch modified data after api request but if you have time improve that flow this is not best practice
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};
