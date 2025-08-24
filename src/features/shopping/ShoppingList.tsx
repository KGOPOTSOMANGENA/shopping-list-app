import { useDispatch } from "react-redux";
import { deleteItem } from "./shoppingSlice";
import { removeItem } from "./shoppingAPI";
import "../../styles/ShoppingForm.css";

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
    <div className="item-list">
      {items.map(item => (
        <div key={item.id} className="item-card">
          <h4>{item.name}</h4>
          <p>Qty: {item.quantity}</p>
          <p>Category: {item.category}</p>
          {item.notes && <p>Notes: {item.notes}</p>}
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "5px", marginBottom: "8px" }}
            />
          )}
          <div className="card-actions">
            <button className="edit-btn" onClick={() => onEdit(item)}>Edit</button>
            <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShoppingList;

