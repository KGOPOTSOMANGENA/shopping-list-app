import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import type { RootState } from "../../app/store";
import { addItem, updateItem, setSearchKeyword, setSortOption } from "./shoppingSlice";
import type { ShoppingItem } from "./shoppingSlice";
import { createItem, editItem } from "./shoppingAPI";

interface Props {
  itemToEdit?: ShoppingItem;
  onFinish?: () => void;
}

const ShoppingForm = ({ itemToEdit, onFinish }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const authUser = useSelector((state: RootState) => state.auth.user);
  const searchKeyword = useSelector((state: RootState) => state.shopping.searchKeyword);
  const sortOption = useSelector((state: RootState) => state.shopping.sortOption);

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

  // Sync URL params with Redux on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    const sort = params.get("sort") as "name" | "category" | "date" | null;
    if (search) dispatch(setSearchKeyword(search));
    if (sort) dispatch(setSortOption(sort));
  }, [location.search, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === "quantity" ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  // Search input handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    dispatch(setSearchKeyword(keyword));
    navigate(`?search=${keyword}${sortOption ? `&sort=${sortOption}` : ""}`);
  };

  // Sort change handler
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value as "name" | "category" | "date";
    dispatch(setSortOption(sort));
    navigate(`?search=${searchKeyword}&sort=${sort}`);
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
    <div className="mb-4">
      {/* Search input */}
      <input
        type="text"
        placeholder="Search items..."
        value={searchKeyword}
        onChange={handleSearch}
        className="mb-2 p-1 border rounded w-full"
      />

      {/* Sort select */}
      <select
        value={sortOption}
        onChange={handleSortChange}
        className="mb-4 p-1 border rounded"
      >
        <option value="name">Sort by Name</option>
        <option value="category">Sort by Category</option>
        <option value="date">Sort by Date</option>
      </select>

      {/* Form to add/update items */}
      <form onSubmit={handleSubmit} className="p-4 border rounded">
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
    </div>
  );
};

export default ShoppingForm;

