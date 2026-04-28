const Footer = () => (
  <footer className="mt-16 border-t border-slate-200 bg-white">
    <div className="container-app grid gap-6 py-10 md:grid-cols-3">
      <div>
        <h3 className="text-lg font-bold text-ink">QuickBasket</h3>
        <p className="mt-2 text-sm text-slate-500">
          A beginner-friendly MERN grocery store project with a clean full stack flow.
        </p>
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">Quick Links</h4>
        <ul className="mt-2 space-y-2 text-sm text-slate-500">
          <li>Home</li>
          <li>Products</li>
          <li>Wishlist</li>
          <li>My Orders</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold text-slate-800">Student Friendly</h4>
        <p className="mt-2 text-sm text-slate-500">
          Built with React, Redux Toolkit, Express, MongoDB, JWT, and Tailwind CSS.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
