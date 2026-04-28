import Wishlist from "../models/Wishlist.js";

const getOrCreateWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId }).populate({
    path: "products",
    populate: { path: "category", select: "name slug" },
  });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [] });
    wishlist = await wishlist.populate({
      path: "products",
      populate: { path: "category", select: "name slug" },
    });
  }

  return wishlist;
};

export const getWishlist = async (req, res) => {
  const wishlist = await getOrCreateWishlist(req.user._id);
  res.json(wishlist.products);
};

export const addToWishlist = async (req, res) => {
  const wishlist = await getOrCreateWishlist(req.user._id);
  const productId = req.body.productId;

  if (!wishlist.products.some((item) => item._id.toString() === productId)) {
    wishlist.products.push(productId);
    await wishlist.save();
  }

  const updatedWishlist = await getOrCreateWishlist(req.user._id);
  res.status(201).json(updatedWishlist.products);
};

export const removeFromWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id });

  if (!wishlist) {
    return res.json([]);
  }

  wishlist.products = wishlist.products.filter(
    (product) => product.toString() !== req.params.productId
  );
  await wishlist.save();

  const updatedWishlist = await getOrCreateWishlist(req.user._id);
  res.json(updatedWishlist.products);
};
