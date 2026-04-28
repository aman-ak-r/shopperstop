import User from "../models/User.js";

const populateCart = async (userId) =>
  User.findById(userId)
    .populate({
      path: "cartItems.product",
      populate: { path: "category", select: "name slug" },
    })
    .populate({
      path: "savedForLater.product",
      populate: { path: "category", select: "name slug" },
    });

export const getCart = async (req, res) => {
  const user = await populateCart(req.user._id);
  res.json({
    cartItems: user.cartItems,
    savedForLater: user.savedForLater,
  });
};

export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const user = await User.findById(req.user._id);
  const existingItem = user.cartItems.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    user.cartItems.push({ product: productId, quantity });
  }

  user.savedForLater = user.savedForLater.filter(
    (item) => item.product.toString() !== productId
  );

  await user.save();
  const updatedUser = await populateCart(req.user._id);
  res.status(201).json({
    cartItems: updatedUser.cartItems,
    savedForLater: updatedUser.savedForLater,
  });
};

export const updateCartItem = async (req, res) => {
  const user = await User.findById(req.user._id);
  const item = user.cartItems.find(
    (cartItem) => cartItem.product.toString() === req.params.productId
  );

  if (!item) {
    res.status(404);
    throw new Error("Cart item not found.");
  }

  item.quantity = Number(req.body.quantity);
  user.cartItems = user.cartItems.filter((cartItem) => cartItem.quantity > 0);
  await user.save();

  const updatedUser = await populateCart(req.user._id);
  res.json({
    cartItems: updatedUser.cartItems,
    savedForLater: updatedUser.savedForLater,
  });
};

export const removeCartItem = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.cartItems = user.cartItems.filter(
    (item) => item.product.toString() !== req.params.productId
  );
  await user.save();

  const updatedUser = await populateCart(req.user._id);
  res.json({
    cartItems: updatedUser.cartItems,
    savedForLater: updatedUser.savedForLater,
  });
};

export const saveForLater = async (req, res) => {
  const user = await User.findById(req.user._id);
  const existingItem = user.cartItems.find(
    (item) => item.product.toString() === req.params.productId
  );

  if (!existingItem) {
    res.status(404);
    throw new Error("Item not found in cart.");
  }

  user.cartItems = user.cartItems.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  const alreadySaved = user.savedForLater.find(
    (item) => item.product.toString() === req.params.productId
  );

  if (!alreadySaved) {
    user.savedForLater.push(existingItem);
  }

  await user.save();

  const updatedUser = await populateCart(req.user._id);
  res.json({
    cartItems: updatedUser.cartItems,
    savedForLater: updatedUser.savedForLater,
  });
};

export const moveToCart = async (req, res) => {
  const user = await User.findById(req.user._id);
  const savedItem = user.savedForLater.find(
    (item) => item.product.toString() === req.params.productId
  );

  if (!savedItem) {
    res.status(404);
    throw new Error("Saved item not found.");
  }

  user.savedForLater = user.savedForLater.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  const existingCartItem = user.cartItems.find(
    (item) => item.product.toString() === req.params.productId
  );

  if (existingCartItem) {
    existingCartItem.quantity += savedItem.quantity;
  } else {
    user.cartItems.push(savedItem);
  }

  await user.save();

  const updatedUser = await populateCart(req.user._id);
  res.json({
    cartItems: updatedUser.cartItems,
    savedForLater: updatedUser.savedForLater,
  });
};
