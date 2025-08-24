import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { User } from "../features/auth/authSlice"; 
import "../styles/Register.css";

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

    const newUser: User = {
      id: Date.now(), 
      ...formData,
    };

    dispatch(register(newUser));
    navigate("/login"); 
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="surname" placeholder="Surname" onChange={handleChange} required />
      <input name="cell" placeholder="Cell Number" onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
}


