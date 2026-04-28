import api from "./api";

export const placeOrder = async (payload) => {
  const { data } = await api.post("/orders", payload);
  return data;
};

export const fetchMyOrders = async () => {
  const { data } = await api.get("/orders/mine");
  return data;
};
