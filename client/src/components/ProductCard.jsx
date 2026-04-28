import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addCartItem } from "../redux/slices/cartSlice";
import { addWishlist, removeWishlist } from "../redux/slices/wishlistSlice";
import { calculateDiscountPercent } from "../utils/helpers";
import { formatCurrency } from "../utils/currency";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const requireLogin = () => {
    toast.error("Please login to continue");
    navigate("/login");
  };

  const handleCart = () => {
    if (!isAuthenticated) return requireLogin();
    dispatch(addCartItem({ productId: product._id, quantity: 1 }));
  };

  const handleWishlist = () => {
    if (!isAuthenticated) return requireLogin();
    if (isWishlisted) {
      dispatch(removeWishlist(product._id));
    } else {
      dispatch(addWishlist(product._id));
    }
  };

  return (
    <div className="card group overflow-hidden">
      <div className="relative overflow-hidden">
        <Link to={`/products/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>
        <button
          onClick={handleWishlist}
          className={`absolute right-4 top-4 rounded-full p-3 ${
            isWishlisted ? "bg-rose-100 text-rose-600" : "bg-white/90 text-slate-600"
          }`}
        >
          <FiHeart />
        </button>
        <div className="absolute left-4 top-4 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          {calculateDiscountPercent(product.price, product.originalPrice)}% off
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
          {product.category?.name}
        </p>
        <Link to={`/products/${product._id}`} className="mt-2 block text-lg font-bold text-ink">
          {product.name}
        </Link>
        <p className="mt-2 text-sm text-slate-500">
          {product.unit} • {product.brand}
        </p>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-xl font-bold text-ink">{formatCurrency(product.price)}</span>
          <span className="text-sm text-slate-400 line-through">
            {formatCurrency(product.originalPrice)}
          </span>
        </div>

        <button onClick={handleCart} className="button-primary mt-5 w-full gap-2">
          <FiShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
