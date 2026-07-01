'use client'
import { Search, ShoppingCart, Heart, Menu, X, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
]

const Navbar = () => {
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [mobileOpen, setMobileOpen] = useState(false)

    const cartCount = useSelector(state => state.cart.total)
    const wishlistCount = useSelector(state => state.wishlist.items.length)

    const handleSearch = (e) => {
        e.preventDefault()
        setMobileOpen(false)
        router.push(`/shop?search=${search}`)
    }

    return (
        <>
            <nav className="relative bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                <div className="mx-6">
                    <div className="flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

                        {/* Logo */}
                        <Link href="/" className="relative text-4xl font-semibold text-slate-700 dark:text-slate-200">
                            <span className="text-green-500">go</span>cart<span className="text-green-500 text-5xl leading-0">.</span>
                            <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-green-500">
                                plus
                            </p>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden sm:flex items-center gap-4 lg:gap-7 text-slate-600 dark:text-slate-300">
                            {navLinks.map(link => (
                                <Link key={link.href} href={link.href} className="hover:text-green-500 dark:hover:text-green-400 transition-colors text-sm font-medium">
                                    {link.label}
                                </Link>
                            ))}

                            <form onSubmit={handleSearch} className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-full">
                                <Search size={16} className="text-slate-500 dark:text-slate-400 shrink-0" />
                                <input
                                    className="w-full bg-transparent outline-none placeholder-slate-500 dark:placeholder-slate-400 text-slate-700 dark:text-slate-200"
                                    type="text"
                                    placeholder="Search products"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    required
                                />
                            </form>

                            {/* Wishlist */}
                            <Link href="/wishlist" className="relative flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-green-500 dark:hover:text-green-400 transition-colors">
                                <Heart size={18} />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 text-[8px] text-white bg-red-500 size-3.5 rounded-full flex items-center justify-center">{wishlistCount}</span>
                                )}
                            </Link>

                            {/* Cart */}
                            <Link href="/cart" className="relative flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-green-500 dark:hover:text-green-400 transition-colors">
                                <ShoppingCart size={18} />
                                <span className="text-sm">Cart</span>
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 left-2.5 text-[8px] text-white bg-slate-700 dark:bg-green-600 size-3.5 rounded-full flex items-center justify-center">{cartCount}</span>
                                )}
                            </Link>

                            <ThemeToggle />

                            <Link href="/profile" className="flex items-center gap-1.5 px-5 py-2 bg-green-500 hover:bg-green-600 transition text-white text-sm rounded-full font-medium">
                                <User size={14} />
                                Login
                            </Link>
                        </div>

                        {/* Mobile right side */}
                        <div className="sm:hidden flex items-center gap-3">
                            <Link href="/cart" className="relative text-slate-600 dark:text-slate-300">
                                <ShoppingCart size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1.5 -right-1.5 text-[8px] text-white bg-slate-700 size-3.5 rounded-full flex items-center justify-center">{cartCount}</span>
                                )}
                            </Link>
                            <ThemeToggle />
                            <button onClick={() => setMobileOpen(true)} className="text-slate-600 dark:text-slate-300 p-1">
                                <Menu size={22} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 sm:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-72 bg-white dark:bg-slate-900 shadow-2xl animate-slide-in-right flex flex-col">
                        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-700">
                            <Link href="/" onClick={() => setMobileOpen(false)} className="text-2xl font-semibold text-slate-700 dark:text-slate-200">
                                <span className="text-green-500">go</span>cart<span className="text-green-500 text-3xl">.</span>
                            </Link>
                            <button onClick={() => setMobileOpen(false)} className="text-slate-500 dark:text-slate-400 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSearch} className="mx-5 mt-5 flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-full">
                            <Search size={16} className="text-slate-500 dark:text-slate-400 shrink-0" />
                            <input
                                className="w-full bg-transparent outline-none placeholder-slate-500 dark:placeholder-slate-400 text-slate-700 dark:text-slate-200 text-sm"
                                type="text"
                                placeholder="Search products"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                required
                            />
                        </form>

                        <nav className="flex flex-col gap-1 p-5 mt-2">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors flex items-center gap-2">
                                <Heart size={16} /> Wishlist {wishlistCount > 0 && <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{wishlistCount}</span>}
                            </Link>
                            <Link href="/orders" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors">
                                My Orders
                            </Link>
                            <Link href="/profile" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium transition-colors">
                                Profile
                            </Link>
                        </nav>

                        <div className="mt-auto p-5 border-t border-slate-200 dark:border-slate-700">
                            <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-medium transition">
                                <User size={16} />
                                Login / Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
