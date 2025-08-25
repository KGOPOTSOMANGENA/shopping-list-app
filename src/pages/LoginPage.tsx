import { useDispatch } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { AppDispatch } from "../app/store"; 
import "../styles/Register.css";

export default function Login() {
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Fetch user by email from JSON Server
      const res = await fetch(
        `http://localhost:5000/users?email=${credentials.email}`
      );
      const users = await res.json();

      if (users.length === 0) {
        setError("User not found");
        return;
      }

      const user = users[0];
      if (user.password !== credentials.password) {
        setError("Invalid password");
        return;
      }

      dispatch(loginUser(user));
      navigate("/shopping"); // go to ShoppingForm after login
    } catch (err) {
      console.error(err);
      setError("Login failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        className="form-input"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        name="password"
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <button type="submit" className="form-button">
        Login
      </button>
    </form>
  );
}



