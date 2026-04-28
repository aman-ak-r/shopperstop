import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../redux/slices/authSlice";
import { getErrorMessage } from "../utils/helpers";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(login(form)).unwrap();
      toast.success("Welcome back");
      navigate(location.state?.from?.pathname || "/");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-8">
        <h1 className="text-3xl font-bold text-ink">Login</h1>
        <p className="mt-2 text-sm text-slate-500">
          Use the demo account after seeding: demo@quickbasket.com / student123
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input className="input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input className="input" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit" className="button-primary w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          New here?{" "}
          <Link to="/signup" className="font-semibold text-brand-700">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
