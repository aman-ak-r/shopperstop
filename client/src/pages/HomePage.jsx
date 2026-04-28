import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import RecentlyViewed from "../components/RecentlyViewed";
import { fetchCategories, fetchFeaturedProducts, fetchRecentlyViewed } from "../services/productService";

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomePage = async () => {
      try {
        const [featuredResponse, categoriesResponse] = await Promise.all([
          fetchFeaturedProducts(),
          fetchCategories(),
        ]);

        setFeaturedProducts(featuredResponse);
        setCategories(categoriesResponse);
      } finally {
        setLoading(false);
      }

      try {
        const recentResponse = await fetchRecentlyViewed();
        setRecentlyViewed(recentResponse);
      } catch (error) {
        setRecentlyViewed([]);
      }
    };

    loadHomePage();
  }, []);

  return (
    <div className="space-y-14">
      <section className="grid gap-8 rounded-[2rem] bg-gradient-to-br from-emerald-900 via-brand-700 to-emerald-500 px-6 py-10 text-white shadow-soft lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-14">
        <div>
          <p className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/90">
            Everyday essentials • Fast delivery • Easy checkout
          </p>
          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl">
            Fresh groceries for your hostel, home, and late-night cravings.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/90">
            QuickBasket helps you browse groceries, save favorites, manage your cart, apply coupons,
            and place orders with a beginner-friendly full stack flow.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/products" className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-brand-700">
              Start Shopping
            </Link>
            <Link to="/signup" className="rounded-2xl border border-white/30 px-5 py-3 text-sm font-semibold text-white">
              Create Account
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.75rem] bg-white/15 p-6 backdrop-blur">
            <p className="text-sm text-white/80">Top categories</p>
            <h3 className="mt-2 text-3xl font-bold">5+</h3>
            <p className="mt-2 text-sm text-white/80">Fruits, vegetables, dairy, bakery, snacks</p>
          </div>
          <div className="rounded-[1.75rem] bg-white/15 p-6 backdrop-blur">
            <p className="text-sm text-white/80">Coupons available</p>
            <h3 className="mt-2 text-3xl font-bold">SAVE10</h3>
            <p className="mt-2 text-sm text-white/80">Apply offers during checkout</p>
          </div>
          <div className="rounded-[1.75rem] bg-white/15 p-6 backdrop-blur sm:col-span-2">
            <p className="text-sm text-white/80">Made for everyday grocery shopping</p>
            <h3 className="mt-2 text-2xl font-bold">
              Track your cart, save favorites, and order essentials in a few quick steps
            </h3>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Popular Picks</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">Featured Groceries</h2>
          </div>
          <Link to="/products" className="text-sm font-semibold text-brand-700">
            View all products
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => <ProductSkeleton key={index} />)
            : featuredProducts.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">Browse Faster</p>
          <h2 className="mt-2 text-2xl font-bold text-ink">Shop by Category</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/products?category=${category._id}`}
              className="card overflow-hidden transition hover:-translate-y-1"
            >
              <img src={category.image} alt={category.name} className="h-40 w-full object-cover" />
              <div className="p-5">
                <h3 className="text-lg font-bold text-ink">{category.name}</h3>
                <p className="mt-1 text-sm text-slate-500">Fresh picks for your daily needs</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <RecentlyViewed products={recentlyViewed} />
    </div>
  );
};

export default HomePage;
