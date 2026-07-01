'use client'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromWishlist, clearWishlist } from '@/lib/features/wishlist/wishlistSlice'
import { addToCart } from '@/lib/features/cart/cartSlice'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { StarIcon } from 'lucide-react'

export default function WishlistPage() {
    const dispatch = useDispatch()
    const wishlistIds = useSelector(state => state.wishlist.items)
    const products = useSelector(state => state.product.list)
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const wishlistProducts = products.filter(p => wishlistIds.includes(p.id))

    const handleRemove = (productId) => {
        dispatch(removeFromWishlist({ productId }))
        toast.success('Removed from wishlist')
    }

    const handleAddToCart = (productId) => {
        dispatch(addToCart({ productId }))
        toast.success('Added to cart!')
    }

    if (wishlistProducts.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center bg-white dark:bg-slate-900">
                <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                    <Heart size={40} className="text-red-400 dark:text-red-500" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-3">Your wishlist is empty</h1>
                <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">Save your favourite items by clicking the heart icon on any product.</p>
                <Link href="/shop" className="flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 hover:scale-105 active:scale-95 transition-all">
                    <ShoppingCart size={16} />
                    Browse Products
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 px-6 py-10">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        <Link href="/shop" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                                <Heart size={22} className="text-red-500 fill-red-500" />
                                My Wishlist
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{wishlistProducts.length} saved item{wishlistProducts.length !== 1 ? 's' : ''}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => { dispatch(clearWishlist()); toast.success('Wishlist cleared') }}
                        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 px-4 py-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    >
                        <Trash2 size={14} />
                        Clear All
                    </button>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistProducts.map(product => {
                        const avgRating = Math.round(
                            product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length
                        )
                        const discount = product.mrp > product.price
                            ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
                            : 0

                        return (
                            <div key={product.id} className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
                                <Link href={`/product/${product.id}`} className="block relative h-52 bg-slate-100 dark:bg-slate-700 overflow-hidden">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {discount > 0 && (
                                        <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                            -{discount}%
                                        </span>
                                    )}
                                </Link>
                                <div className="p-4">
                                    <Link href={`/product/${product.id}`}>
                                        <h3 className="font-semibold text-slate-800 dark:text-slate-100 hover:text-green-500 dark:hover:text-green-400 transition-colors truncate">{product.name}</h3>
                                    </Link>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{product.category}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        {Array(5).fill('').map((_, i) => (
                                            <StarIcon key={i} size={11} fill={avgRating >= i + 1 ? '#00C950' : '#D1D5DB'} className="text-transparent" />
                                        ))}
                                        <span className="text-[10px] text-slate-400 ml-1">({product.rating.length})</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <div>
                                            <span className="font-bold text-slate-800 dark:text-slate-100">{currency}{product.price}</span>
                                            {discount > 0 && (
                                                <span className="text-xs text-slate-400 line-through ml-2">{currency}{product.mrp}</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => handleAddToCart(product.id)}
                                            className="flex-1 flex items-center justify-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 rounded-xl transition-all hover:scale-[1.02] active:scale-95"
                                        >
                                            <ShoppingCart size={14} />
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => handleRemove(product.id)}
                                            className="p-2 text-red-400 hover:text-red-500 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition"
                                            aria-label="Remove from wishlist"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
