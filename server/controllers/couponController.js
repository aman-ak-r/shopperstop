import Coupon from "../models/Coupon.js";

export const validateCoupon = async (req, res) => {
  const { code, subtotal } = req.body;

  if (!code) {
    res.status(400);
    throw new Error("Coupon code is required.");
  }

  const coupon = await Coupon.findOne({ code: code.toUpperCase() });

  if (!coupon || !coupon.isActive) {
    res.status(404);
    throw new Error("Coupon is invalid.");
  }

  if (new Date(coupon.expiresAt) < new Date()) {
    res.status(400);
    throw new Error("Coupon has expired.");
  }

  if (Number(subtotal) < coupon.minOrderAmount) {
    res.status(400);
    throw new Error(
      `Minimum order amount for this coupon is Rs. ${coupon.minOrderAmount}.`
    );
  }

  const discountAmount = Math.round((Number(subtotal) * coupon.discountPercent) / 100);

  res.json({
    code: coupon.code,
    discountPercent: coupon.discountPercent,
    discountAmount,
  });
};
