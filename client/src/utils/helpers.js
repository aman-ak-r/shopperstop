export const calculateDiscountPercent = (price, originalPrice) => {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
};

export const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";
