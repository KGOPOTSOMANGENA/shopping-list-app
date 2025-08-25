import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  id: number | string;
  email: string;
  password: string;
  name: string;
  surname: string;
  cell: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

// Async thunk to login via JSON Server
export const loginUser = createAsyncThunk<
  User, // Return type
  { email: string; password: string }, // Argument type
  { rejectValue: string } // reject type
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    const res = await fetch(
      `http://localhost:5000/users?email=${credentials.email}`
    );
    const users = await res.json();

    if (users.length === 0) {
      return rejectWithValue("User not found");
    }

    const user = users[0];
    if (user.password !== credentials.password) {
      return rejectWithValue("Invalid password");
    }

    return user;
  } catch (err) {
    return rejectWithValue("Login failed. Try again.");
  }
});

// Async thunk to register via JSON Server
export const registerUser = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>("auth/registerUser", async (newUser, { rejectWithValue }) => {
  try {
    // Check if email already exists
    const checkRes = await fetch(
      `http://localhost:5000/users?email=${newUser.email}`
    );
    const existing = await checkRes.json();
    if (existing.length > 0) {
      return rejectWithValue("Email already registered");
    }

    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const savedUser = await res.json();
    return savedUser;
  } catch (err) {
    return rejectWithValue("Registration failed. Try again.");
  }
});

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isAuthenticated: !!localStorage.getItem("user"),
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload || "Login failed";
    });

    // REGISTER
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(action.payload));
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload || "Registration failed";
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
