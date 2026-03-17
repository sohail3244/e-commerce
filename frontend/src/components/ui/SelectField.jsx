
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
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Select Field */}
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full appearance-none border border-gray-300 rounded-md px-3 py-2 pr-10 text-sm bg-white outline-none transition
          
          focus:border-[#2BA3FF] focus:ring-2 focus:ring-[#2BA3FF]/20
          
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          
          ${error ? "border-red-500" : ""}
          
          ${className}`}
        >
          <option value="">{placeholder}</option>

          {options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        {/* Dropdown Icon */}
        <ChevronDown
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>

      {/* Error */}
      {error && (
        <p className="text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}