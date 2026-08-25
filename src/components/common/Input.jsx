function Input({ label, className = "", ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-[#2C2416]">
          {label}
        </label>
      )}

      <input
        {...props}
        className={`w-full rounded-xl border border-[#D8CBB8] bg-[#FFFEFC] px-4 py-3 text-[#1A1A1A] outline-none transition placeholder:text-[#9A9187] focus:border-[#C4943E] focus:ring-2 focus:ring-[#C4943E]/20 ${className}`}
      />
    </div>
  );
}

export default Input;