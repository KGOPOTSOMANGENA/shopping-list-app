import axios from "axios";
import type { ShoppingItem } from "./shoppingSlice";

const API_URL = "http://localhost:5000/shoppingLists";

export const fetchItems = async () => {
  const res = await axios.get<ShoppingItem[]>(API_URL);
  return res.data;
};

export const createItem = async (item: Omit<ShoppingItem, "id">) => {
  const res = await axios.post<ShoppingItem>(API_URL, item);
  return res.data;
};

export const editItem = async (item: ShoppingItem) => {
  const res = await axios.put<ShoppingItem>(`${API_URL}/${item.id}`, item);
  return res.data;
};

export const removeItem = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
