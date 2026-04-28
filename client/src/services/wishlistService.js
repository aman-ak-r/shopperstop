import api from "./api";

export const fetchWishlist = async () => {
  const { data } = await api.get("/wishlist");
  return data;
};

export const addWishlistItem = async (productId) => {
  const { data } = await api.post("/wishlist", { productId });
  return data;
};

export const removeWishlistItem = async (productId) => {
  const { data } = await api.delete(`/wishlist/${productId}`);
  return data;
};
