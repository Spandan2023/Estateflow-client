function Input({
  label,
  ...props
}) {
  return (
    <div className="space-y-2">

      <label className="block text-sm font-medium text-[#1E293B]">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-200"
      />

    </div>
  );
}

export default Input;