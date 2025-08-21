import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface User {
  email: string;
  password: string; 
  name: string;
  surname: string;
  cell: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("user"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser: User = JSON.parse(storedUser);
        if (
          parsedUser.email === action.payload.email &&
          parsedUser.password === action.payload.password 
        ) {
          state.user = parsedUser;
          state.isAuthenticated = true;
        } else {
          alert("Invalid credentials");
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;