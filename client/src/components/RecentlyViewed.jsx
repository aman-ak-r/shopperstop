import ProductCard from "./ProductCard";

const RecentlyViewed = ({ products }) => {
  if (!products?.length) return null;

  return (
    <section className="mt-14">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
            Continue Shopping
          </p>
          <h2 className="mt-2 text-2xl font-bold text-ink">Recently Viewed</h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
