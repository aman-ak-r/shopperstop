import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import PageBanner from "../components/PageBanner";
import CheckoutSummary from "../components/CheckoutSummary";
import { placeOrder } from "../services/orderService";
import { resetCart } from "../redux/slices/cartSlice";
import { formatCurrency } from "../utils/currency";
import { getErrorMessage } from "../utils/helpers";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, coupon } = useSelector((state) => state.cart);
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 49;
  const discount = coupon?.discountAmount || 0;
  const total = subtotal + deliveryFee - discount;
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(null);
  const [form, setForm] = useState({
    fullName: user?.address?.fullName || user?.name || "",
    phone: user?.address?.phone || "",
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    pincode: user?.address?.pincode || "",
  });

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPlacingOrder(true);

    try {
      const response = await placeOrder({
        shippingAddress: form,
        paymentMethod: "Cash on Delivery",
        couponCode: coupon?.code || "",
      });
      dispatch(resetCart());
      setOrderPlaced(response);
      toast.success("Order placed successfully");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageBanner
        title="Checkout"
        description="Fill in your delivery details, review the summary, and place your grocery order."
      />

      {orderPlaced ? (
        <div className="card success-pop mx-auto max-w-2xl p-10 text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100 text-4xl text-emerald-600">
            ✓
          </div>
          <h2 className="mt-6 text-3xl font-bold text-ink">Order Confirmed</h2>
          <p className="mt-3 text-slate-500">
            Your order has been placed successfully. Order total: {formatCurrency(orderPlaced.totalPrice)}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            You can track its status from the My Orders page.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleSubmit} className="card p-6">
            <h2 className="text-2xl font-bold text-ink">Delivery Details</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <input className="input" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Full Name" required />
              <input className="input" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
              <input className="input sm:col-span-2" name="street" value={form.street} onChange={handleChange} placeholder="Street Address" required />
              <input className="input" name="city" value={form.city} onChange={handleChange} placeholder="City" required />
              <input className="input" name="state" value={form.state} onChange={handleChange} placeholder="State" required />
              <input className="input" name="pincode" value={form.pincode} onChange={handleChange} placeholder="Pincode" required />
            </div>

            <div className="mt-6 rounded-3xl bg-slate-50 p-5">
              <h3 className="font-semibold text-ink">Payment Method</h3>
              <p className="mt-1 text-sm text-slate-500">Cash on Delivery for a simple student project flow.</p>
            </div>

            <button type="submit" className="button-primary mt-8 w-full" disabled={placingOrder || !cartItems.length}>
              {placingOrder ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <div className="space-y-5">
            <CheckoutSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              discount={discount}
              total={total}
            />
            <div className="card p-6">
              <h3 className="font-semibold text-ink">Items in this order</h3>
              <div className="mt-4 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-600">
                      {item.product.name} x {item.quantity}
                    </span>
                    <span className="font-semibold text-ink">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
