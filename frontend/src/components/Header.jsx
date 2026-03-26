"use client";

import Link from "next/link";
import { ShoppingCart, User, MapPin, ChevronDown, LogOut } from "lucide-react";
import SearchField from "./ui/SearchField";
import LoginModal from "./modals/LoginModal";
import { useEffect, useRef, useState } from "react";
import Button from "./ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/authSlice";

export default function Header() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const { user, isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const categories = [
    "HOME",
    "FACE",
    "HAIR",
    "MAKEUP",
    "BODY",
    "BABY",
    "COMBOS",
    "NEW LAUNCHES",
    "INGREDIENT",
    "BLOG",
  ];

  useEffect(() => {
  function handleClickOutside(event) {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

useEffect(() => {
  function handleScroll() {
    setOpenMenu(false);
  }

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <>
      <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e0e0e0]">
        <div className="max-w-full  mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl md:text-3xl font-black tracking-tighter shrink-0"
            >
              <span className="text-[#2A4150]">Azz</span>
              <span className="text-[#9ca0a3]">unique</span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <SearchField showButton={true} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="hidden xl:flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer hover:text-[#2A4150] transition-colors group">
                <MapPin size={20} className="group-hover:animate-bounce" />
                <span>Store Locator</span>
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="flex items-center gap-2 text-slate-700 hover:text-[#2A4150] relative"
              >
                <div className="relative">
                  <ShoppingCart size={24} />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#2A4150] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {totalQuantity}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-medium text-sm">
                  Cart
                </span>
              </Link>

              {/* USER SECTION: Responsive Dropdown */}
              <div className="relative" ref={menuRef}>
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => setOpenMenu(!openMenu)}
                      className="flex items-center gap-1 text-[#2A4150] hover:bg-slate-50 p-1 rounded-lg transition-colors"
                    >
                      <div className="bg-slate-100 p-1.5 rounded-full">
                        <User size={22} />
                      </div>
                      {/* <span className="hidden md:block text-sm font-semibold max-w-25 truncate">
                        {user?.name}
                      </span> */}
                    </button>

                    {/* DROPDOWN MENU - Works on Mobile and Desktop */}
                    {openMenu && (
                      <div className="absolute right-0 mt-3 w-56 bg-white border border-[#e0e0e0] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 md:hidden">
                          <p className="text-xs text-slate-500">Welcome,</p>
                          <p className="text-sm font-bold text-[#2A4150] truncate">
                            {user?.name}
                          </p>
                        </div>

                        <div className="py-1">
                          <Link
                            href="/profile"
                            onClick={() => setOpenMenu(false)}
                            className="block px-4 py-2.5 hover:bg-slate-50 text-sm text-slate-600"
                          >
                            Your Profile
                          </Link>
                          <Link
                            href="/orders"
                            onClick={() => setOpenMenu(false)}
                            className="block px-4 py-2.5 hover:bg-slate-50 text-sm text-slate-600"
                          >
                            Your Orders
                          </Link>
                          <Link
                            href="/cards"
                            onClick={() => setOpenMenu(false)}
                            className="block px-4 py-2.5 hover:bg-slate-50 text-sm text-slate-600"
                          >
                            Saved Cards
                          </Link>
                          <Link
                            href="/address"
                            onClick={() => setOpenMenu(false)}
                            className="block px-4 py-2.5 hover:bg-slate-50 text-sm text-slate-600"
                          >
                            Manage Address
                          </Link>
                          <Link
                            href="/contact"
                            onClick={() => setOpenMenu(false)}
                            className="block px-4 py-2.5 hover:bg-slate-50 text-sm text-slate-600"
                          >
                            Contact Us
                          </Link>
                        </div>

                        <div className="border-t border-[#e0e0e0]" />

                        <button
                          onClick={() => {
                            dispatch(logout());
                            setOpenMenu(false);
                          }}
                          className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 text-sm font-bold flex items-center gap-2"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <Button
                    text="Login"
                    onClick={() => setOpenLogin(true)}
                    className="px-4 py-1.5 md:px-6 md:py-2 text-sm"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <SearchField showButton={false} />
        </div>

        {/* Navigation */}
        <nav className="border-t border-slate-50 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            <ul className="flex items-center gap-6 md:justify-between py-3 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap">
              {categories.map((item) => {
                const slug = item.toLowerCase().replace(" ", "-");
                return (
                  <li key={item} className="shrink-0">
                    <Link
                      href={item === "HOME" ? "/" : `/category/${slug}`}
                      className="text-[11px] md:text-[12px] font-bold text-slate-600 hover:text-[#2A4150] tracking-widest transition-colors relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2A4150] transition-all group-hover:w-full"></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>

      <LoginModal isOpen={openLogin} onClose={() => setOpenLogin(false)} />

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
