import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageBanner from "../components/PageBanner";
import EmptyState from "../components/EmptyState";
import QuantitySelector from "../components/QuantitySelector";
import CheckoutSummary from "../components/CheckoutSummary";
import {
  applyCoupon,
  changeCartQuantity,
  clearCoupon,
  deleteCartItem,
  moveBackToCart,
  moveToSaveForLater,
} from "../redux/slices/cartSlice";
import { formatCurrency } from "../utils/currency";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, savedForLater, coupon } = useSelector((state) => state.cart);
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const discount = coupon?.discountAmount || 0;
  const total = subtotal + deliveryFee - discount;

  const handleCouponSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const code = formData.get("code");
    if (!code) return;
    dispatch(applyCoupon({ code, subtotal }));
  };

  return (
    <div className="space-y-8">
      <PageBanner
        title="Shopping Cart"
        description="Update quantity, remove items, save products for later, and apply your coupon before checkout."
      />

      {!cartItems.length ? (
        <EmptyState
          title="Your cart is empty"
          description="Add a few grocery items to get started. Fresh products are waiting for you."
          action={
            <Link to="/products" className="button-primary">
              Continue Shopping
            </Link>
          }
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.product._id}
                className="card grid gap-5 overflow-hidden p-5 sm:grid-cols-[140px_1fr_auto]"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-32 w-full rounded-3xl object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-brand-700">{item.product.category?.name}</p>
                  <h2 className="mt-1 text-xl font-bold text-ink">{item.product.name}</h2>
                  <p className="mt-2 text-sm text-slate-500">{item.product.unit}</p>
                  <p className="mt-3 text-lg font-bold text-ink">{formatCurrency(item.product.price)}</p>
                </div>
                <div className="flex flex-col items-start gap-3">
                  <QuantitySelector
                    quantity={item.quantity}
                    onDecrease={() =>
                      item.quantity === 1
                        ? dispatch(deleteCartItem(item.product._id))
                        : dispatch(
                            changeCartQuantity({
                              productId: item.product._id,
                              quantity: item.quantity - 1,
                            })
                          )
                    }
                    onIncrease={() =>
                      dispatch(
                        changeCartQuantity({
                          productId: item.product._id,
                          quantity: item.quantity + 1,
                        })
                      )
                    }
                  />
                  <button onClick={() => dispatch(moveToSaveForLater(item.product._id))} className="text-sm font-semibold text-brand-700">
                    Save for later
                  </button>
                  <button onClick={() => dispatch(deleteCartItem(item.product._id))} className="text-sm font-semibold text-rose-600">
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {savedForLater.length ? (
              <div className="card p-6">
                <h2 className="text-xl font-bold text-ink">Saved for Later</h2>
                <div className="mt-5 space-y-4">
                  {savedForLater.map((item) => (
                    <div key={item.product._id} className="flex flex-col gap-4 rounded-3xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <img src={item.product.image} alt={item.product.name} className="h-16 w-16 rounded-2xl object-cover" />
                        <div>
                          <h3 className="font-semibold text-ink">{item.product.name}</h3>
                          <p className="text-sm text-slate-500">{formatCurrency(item.product.price)}</p>
                        </div>
                      </div>
                      <button onClick={() => dispatch(moveBackToCart(item.product._id))} className="button-secondary">
                        Move to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-5">
            <form onSubmit={handleCouponSubmit} className="card p-6">
              <div className="flex gap-3">
                <input name="code" className="input" placeholder="Enter coupon code" />
                <button className="button-primary" type="submit">
                  Apply
                </button>
              </div>
              {coupon ? (
                <div className="mt-4 flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  <span>{coupon.code} applied successfully</span>
                  <button type="button" onClick={() => dispatch(clearCoupon())} className="font-semibold">
                    Remove
                  </button>
                </div>
              ) : null}
            </form>

            <CheckoutSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              discount={discount}
              total={total}
            />

            <button onClick={() => navigate("/checkout")} className="button-primary w-full">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
