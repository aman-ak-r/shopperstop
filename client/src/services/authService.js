import api from "./api";

export const loginUser = async (payload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const signupUser = async (payload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};

export const fetchCurrentUser = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const updateProfile = async (payload) => {
  const { data } = await api.put("/users/profile", payload);
  return data;
};
