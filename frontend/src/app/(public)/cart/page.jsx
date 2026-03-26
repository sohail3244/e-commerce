"use client";

import React, { useState, useMemo } from "react";
import {
  ShoppingBag,
  ArrowLeft,
  ChevronRight,
  Truck,
  ShieldCheck,
  RotateCcw,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import QuantitySelector from "@/components/common/QuantitySelector";

// ✅ Redux
import { useSelector, useDispatch } from "react-redux";
import { updateQty, removeFromCart } from "@/store/cartSlice";

export default function CartPage() {
  const reduxItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");

  // ✅ calculations
  const subtotal = useMemo(
    () => reduxItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [reduxItems],
  );

  const freeShippingThreshold = 500; // Updated for realistic INR context
  const discount = subtotal > 1000 ? 100 : 0;
  const shipping =
    subtotal >= freeShippingThreshold || reduxItems.length === 0 ? 0 : 40;
  const total = subtotal - discount + shipping;

  const progressToFreeShipping = Math.min(
    (subtotal / freeShippingThreshold) * 100,
    100,
  );

  // ✅ Redux functions
  const updateQuantity = (id, currentQty, delta) => {
    if (currentQty === 1 && delta === -1) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQty({ id, delta }));
    }
  };

  // ✅ Empty state (Improved)
  if (reduxItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-slate-100 p-8 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-slate-400" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Your bag is empty
        </h2>
        <p className="text-slate-500 mb-8 max-w-xs">
          Looks like you haven't added anything to your bag yet. Let's find
          something special!
        </p>
        <Link href="/">
          <Button
            className="px-8 py-3 flex items-center gap-2"
            text="Start Shopping"
            icon={<ArrowLeft size={20} />}
          />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 md:py-16 px-4">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-4 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Your Bag
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            You have{" "}
            <span className="text-[#2A4150]">{reduxItems.length} items</span>{" "}
            ready for checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: Items & Shipping Info */}
          <div className="lg:col-span-8 space-y-6">
            {/* Free Shipping Progress */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-2 rounded-lg ${subtotal >= freeShippingThreshold ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}
                >
                  <Truck size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">
                    {subtotal >= freeShippingThreshold
                      ? "Free Shipping Unlocked!"
                      : "Shipping Goal"}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {subtotal >= freeShippingThreshold
                      ? "Your order qualifies for free standard delivery."
                      : `Add ₹${(freeShippingThreshold - subtotal).toFixed(0)} more for free shipping.`}
                  </p>
                </div>
              </div>
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ease-out ${subtotal >= freeShippingThreshold ? "bg-green-500" : "bg-[#2A4150]"}`}
                  style={{ width: `${progressToFreeShipping}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {reduxItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 md:p-8 flex flex-col sm:flex-row gap-6 hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-full sm:w-32 h-40 sm:h-32 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover"
                        alt={item.name}
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900 leading-snug">
                            {item.name}
                          </h3>
                          <p className="text-sm text-slate-500 font-medium mt-1">
                            ₹{item.price} each
                          </p>
                        </div>
                        <p className="font-black text-lg text-slate-900">
                          ₹{(item.price * item.quantity).toFixed(0)}
                        </p>
                      </div>

                      <div className="mt-6 sm:mt-0">
                        <QuantitySelector
                          quantity={item.quantity}
                          onIncrease={() =>
                            updateQuantity(item.id, item.quantity, 1)
                          }
                          onDecrease={() =>
                            updateQuantity(item.id, item.quantity, -1)
                          }
                          onRemove={() => dispatch(removeFromCart(item.id))}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 mb-6 border-b pb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Subtotal</span>
                  <span className="text-slate-900">₹{subtotal.toFixed(0)}</span>
                </div>

                <div className="flex justify-between text-slate-600 font-medium">
                  <span>Estimated Shipping</span>
                  <span
                    className={
                      shipping === 0
                        ? "text-green-600 font-bold"
                        : "text-slate-900"
                    }
                  >
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-bold bg-green-50 p-2 rounded-lg">
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                  <div>
                    <p className="text-sm text-slate-500 font-medium">
                      Total Amount
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      (Inclusive of all taxes)
                    </p>
                  </div>
                  <span className="text-3xl font-black text-slate-900 tracking-tight">
                    ₹{total.toFixed(0)}
                  </span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="flex gap-2 mb-6">
                <InputField
                  buttonText="Apply"
                  showButton={true}
                  placeholder="Enter Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="h-11"
                />
              </div>

              <Button
                className="w-full py-4 text-lg font-bold shadow-lg shadow-blue-900/10"
                text="Proceed to Checkout"
                icon={<ChevronRight size={20} />}
              />

              {/* Trust Indicators */}
              <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck size={18} className="text-slate-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Secure
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RotateCcw size={18} className="text-slate-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Returns
                  </span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <CreditCard size={18} className="text-slate-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Certified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
