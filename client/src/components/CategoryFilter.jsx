const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => (
  <div className="card p-5">
    <h3 className="text-lg font-bold text-ink">Categories</h3>
    <div className="mt-4 flex flex-wrap gap-2 lg:flex-col">
      <button
        onClick={() => onSelectCategory("")}
        className={`rounded-2xl px-4 py-2 text-sm font-medium ${
          !selectedCategory ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700"
        }`}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category._id}
          onClick={() => onSelectCategory(category._id)}
          className={`rounded-2xl px-4 py-2 text-sm font-medium ${
            selectedCategory === category._id
              ? "bg-brand-600 text-white"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  </div>
);

export default CategoryFilter;
