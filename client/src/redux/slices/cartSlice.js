import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import {
  addItemToCart,
  fetchCart,
  moveSavedItemToCart,
  removeCartItem,
  saveItemForLater,
  updateCartItem,
  validateCoupon,
} from "../../services/cartService";
import { getErrorMessage } from "../../utils/helpers";

const initialState = {
  cartItems: [],
  savedForLater: [],
  coupon: null,
  loading: false,
  actionLoading: false,
};

const setCartState = (state, payload) => {
  state.cartItems = payload.cartItems || [];
  state.savedForLater = payload.savedForLater || [];
};

export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    return await fetchCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const addCartItem = createAsyncThunk("cart/addItem", async (payload, thunkAPI) => {
  try {
    const response = await addItemToCart(payload);
    toast.success("Item added to cart");
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

export const changeCartQuantity = createAsyncThunk(
  "cart/changeQuantity",
  async (payload, thunkAPI) => {
    try {
      return await updateCartItem(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteItem",
  async (productId, thunkAPI) => {
    try {
      const response = await removeCartItem(productId);
      toast.success("Item removed from cart");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const moveToSaveForLater = createAsyncThunk(
  "cart/saveForLater",
  async (productId, thunkAPI) => {
    try {
      const response = await saveItemForLater(productId);
      toast.success("Moved to save for later");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const moveBackToCart = createAsyncThunk(
  "cart/moveBackToCart",
  async (productId, thunkAPI) => {
    try {
      const response = await moveSavedItemToCart(productId);
      toast.success("Moved back to cart");
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error));
    }
  }
);

export const applyCoupon = createAsyncThunk("cart/applyCoupon", async (payload, thunkAPI) => {
  try {
    const response = await validateCoupon(payload);
    toast.success("Coupon applied");
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error));
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCoupon(state) {
      state.coupon = null;
    },
    resetCart(state) {
      state.cartItems = [];
      state.savedForLater = [];
      state.coupon = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        setCartState(state, action.payload);
      })
      .addCase(getCart.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCartItem.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.actionLoading = false;
        setCartState(state, action.payload);
      })
      .addCase(addCartItem.rejected, (state) => {
        state.actionLoading = false;
      })
      .addCase(changeCartQuantity.fulfilled, (state, action) => {
        setCartState(state, action.payload);
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        setCartState(state, action.payload);
      })
      .addCase(moveToSaveForLater.fulfilled, (state, action) => {
        setCartState(state, action.payload);
      })
      .addCase(moveBackToCart.fulfilled, (state, action) => {
        setCartState(state, action.payload);
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.coupon = action.payload;
      });
  },
});

export const { clearCoupon, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
