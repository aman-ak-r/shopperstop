import express from "express";
import {
  addToCart,
  getCart,
  moveToCart,
  removeCartItem,
  saveForLater,
  updateCartItem,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getCart);
router.post("/", addToCart);
router.patch("/:productId", updateCartItem);
router.delete("/:productId", removeCartItem);
router.post("/save-later/:productId", saveForLater);
router.post("/move-to-cart/:productId", moveToCart);

export default router;
