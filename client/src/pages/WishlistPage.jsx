import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../components/EmptyState";
import PageBanner from "../components/PageBanner";
import { addCartItem } from "../redux/slices/cartSlice";
import { removeWishlist } from "../redux/slices/wishlistSlice";
import { formatCurrency } from "../utils/currency";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.wishlist);

  return (
    <div className="space-y-8">
      <PageBanner
        title="Your Wishlist"
        description="Save favorite items here and move them to the cart whenever you are ready."
      />

      {!items.length ? (
        <EmptyState
          title="Wishlist is empty"
          description="Start exploring products and save the items you want to buy later."
          action={
            <Link to="/products" className="button-primary">
              Browse Products
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6">
          {items.map((product) => (
            <div
              key={product._id}
              className="card grid gap-5 overflow-hidden p-5 sm:grid-cols-[140px_1fr_auto]"
            >
              <img src={product.image} alt={product.name} className="h-32 w-full rounded-3xl object-cover" />
              <div>
                <p className="text-sm font-semibold text-brand-700">{product.category?.name}</p>
                <h2 className="mt-1 text-xl font-bold text-ink">{product.name}</h2>
                <p className="mt-2 text-sm text-slate-500">{product.description}</p>
                <p className="mt-3 text-lg font-bold text-ink">{formatCurrency(product.price)}</p>
              </div>
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => dispatch(addCartItem({ productId: product._id, quantity: 1 }))}
                  className="button-primary"
                >
                  Add to Cart
                </button>
                <button onClick={() => dispatch(removeWishlist(product._id))} className="button-secondary">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
