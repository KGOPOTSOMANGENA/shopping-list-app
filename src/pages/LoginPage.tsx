import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Register.css"; 

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(credentials));
    navigate("/shopping"); 
  };
  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Login</h2>
      <input
        className="form-input"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit" className="form-button">
        Login
      </button>
    </form>
  );
}


