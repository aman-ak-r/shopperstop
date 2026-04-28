import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FiHeart, FiShoppingCart, FiTruck } from "react-icons/fi";
import QuantitySelector from "../components/QuantitySelector";
import ProductSkeleton from "../components/ProductSkeleton";
import { fetchProductById, trackRecentlyViewed } from "../services/productService";
import { formatCurrency } from "../utils/currency";
import { addCartItem } from "../redux/slices/cartSlice";
import { addWishlist, removeWishlist } from "../redux/slices/wishlistSlice";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetchProductById(id);
        setProduct(response);
      } finally {
        setLoading(false);
      }

      if (isAuthenticated) {
        try {
          await trackRecentlyViewed(id);
        } catch (error) {
          console.log("Recently viewed tracking skipped");
        }
      }
    };

    loadProduct();
  }, [id, isAuthenticated]);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        <ProductSkeleton />
        <ProductSkeleton />
      </div>
    );
  }

  if (!product) return null;

  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const requireLogin = () => {
    toast.error("Please login to continue");
    navigate("/login");
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) return requireLogin();
    dispatch(addCartItem({ productId: product._id, quantity }));
  };

  const handleWishlist = () => {
    if (!isAuthenticated) return requireLogin();
    dispatch(isWishlisted ? removeWishlist(product._id) : addWishlist(product._id));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="card overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full min-h-[420px] w-full object-cover" />
      </div>

      <div className="card p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
          {product.category?.name}
        </p>
        <h1 className="mt-3 text-3xl font-bold text-ink">{product.name}</h1>
        <p className="mt-4 text-slate-600">{product.description}</p>

        <div className="mt-6 flex items-center gap-3">
          <span className="text-3xl font-bold text-ink">{formatCurrency(product.price)}</span>
          <span className="text-lg text-slate-400 line-through">
            {formatCurrency(product.originalPrice)}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
            {product.unit}
          </span>
          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
            {product.rating} ★ rated
          </span>
          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            {product.stock} in stock
          </span>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <QuantitySelector
            quantity={quantity}
            onDecrease={() => setQuantity((value) => Math.max(1, value - 1))}
            onIncrease={() => setQuantity((value) => value + 1)}
          />

          <button onClick={handleAddToCart} className="button-primary flex-1 gap-2 sm:flex-none">
            <FiShoppingCart />
            Add to Cart
          </button>

          <button onClick={handleWishlist} className="button-secondary gap-2">
            <FiHeart />
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </button>
        </div>

        <div className="mt-8 rounded-3xl bg-brand-50 p-5">
          <div className="flex items-start gap-3">
            <FiTruck className="mt-1 text-xl text-brand-700" />
            <div>
              <h3 className="font-semibold text-ink">Delivery promise</h3>
              <p className="mt-1 text-sm text-slate-600">
                Free delivery on orders above Rs. 499. Easy checkout and order tracking included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
