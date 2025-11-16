import React, { useState, useId } from "react";

export default function FloatingInput({
  label,
  type = "text",
  name,
  autoComplete,
  className = "",
  onChange,
  value,
  error,
}) {
  const [focused, setFocused] = useState(false);
  const id = useId();
  const isActive = focused || (value ?? "").length > 0;

  return (
    <div className={`group relative ${className}`}>
      <div
        className={`rounded-xl transition-all duration-300 border bg-white/80 backdrop-blur-sm
          ${error ? "border-red-400 shadow-[0_0_0_3px_rgba(248,113,113,0.35)] animate-shake" : "border-neutral-200 shadow-sm hover:shadow-md focus-within:shadow-lg focus-within:border-transparent focus-within:ring-2 focus-within:ring-orange-400/50"}
        `}
      >
        <input
          id={id}
            name={name}
            type={type}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="" /* real placeholder hidden for floating label */
            className="peer w-full bg-transparent px-4 pt-5 pb-2 text-[15px] text-neutral-800 outline-none placeholder-transparent"
        />
        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 transition-all duration-300
            ${isActive ? "top-2 text-[11px] font-medium tracking-wide text-neutral-600" : "text-sm"}
            peer-focus:top-2 peer-focus:text-[11px] peer-focus:font-medium peer-focus:tracking-wide peer-focus:text-neutral-600
          `}
        >
          {label}
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}