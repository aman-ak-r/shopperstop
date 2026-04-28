import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="card mx-auto max-w-2xl p-10 text-center">
    <h1 className="text-4xl font-black text-ink">404</h1>
    <p className="mt-3 text-slate-500">The page you are looking for does not exist.</p>
    <Link to="/" className="button-primary mt-6">
      Go Back Home
    </Link>
  </div>
);

export default NotFoundPage;
