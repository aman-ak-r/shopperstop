const ProductSkeleton = () => (
  <div className="card overflow-hidden">
    <div className="h-48 animate-pulse bg-slate-200" />
    <div className="space-y-3 p-5">
      <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200" />
      <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
      <div className="h-10 animate-pulse rounded-2xl bg-slate-200" />
    </div>
  </div>
);

export default ProductSkeleton;
