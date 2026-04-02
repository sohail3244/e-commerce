"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ShoppingCart, User, MapPin, LogOut } from "lucide-react";

import SearchField from "./ui/SearchField";
import LoginModal from "./modals/LoginModal";
import Button from "./ui/Button";
import { closeLogin, logout, openLogin } from "@/store/slices/authSlice";
import { useCategories } from "@/lib/queries/useCategories";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const menuRef = useRef(null);
  const { data: categories = [], isLoading } = useCategories();
  const [openMenu, setOpenMenu] = useState(false);

  const { user, isAuthenticated, openLoginModal } = useSelector(
    (state) => state.auth,
  );
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  // Close menu on click outside or scroll
  useEffect(() => {
    const close = () => setOpenMenu(false);

    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) close();
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", close);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", close);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setOpenMenu(false);
    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#e0e0e0] bg-white/95 backdrop-blur-md shadow-sm ">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-10">
          <div className="flex h-16 items-center justify-between md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="shrink-0 text-2xl font-black tracking-tighter md:text-3xl"
            >
              <span className="text-[#2A4150]">Azz</span>
              <span className="text-[#9ca0a3]">unique</span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden max-w-xl flex-1 mx-8 md:block">
              <SearchField showButton />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              <StoreLocator />

              {/* Cart */}
              <Link
                href="/cart"
                className="relative flex items-center gap-2 text-slate-700 hover:text-[#2A4150]"
              >
                <div className="relative">
                  <ShoppingCart size={24} />
                  {totalQuantity > 0 && (
                    <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#2A4150] text-[10px] font-bold text-white">
                      {totalQuantity}
                    </span>
                  )}
                </div>
                <span className="hidden text-sm font-medium sm:inline">
                  Cart
                </span>
              </Link>

              {/* User Section */}
              <div className="relative" ref={menuRef}>
                {isAuthenticated ? (
                  <UserDropdown
                    user={user}
                    isOpen={openMenu}
                    setOpen={setOpenMenu}
                    onLogout={handleLogout}
                  />
                ) : (
                  <Button
                    text="Login"
                    onClick={() => dispatch(openLogin())}
                    className="px-4 py-1.5 text-sm md:px-6 md:py-2"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-4 pb-3 md:hidden">
          <SearchField showButton={false} />
        </div>

        {/* Navigation */}
        <nav className="border-t border-slate-50 bg-white">
          <div className="mx-auto max-w-7xl px-4">
            <ul className="no-scrollbar flex items-center gap-6 overflow-x-auto py-3 scroll-smooth whitespace-nowrap md:justify-between">
              {/* HOME */}
              <li key="home" className="shrink-0">
                <NavLink item="HOME" />
              </li>

              {categories.map((cat) => (
                <li key={cat.id} className="shrink-0 uppercase">
                  <NavLink item={cat.name} />
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      <LoginModal
        isOpen={openLoginModal}
        onClose={() => dispatch(closeLogin())}
      />
    </>
  );
}

function StoreLocator() {
  return (
    <div className="group hidden cursor-pointer items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#2A4150] xl:flex">
      <MapPin size={20} className="group-hover:animate-bounce" />
      <span>Store Locator</span>
    </div>
  );
}

function NavLink({ item }) {
  const slug = item.toLowerCase().replace(/\s+/g, "-");
  const href = item === "HOME" ? "/" : `/category/${slug}`;

  return (
    <Link
      href={href}
      className="group relative text-[11px] font-bold tracking-widest text-slate-600 transition-colors hover:text-[#2A4150] md:text-[12px]"
    >
      {item}
      <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#2A4150] transition-all group-hover:w-full" />
    </Link>
  );
}

function UserDropdown({ user, isOpen, setOpen, onLogout }) {
  const menuItems = [
    { label: "Your Profile", href: "/customer/profile" },
    { label: "Your Orders", href: "/customer/orders" },
    { label: "Manage Address", href: "/customer/address" },
    { label: "Contact Us", href: "/contact-us" },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(!isOpen)}
        className="flex items-center gap-1 rounded-lg p-1 text-[#2A4150] transition-colors hover:bg-slate-50"
      >
        <div className="rounded-full bg-slate-100 p-1.5">
          <User size={22} />
        </div>
        {/* <span className="hidden max-w-25 truncate text-sm font-semibold md:block">
          {user?.name}
        </span> */}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 animate-in fade-in zoom-in duration-200 overflow-hidden rounded-xl border border-[#e0e0e0] bg-white shadow-xl z-50">
          <div className="bg-slate-50 px-4 py-3 border-b border-slate-100 md:hidden">
            <p className="text-xs text-slate-500">Welcome,</p>
            <p className="truncate text-sm font-bold text-[#2A4150]">
              {user?.name}
            </p>
          </div>

          <div className="py-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
            {user?.role?.toLowerCase() === "admin" && (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                Admin Dashboard
              </Link>
            )}
          </div>

          <button
            onClick={onLogout}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm font-bold text-red-500 border-t border-[#e0e0e0] hover:bg-red-50"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </>
  );
}
