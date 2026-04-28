import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import CategoryFilter from "../components/CategoryFilter";
import EmptyState from "../components/EmptyState";
import PageBanner from "../components/PageBanner";
import PriceFilter from "../components/PriceFilter";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import { fetchCategories, fetchProducts } from "../services/productService";

const ProductsPage = ({ search }) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [sort, setSort] = useState("latest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "");
  }, [location.search, searchParams]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const response = await fetchProducts({
          category: selectedCategory,
          search: searchParams.get("search") || search,
          minPrice,
          maxPrice,
          sort,
        });
        setProducts(response);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [selectedCategory, sort, minPrice, maxPrice, search, searchParams]);

  return (
    <div className="space-y-8">
      <PageBanner
        title="Explore Grocery Essentials"
        description="Filter by category and price, search products by name, and add your favorites to cart or wishlist."
      />

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <div className="space-y-6">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>

        <div>
          <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-ink">All Products</h2>
              <p className="text-sm text-slate-500">{products.length} items found</p>
            </div>

            <select className="input max-w-xs" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="latest">Newest First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : products.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No products found"
              description="Try changing the filters or search keyword to discover more grocery items."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
