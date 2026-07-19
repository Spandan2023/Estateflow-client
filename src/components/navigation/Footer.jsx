function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-5 py-5 lg:ml-72 lg:px-8">
      <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} EstateFlow CRM. Internal use only.</p>

        <p>
          Secure real estate operations platform.
        </p>
      </div>
    </footer>
  );
}

export default Footer;