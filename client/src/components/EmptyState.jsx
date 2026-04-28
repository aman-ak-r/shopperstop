const EmptyState = ({ title, description, action }) => (
  <div className="card flex flex-col items-center justify-center px-6 py-14 text-center">
    <h3 className="text-xl font-bold text-ink">{title}</h3>
    <p className="mt-3 max-w-md text-sm text-slate-500">{description}</p>
    {action ? <div className="mt-5">{action}</div> : null}
  </div>
);

export default EmptyState;
