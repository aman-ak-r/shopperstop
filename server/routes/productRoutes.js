import express from "express";
import {
  getFeaturedProducts,
  getProductById,
  getProducts,
  getRecentlyViewed,
  trackRecentlyViewed,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/featured/list", getFeaturedProducts);
router.get("/recently-viewed/list", protect, getRecentlyViewed);
router.post("/:id/view", protect, trackRecentlyViewed);
router.get("/:id", getProductById);

export default router;
