import Product from "../models/Product.js";
import User from "../models/User.js";

export const getProducts = async (req, res) => {
  const { category, search, minPrice, maxPrice, sort = "latest" } = req.query;
  const query = {};

  if (category) {
    query.category = category;
  }

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  const sortMap = {
    latest: { createdAt: -1 },
    priceLow: { price: 1 },
    priceHigh: { price: -1 },
    rating: { rating: -1 },
  };

  const products = await Product.find(query)
    .populate("category", "name slug")
    .sort(sortMap[sort] || sortMap.latest);

  res.json(products);
};

export const getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ isFeatured: true })
    .populate("category", "name slug")
    .limit(8);

  res.json(products);
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category", "name slug");

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  res.json(product);
};

export const trackRecentlyViewed = async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.id;

  user.recentlyViewed = user.recentlyViewed.filter(
    (item) => item.toString() !== productId
  );
  user.recentlyViewed.unshift(productId);
  user.recentlyViewed = user.recentlyViewed.slice(0, 6);

  await user.save();

  const updatedUser = await User.findById(req.user._id).populate("recentlyViewed");
  res.json(updatedUser.recentlyViewed);
};

export const getRecentlyViewed = async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "recentlyViewed",
    populate: { path: "category", select: "name slug" },
  });

  res.json(user?.recentlyViewed || []);
};
