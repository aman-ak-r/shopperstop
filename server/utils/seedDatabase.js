import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";
import User from "../models/User.js";
import Wishlist from "../models/Wishlist.js";
import { categories, products, coupons } from "../data/seedData.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    await Promise.all([
      Category.deleteMany(),
      Product.deleteMany(),
      Coupon.deleteMany(),
      User.deleteMany(),
      Wishlist.deleteMany(),
    ]);

    const createdCategories = await Category.insertMany(categories);
    const categoryMap = createdCategories.reduce((map, category) => {
      map[category.slug] = category._id;
      return map;
    }, {});

    await Product.insertMany(
      products.map((product) => ({
        ...product,
        category: categoryMap[product.categorySlug],
      }))
    );

    await Coupon.insertMany(coupons);

    const password = await bcrypt.hash("student123", 10);

    await User.create({
      name: "Demo User",
      email: "demo@quickbasket.com",
      password,
      address: {
        fullName: "Demo User",
        phone: "9876543210",
        street: "221B College Road",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560001",
      },
    });

    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
