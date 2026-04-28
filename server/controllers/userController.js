import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  user.name = req.body.name || user.name;
  user.avatar = req.body.avatar ?? user.avatar;
  user.address = {
    fullName: req.body.address?.fullName || user.address?.fullName || "",
    phone: req.body.address?.phone || user.address?.phone || "",
    street: req.body.address?.street || user.address?.street || "",
    city: req.body.address?.city || user.address?.city || "",
    state: req.body.address?.state || user.address?.state || "",
    pincode: req.body.address?.pincode || user.address?.pincode || "",
  };

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    avatar: updatedUser.avatar,
    address: updatedUser.address,
  });
};
