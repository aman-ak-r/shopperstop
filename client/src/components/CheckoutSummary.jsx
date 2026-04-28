import { formatCurrency } from "../utils/currency";

const CheckoutSummary = ({ subtotal, deliveryFee, discount, total }) => (
  <div className="card p-6">
    <h3 className="text-lg font-bold text-ink">Order Summary</h3>
    <div className="mt-5 space-y-4 text-sm text-slate-600">
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>{formatCurrency(subtotal)}</span>
      </div>
      <div className="flex justify-between">
        <span>Delivery</span>
        <span>{deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}</span>
      </div>
      <div className="flex justify-between text-emerald-700">
        <span>Discount</span>
        <span>-{formatCurrency(discount)}</span>
      </div>
      <div className="flex justify-between border-t border-dashed border-slate-200 pt-4 text-base font-bold text-ink">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  </div>
);

export default CheckoutSummary;
