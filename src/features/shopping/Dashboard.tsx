import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { setItems, setItemToEdit } from "../../features/shopping/shoppingSlice";
import { fetchAllItems } from "../../features/shopping/shoppingAPI";
import ShoppingForm from "../../features/shopping/ShoppingForm";
import ShoppingList from "../../features/shopping/ShoppingList";

const Dashboard = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.shopping.items);
  const itemToEdit = useSelector((state: RootState) => state.shopping.itemToEdit);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchAllItems();
        dispatch(setItems(data));
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    };
    loadItems();
  }, [dispatch]);

  return (
    <div>
      <h2>My Shopping List</h2>
      <ShoppingForm itemToEdit={itemToEdit} onFinish={() => dispatch(setItemToEdit(null))} />
      <ShoppingList items={items} onEdit={(item) => dispatch(setItemToEdit(item))} />
    </div>
  );
};

export default Dashboard;
