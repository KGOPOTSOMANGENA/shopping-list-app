import type { ShoppingItem } from "./shoppingSlice";

export const createItem = async (item: Omit<ShoppingItem, "id">) => {
  const res = await fetch("http://localhost:5000/shoppingLists", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  const data = await res.json();
  return data;
};

export const editItem = async (item: ShoppingItem) => {
  const res = await fetch(`http://localhost:5000/shoppingLists/${item.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  const data = await res.json();
  return data;
};

export const removeItem = async (id: number) => {
  await fetch(`http://localhost:5000/shoppingLists/${id}`, {
    method: "DELETE",
  });
};

export const fetchAllItems = async () => {
  const res = await fetch("http://localhost:5000/shoppingLists");
  const data: ShoppingItem[] = await res.json();
  return data;
};

