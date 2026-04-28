import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  fetchCurrentUser,
  loginUser,
  signupUser,
  updateProfile,
} from "../../services/authService";
import { getErrorMessage } from "../../utils/helpers";

const storedUser = localStorage.getItem("quickbasketUser");

export const login = createAsyncThunk("auth/login", async (payload, thunkAPI) => {
  try {
    return await loginUser(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const signup = createAsyncThunk("auth/signup", async (payload, thunkAPI) => {
  try {
    return await signupUser(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const loadUser = createAsyncThunk("auth/loadUser", async (_, thunkAPI) => {
  try {
    return await fetchCurrentUser();
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const saveProfile = createAsyncThunk(
  "auth/saveProfile",
  async (payload, thunkAPI) => {
    try {
      return await updateProfile(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    loading: false,
    profileLoading: false,
    isAuthenticated: Boolean(storedUser),
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("quickbasketUser");
      toast.success("Logged out successfully");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("quickbasketUser", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem("quickbasketUser", JSON.stringify(action.payload));
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload, token: state.user?.token };
        state.isAuthenticated = true;
        localStorage.setItem("quickbasketUser", JSON.stringify(state.user));
      })
      .addCase(loadUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("quickbasketUser");
      })
      .addCase(saveProfile.pending, (state) => {
        state.profileLoading = true;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.user = { ...state.user, ...action.payload, token: state.user?.token };
        localStorage.setItem("quickbasketUser", JSON.stringify(state.user));
      })
      .addCase(saveProfile.rejected, (state) => {
        state.profileLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
