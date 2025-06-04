import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { loginUser, type LoginPayload, type LoginResponse } from "../../api/userApi";
import { decodeToken } from "../../constants/utils";

type User = {
  id: number | null;
  username: string | undefined;
};

type AuthState = {
  user: User | null;
  token: any | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isLoggedIn: false
};

// ✅ Async thunk for login
export const login = createAsyncThunk<LoginResponse, LoginPayload>(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      return await loginUser(payload);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        const decoded = decodeToken(action.payload.token);
        console.log(decoded);
        
        const userObj = { id: action.payload.userId, username: decoded?.sub}

        state.user = userObj;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isLoggedIn = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
