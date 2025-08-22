import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { addItem, updateItem } from "./shoppingSlice";
import type { ShoppingItem } from "./shoppingSlice";
import { createItem, editItem } from "./shoppingAPI";

interface Props {
  itemToEdit?: ShoppingItem;
  onFinish?: () => void;
}

const ShoppingForm = ({ itemToEdit, onFinish }: Props) => {
  const dispatch = useDispatch();
  const authUser = useSelector((state: RootState) => state.auth.user);
  if (!authUser) return null;
  const userId = authUser.id;

  const [form, setForm] = useState({
    name: "",
    quantity: 1,
    notes: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    if (itemToEdit) {
      setForm({
        name: itemToEdit.name,
        quantity: itemToEdit.quantity,
        notes: itemToEdit.notes || "",
        category: itemToEdit.category || "",
        image: itemToEdit.image || "",
      });
    } else {
  
      setForm({ name: "", quantity: 1, notes: "", category: "", image: "" });
    }
  }, [itemToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === "quantity" ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (itemToEdit) {
        const updated: ShoppingItem = {
          ...form,
          id: itemToEdit.id,
          userId: itemToEdit.userId,
          dateAdded: itemToEdit.dateAdded,
        };
        const saved = await editItem(updated);
        dispatch(updateItem(saved));
      } else {
        const newItemData: Omit<ShoppingItem, "id"> = {
          ...form,
          userId,
          dateAdded: new Date().toISOString(),
        };
        const saved = await createItem(newItemData);
        dispatch(addItem(saved));
      }

      setForm({ name: "", quantity: 1, notes: "", category: "", image: "" });
      onFinish?.();
    } catch (err) {
      console.error("Error saving item:", err);
      alert("Failed to save item. Make sure your backend is running.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="quantity"
        type="number"
        value={form.quantity}
        onChange={handleChange}
        min={1}
        required
      />
      <input
        name="notes"
        placeholder="Notes"
        value={form.notes}
        onChange={handleChange}
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Electronics">Electronics</option>
        <option value="Household">Household</option>
      </select>
      <input
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
      />
      <button type="submit">{itemToEdit ? "Update" : "Add"} Item</button>
    </form>
  );
};

export default ShoppingForm;


