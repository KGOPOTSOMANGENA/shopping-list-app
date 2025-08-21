import { useDispatch } from "react-redux";
import { deleteItem } from "./shoppingSlice";
import { removeItem } from "./shoppingAPI";

interface Props {
  items: any[];
  onEdit: (item: any) => void;
}

const ShoppingList = ({ items, onEdit }: Props) => {
  const dispatch = useDispatch();

  const handleDelete = async (id: number) => {
    await removeItem(id);
    dispatch(deleteItem(id));
  };

  return (
    <div>
      {items.map(item => (
        <div key={item.id} className="border p-2 mb-2">
          <h3>{item.name}</h3>
          <p>Qty: {item.quantity}</p>
          <p>Category: {item.category}</p>
          {item.notes && <p>Notes: {item.notes}</p>}
          {item.image && <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />}
          <button onClick={() => onEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingList;
