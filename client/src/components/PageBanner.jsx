const PageBanner = ({ title, description }) => (
  <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-brand-600 via-brand-500 to-emerald-400 px-6 py-10 text-white shadow-soft">
    <h1 className="page-heading text-white">{title}</h1>
    <p className="mt-3 max-w-2xl text-sm text-white/90 sm:text-base">{description}</p>
  </section>
);

export default PageBanner;
