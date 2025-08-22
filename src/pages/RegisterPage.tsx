import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type  { User } from "../features/auth/authSlice"; 

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    cell: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add a unique id to satisfy User type
    const newUser: User = {
      id: Date.now(), // unique number
      ...formData,
    };

    dispatch(register(newUser));
    navigate("/home");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="surname" placeholder="Surname" onChange={handleChange} required />
      <input name="cell" placeholder="Cell Number" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}

