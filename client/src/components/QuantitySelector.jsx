const QuantitySelector = ({ quantity, onDecrease, onIncrease }) => (
  <div className="inline-flex items-center rounded-2xl border border-slate-200">
    <button onClick={onDecrease} className="px-4 py-2 text-lg text-slate-600">
      -
    </button>
    <span className="px-4 py-2 text-sm font-semibold">{quantity}</span>
    <button onClick={onIncrease} className="px-4 py-2 text-lg text-slate-600">
      +
    </button>
  </div>
);

export default QuantitySelector;
