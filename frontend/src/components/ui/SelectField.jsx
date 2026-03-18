import React from "react";
import { ChevronDown } from "lucide-react";

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select option",
  error,
  disabled = false,
  required = false,
  className = "",
}) {
  return (
    <div className="w-full flex flex-col gap-1">

      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-slate-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Select Field Wrapper */}
      <div className="relative group">
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full appearance-none border border-slate-300 rounded-md px-3 py-2 pr-10 text-sm bg-white outline-none transition-all
          
          /* Purane blue ko #2A4150 se replace kiya */
          focus:border-[#2A4150] focus:ring-2 focus:ring-[#2A4150]/10
          
          ${disabled ? "bg-slate-100 cursor-not-allowed text-slate-400" : "text-slate-700"}
          
          ${error ? "border-red-500 focus:ring-red-100" : ""}
          
          ${className}`}
        >
          <option value="" disabled className="text-slate-400">
            {placeholder}
          </option>

          {options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        {/* Dropdown Icon - Focus par color change hoga */}
        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-focus-within:text-[#2A4150] transition-colors"
        />
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-xs text-red-500 font-medium mt-0.5">{error}</p>
      )}
    </div>
  );
}