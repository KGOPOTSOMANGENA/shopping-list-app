import { useDispatch } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { User } from "../features/auth/authSlice";
import type { AppDispatch } from "../app/store";
import "../styles/Register.css";

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    cell: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Check if email already exists
      const checkRes = await fetch(
        `http://localhost:5000/users?email=${formData.email}`
      );
      const existing = await checkRes.json();
      if (existing.length > 0) {
        setError("Email already registered");
        return;
      }

      const newUser: User = {
        id: Date.now(), // number ID
        ...formData,
      };

      // Save user to JSON Server
      await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      dispatch(registerUser(newUser));
      navigate("/login"); // go to login after registration
    } catch (err) {
      console.error(err);
      setError("Registration failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input
        name="surname"
        placeholder="Surname"
        onChange={handleChange}
        required
      />
      <input
        name="cell"
        placeholder="Cell Number"
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}



