import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import PageBanner from "../components/PageBanner";
import { fetchMyOrders } from "../services/orderService";
import { formatCurrency } from "../utils/currency";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetchMyOrders();
        setOrders(response);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="space-y-8">
      <PageBanner
        title="My Orders"
        description="Review your previous orders, delivery details, and current order status."
      />

      {loading ? (
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card h-48 animate-pulse bg-slate-100" />
          ))}
        </div>
      ) : !orders.length ? (
        <EmptyState
          title="No orders yet"
          description="Place your first grocery order and it will appear here."
        />
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order._id} className="card p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-500">Order ID</p>
                  <h2 className="text-lg font-bold text-ink">{order._id}</h2>
                </div>
                <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
                  {order.status}
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div>
                  <p className="text-sm text-slate-500">Order Date</p>
                  <p className="mt-1 font-semibold text-ink">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Items</p>
                  <p className="mt-1 font-semibold text-ink">{order.orderItems.length} products</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="mt-1 font-semibold text-ink">{formatCurrency(order.totalPrice)}</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {order.orderItems.map((item) => (
                  <div key={item.product} className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-sm text-slate-600">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="text-sm font-semibold text-ink">
                      {formatCurrency(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
