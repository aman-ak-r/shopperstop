import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { signup } from "../redux/slices/authSlice";
import { getErrorMessage } from "../utils/helpers";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(signup(form)).unwrap();
      toast.success("Account created successfully");
      navigate("/");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-8">
        <h1 className="text-3xl font-bold text-ink">Create Account</h1>
        <p className="mt-2 text-sm text-slate-500">
          Sign up to manage your cart, wishlist, and orders.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input className="input" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
          <input className="input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input className="input" type="password" name="password" placeholder="Password" minLength="6" value={form.password} onChange={handleChange} required />
          <button type="submit" className="button-primary w-full" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-brand-700">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
