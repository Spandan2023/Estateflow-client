function Button({
  children,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full rounded-xl bg-[#C4943E] px-5 py-3.5 font-semibold text-[#1A1A1A] transition-all duration-200 hover:bg-[#B7832F] focus:outline-none focus:ring-2 focus:ring-[#C4943E]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;