import api from "./api";

export const fetchProducts = async (params) => {
  const { data } = await api.get("/products", { params });
  return data;
};

export const fetchFeaturedProducts = async () => {
  const { data } = await api.get("/products/featured/list");
  return data;
};

export const fetchProductById = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};

export const trackRecentlyViewed = async (id) => {
  const { data } = await api.post(`/products/${id}/view`);
  return data;
};

export const fetchRecentlyViewed = async () => {
  const { data } = await api.get("/products/recently-viewed/list");
  return data;
};
