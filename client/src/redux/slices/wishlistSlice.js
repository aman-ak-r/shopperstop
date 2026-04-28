import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  addWishlistItem,
  fetchWishlist,
  removeWishlistItem,
} from "../../services/wishlistService";
import { getErrorMessage } from "../../utils/helpers";

export const getWishlist = createAsyncThunk("wishlist/getWishlist", async (_, thunkAPI) => {
  try {
    return await fetchWishlist();
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const addWishlist = createAsyncThunk("wishlist/addWishlist", async (productId, thunkAPI) => {
  try {
    const response = await addWishlistItem(productId);
    toast.success("Added to wishlist");
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const removeWishlist = createAsyncThunk(
  "wishlist/removeWishlist",
  async (productId, thunkAPI) => {
    try {
      const response = await removeWishlistItem(productId);
      toast.success("Removed from wishlist");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getWishlist.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
