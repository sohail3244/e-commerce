import Link from "next/link";
import { ShoppingCart, User, Search, MapPin } from "lucide-react";
import SearchField from "./ui/SearchField";

export default function Header() {
    return (
        <header className="w-full border-b bg-white">
            {/* Top Header */}
            <div className="flex items-center justify-between px-6 lg:px-10 py-3 max-w-7xl mx-auto">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold">
                    <span className="text-blue-600">mama</span>
                    <span className="text-green-500">earth</span>
                </Link>

                {/* Search */}
                <div className="hidden md:flex items-center border border-gray-300 rounded-md overflow-hidden w-[400px] lg:w-[450px]">
                    <SearchField/>
                </div>

                {/* Right Icons */}
                <div className="flex items-center gap-4 lg:gap-6">
                    {/* Store Locator (from original design) */}
                    <div className="hidden lg:flex items-center gap-1 text-sm cursor-pointer hover:text-blue-600">
                        <MapPin size={18} />
                        <span>Store Locator</span>
                    </div>

                    <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                        <ShoppingCart size={20} />
                        <span className="text-sm hidden sm:inline">Cart</span>
                    </div>

                    <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600">
                        <User size={20} />
                        <span className="text-sm hidden sm:inline">Login</span>
                    </div>
                </div>
            </div>

            {/* Mobile Search (visible only on mobile) */}
            <div className="md:hidden px-4 pb-3">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <input
                        type="text"
                        placeholder="Search for Ubtan..."
                        className="flex-1 px-3 py-2 outline-none text-sm"
                    />
                    <button className="bg-blue-600 text-white px-3 py-2">
                        <Search size={18} />
                    </button>
                </div>
            </div>

            {/* Menu */}
            <nav className="border-t hidden lg:block">
                <div className="flex justify-center items-center gap-6 xl:gap-8 py-3 text-xs font-medium text-gray-700 max-w-7xl mx-auto">
                    <Link href="/" className="hover:text-blue-600 transition-colors">HOME</Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">FACE</Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">HAIR</Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">MAKEUP</Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">BODY</Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">BABY</Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">COMBOS</Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">NEW LAUNCHES</Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">INGREDIENT</Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">ALL PRODUCTS</Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">BLOG</Link>
                    <Link href="#" className="hover:text-blue-600 transition-colors">PLANT GOODNESS</Link>
                </div>
            </nav>

            {/* Mobile Menu Indicator */}
            <div className="lg:hidden border-t py-2 px-4 text-xs text-gray-500 flex items-center justify-between">
                <span>Menu</span>
                <span className="text-blue  -600">▼</span>
            </div>
        </header>
    );
}