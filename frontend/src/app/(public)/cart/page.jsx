"use client";

import React, { useState, useMemo } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  ChevronRight,
  Truck,
  Tag,
} from "lucide-react";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import QuantitySelector from "@/components/common/QuantitySelector";

const INITIAL_ITEMS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    brand: "SonicWave",
    variant: "Midnight Blue",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=300",
    quantity: 1,
    inStock: true,
  },
  {
    id: 2,
    name: "Minimalist Leather Watch",
    brand: "Tempo",
    variant: "Tan / Silver",
    price: 85.0,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=300",
    quantity: 1,
    inStock: true,
  },
];

export default function CartPage() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [coupon, setCoupon] = useState("");

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items],
  );
  const discount = subtotal > 200 ? 25 : 0;
  const shipping = subtotal > 150 || items.length === 0 ? 0 : 15;
  const total = subtotal - discount + shipping;
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100,
  );

  const updateQuantity = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        {/* Border using #e0e0e0 */}
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#e0e0e0] text-center max-w-md w-full">
          <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-slate-500 mb-8">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Button
            className="w-full py-3 gap-2"
            text="Continue Shopping"
            icon={<ArrowLeft size={18} />}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
            <p className="text-slate-500 mt-1">
              {items.length} items in your bag
            </p>
          </div>
          <button className="hidden sm:flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors">
            <ArrowLeft size={18} className="mr-2" /> Continue Shopping
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 space-y-4">
            {/* Free Shipping Tracker */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#e0e0e0]">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Truck size={20} className="text-blue-600" />
                  <span className="text-sm font-medium text-slate-700">
                    {subtotal >= freeShippingThreshold
                      ? "You've unlocked FREE Shipping!"
                      : `Add ₹${(freeShippingThreshold - subtotal).toFixed(2)} more for FREE Shipping`}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {Math.round(progressToFreeShipping)}%
                </span>
              </div>
              <div className="w-full bg-[#e0e0e0] h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-500 ease-out"
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#e0e0e0] divide-y divide-[#e0e0e0]">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 group"
                >
                  <div className="w-full sm:w-32 h-32 bg-[#e0e0e0] rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">
                          {item.brand} • {item.variant}
                        </p>
                        <div className="mt-2 inline-flex items-center px-2 py-1 bg-green-50 rounded text-green-700 text-[10px] font-bold uppercase tracking-wider">
                          {item.inStock ? "In Stock" : "Low Stock"}
                        </div>
                      </div>
                      <p className="text-xl font-bold text-slate-900">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity and Remove Button */}
                    <QuantitySelector
                      quantity={item.quantity}
                      onIncrease={() => updateQuantity(item.id, 1)}
                      onDecrease={() => updateQuantity(item.id, -1)}
                      onRemove={() => removeItem(item.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-sm border border-[#e0e0e0] p-6 sticky top-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-green-600">
                    {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">
                      -₹{discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="pt-4 border-t border-[#e0e0e0]">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-900 font-bold text-lg">
                      Total
                    </span>
                    <div className="text-right">
                      <p className="text-2xl font-black text-blue-600">
                        ₹{total.toFixed(2)}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                        VAT Included
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                  Promo Code
                </label>
                <div className="relative">
                  <InputField
                    type="text"
                    placeholder="Enter code"
                    showButton={true}
                    buttonText="Apply"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    // Note: Ensure your InputField component uses #e0e0e0 for borders too
                  />
                </div>
              </div>

              {discount > 0 && (
                <div className="bg-green-50 border border-green-100 rounded-xl p-3 mb-6 flex items-center gap-3">
                  <div className="bg-green-500 text-white p-1 rounded-full">
                    <Tag size={12} />
                  </div>
                  <p className="text-green-700 text-xs font-medium">
                    You are saving <b>₹{discount.toFixed(2)}</b> on this order!
                  </p>
                </div>
              )}

              <Button
                className="w-full py-4 gap-2 group"
                text="Proceed to Checkout"
                icon={
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                }
              />

              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 grayscale opacity-40">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                  alt="Visa"
                  className="h-4"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="Mastercard"
                  className="h-6"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                  alt="Paypal"
                  className="h-4"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Recommended for you
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-2xl border border-[#e0e0e0] shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-slate-50 rounded-xl mb-4 border border-[#e0e0e0]" />
                <div className="h-4 bg-slate-100 rounded w-3/4 mb-2" />
                <div className="h-4 bg-slate-50 rounded w-1/2" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
