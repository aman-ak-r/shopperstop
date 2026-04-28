import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiHeart, FiLogOut, FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { items } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  const navClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      isActive ? "bg-brand-100 text-brand-700" : "text-slate-600 hover:text-brand-700"
    }`;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/90 backdrop-blur">
      <div className="container-app flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-xl font-bold text-white">
              QB
            </div>
            <div>
              <p className="text-xl font-bold text-ink">QuickBasket</p>
              <p className="text-xs text-slate-500">Fresh groceries delivered fast</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            <NavLink className={navClass} to="/">
              Home
            </NavLink>
            <NavLink className={navClass} to="/products">
              Shop
            </NavLink>
            <NavLink className={navClass} to="/orders">
              My Orders
            </NavLink>
          </nav>
        </div>

        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex w-full max-w-xl items-center rounded-2xl border border-slate-200 bg-white px-4 py-3 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100">
            <FiSearch className="mr-3 shrink-0 text-xl text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") navigate(`/products?search=${search}`);
              }}
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              placeholder="Search fruits, milk, bread..."
            />
          </div>

          <div className="flex items-center gap-2">
            <Link to="/wishlist" className="button-secondary relative">
              <FiHeart className="text-lg" />
              <span className="hidden sm:inline">Wishlist</span>
              {items.length > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white">
                  {items.length}
                </span>
              ) : null}
            </Link>

            <Link to="/cart" className="button-secondary relative">
              <FiShoppingCart className="text-lg" />
              <span className="hidden sm:inline">Cart</span>
              {cartItems.length > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-xs text-white">
                  {cartItems.length}
                </span>
              ) : null}
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" className="button-secondary">
                  <FiUser className="text-lg" />
                  <span className="hidden sm:inline">{user.name?.split(" ")[0]}</span>
                </Link>
                <button onClick={handleLogout} className="button-secondary">
                  <FiLogOut className="text-lg" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="button-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
