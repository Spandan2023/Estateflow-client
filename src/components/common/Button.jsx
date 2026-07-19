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
      className={`w-full rounded-xl bg-[#10B981] py-3.5 font-semibold text-white transition-all duration-200 hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;