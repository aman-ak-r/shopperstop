import Coupon from "../models/Coupon.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

export const createOrder = async (req, res) => {
  const { shippingAddress, paymentMethod, couponCode } = req.body;
  const user = await User.findById(req.user._id).populate("cartItems.product");

  if (!user.cartItems.length) {
    res.status(400);
    throw new Error("Your cart is empty.");
  }

  const itemsPrice = user.cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const deliveryFee = itemsPrice > 499 ? 0 : 49;
  let discount = 0;

  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
    if (coupon && new Date(coupon.expiresAt) > new Date() && itemsPrice >= coupon.minOrderAmount) {
      discount = Math.round((itemsPrice * coupon.discountPercent) / 100);
    }
  }

  const order = await Order.create({
    user: req.user._id,
    orderItems: user.cartItems.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
      quantity: item.quantity,
    })),
    shippingAddress,
    paymentMethod: paymentMethod || "Cash on Delivery",
    itemsPrice,
    deliveryFee,
    discount,
    totalPrice: itemsPrice + deliveryFee - discount,
    couponCode: couponCode || "",
  });

  user.cartItems = [];
  if (shippingAddress) {
    user.address = shippingAddress;
  }
  await user.save();

  res.status(201).json(order);
};

export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
};
