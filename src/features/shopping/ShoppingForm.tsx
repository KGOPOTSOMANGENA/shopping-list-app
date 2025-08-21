import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, updateItem } from "./shoppingSlice";
import { createItem, editItem } from "./shoppingAPI";

interface Props {
  itemToEdit?: any;
  onFinish?: () => void;
}

const ShoppingForm = ({ itemToEdit, onFinish }: Props) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: itemToEdit?.name || "",
    quantity: itemToEdit?.quantity || 1,
    notes: itemToEdit?.notes || "",
    category: itemToEdit?.category || "",
    image: itemToEdit?.image || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (itemToEdit) {
      const updated = await editItem({ ...form, id: itemToEdit.id });
      dispatch(updateItem(updated));
    } else {
      const newItem = await createItem(form);
      dispatch(addItem(newItem));
    }
    setForm({ name: "", quantity: 1, notes: "", category: "", image: "" });
    onFinish?.();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input name="quantity" type="number" value={form.quantity} onChange={handleChange} required />
      <input name="notes" placeholder="Notes" value={form.notes} onChange={handleChange} />
      <select name="category" value={form.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Electronics">Electronics</option>
        <option value="Household">Household</option>
      </select>
      <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
      <button type="submit">{itemToEdit ? "Update" : "Add"} Item</button>
    </form>
  );
};

export default ShoppingForm;
