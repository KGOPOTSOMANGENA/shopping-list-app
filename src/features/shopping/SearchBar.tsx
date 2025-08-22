import { useDispatch } from "react-redux";
import { setSearchKeyword } from "./shoppingSlice";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value;
    dispatch(setSearchKeyword(keyword));
    navigate(`?search=${keyword}`);
  };

  return <input type="text" placeholder="Search items..." onChange={handleSearch} />;
}
