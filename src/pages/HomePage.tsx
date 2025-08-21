import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../app/store";
import { setItems } from "../features/shopping/shoppingSlice";
import { fetchItems } from "../features/shopping/shoppingAPI";
import ShoppingForm from "../features/shopping/ShoppingForm";
import ShoppingList from "../features/shopping/ShoppingList";

const HomePage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.shopping.items);
  const [editItem, setEditItem] = useState<any>(null);

  useEffect(() => {
    const loadItems = async () => {
      const data = await fetchItems();
      dispatch(setItems(data));
    };
    loadItems();
  }, [dispatch]);

  return (
    <div className="p-4">
      <ShoppingForm itemToEdit={editItem} onFinish={() => setEditItem(null)} />
      <ShoppingList items={items} onEdit={setEditItem} />
    </div>
  );
};

export default HomePage;
