import api from "./api";

export const fetchCart = async () => {
  const { data } = await api.get("/cart");
  return data;
};

export const addItemToCart = async (payload) => {
  const { data } = await api.post("/cart", payload);
  return data;
};

export const updateCartItem = async ({ productId, quantity }) => {
  const { data } = await api.patch(`/cart/${productId}`, { quantity });
  return data;
};

export const removeCartItem = async (productId) => {
  const { data } = await api.delete(`/cart/${productId}`);
  return data;
};

export const saveItemForLater = async (productId) => {
  const { data } = await api.post(`/cart/save-later/${productId}`);
  return data;
};

export const moveSavedItemToCart = async (productId) => {
  const { data } = await api.post(`/cart/move-to-cart/${productId}`);
  return data;
};

export const validateCoupon = async (payload) => {
  const { data } = await api.post("/coupons/validate", payload);
  return data;
};
