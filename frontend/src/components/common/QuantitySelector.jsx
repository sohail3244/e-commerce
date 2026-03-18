"use client";

import { Plus, Minus, Trash2 } from "lucide-react";

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
  showRemove = true,
}) {
  return (
    <div className="flex items-center justify-between mt-6">

      {/* Quantity */}
      <div className="flex items-center bg-slate-50 border border-[#e0e0e0] rounded-lg p-1">
        <button
          onClick={onDecrease}
          className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-600"
        >
          <Minus size={16} />
        </button>

        <span className="px-4 font-semibold text-slate-700 min-w-10 text-center">
          {quantity}
        </span>

        <button
          onClick={onIncrease}
          className="p-1 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-600"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Remove */}
      {showRemove && (
        <button
          onClick={onRemove}
          className="flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors text-sm font-medium"
        >
          <Trash2 size={16} />
          Remove
        </button>
      )}
    </div>
  );
}