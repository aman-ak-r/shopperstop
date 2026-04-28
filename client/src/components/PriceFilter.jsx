const PriceFilter = ({ minPrice, maxPrice, setMinPrice, setMaxPrice }) => (
  <div className="card p-5">
    <h3 className="text-lg font-bold text-ink">Price Range</h3>
    <div className="mt-4 space-y-3">
      <input
        type="number"
        className="input"
        placeholder="Minimum price"
        value={minPrice}
        onChange={(event) => setMinPrice(event.target.value)}
      />
      <input
        type="number"
        className="input"
        placeholder="Maximum price"
        value={maxPrice}
        onChange={(event) => setMaxPrice(event.target.value)}
      />
    </div>
  </div>
);

export default PriceFilter;
