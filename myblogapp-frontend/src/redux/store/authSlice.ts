import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { loginUser, logoutUser, type LoginPayload, type LoginResponse } from "../../api/userApi";


type User = {
  id: number | null;
  username: string | undefined;
};

type AuthState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  user: null,
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

// 🔄 Logout thunk
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try{
      return await logoutUser();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = null;
      state.error = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
  builder
    // LOGIN
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.user = { id: action.payload.id, username: action.payload.username};
      state.isLoggedIn = true;
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.isLoggedIn = false;
      state.user = null;
    })

    // ✅ LOGOUT
    .addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.isLoggedIn = false;        
      state.error = null;
    })
    .addCase(logout.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    
}
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
