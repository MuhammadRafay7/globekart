'use client'
import { Heart, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist } from '@/lib/features/wishlist/wishlistSlice'
import { addToCart } from '@/lib/features/cart/cartSlice'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const dispatch = useDispatch()
    const wishlistItems = useSelector(state => state.wishlist.items)
    const isWishlisted = wishlistItems.includes(product.id)

    const avgRating = Math.round(
        product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length
    )

    const discount = product.mrp > product.price
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : 0

    const handleWishlist = (e) => {
        e.preventDefault()
        dispatch(toggleWishlist({ productId: product.id }))
        toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!')
    }

    const handleAddToCart = (e) => {
        e.preventDefault()
        dispatch(addToCart({ productId: product.id }))
        toast.success('Added to cart!')
    }

    return (
        <Link href={`/product/${product.id}`} className='group max-xl:mx-auto w-full max-w-[200px] sm:max-w-[220px]'>
            <div className='relative bg-slate-100 dark:bg-slate-800 h-40 sm:h-56 rounded-2xl flex items-center justify-center overflow-hidden'>
                <Image
                    width={500}
                    height={500}
                    className='max-h-28 sm:max-h-44 w-auto group-hover:scale-110 transition-transform duration-300 drop-shadow-md'
                    src={product.images[0]}
                    alt={product.name}
                />

                {/* Discount badge */}
                {discount > 0 && (
                    <span className='absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full'>
                        -{discount}%
                    </span>
                )}

                {/* Wishlist button */}
                <button
                    onClick={handleWishlist}
                    className='absolute top-2 right-2 p-1.5 rounded-full bg-white dark:bg-slate-700 shadow-md hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100'
                    aria-label="Toggle wishlist"
                >
                    <Heart
                        size={14}
                        className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-slate-400 dark:text-slate-300'}
                        fill={isWishlisted ? 'currentColor' : 'none'}
                    />
                </button>

                {/* Add to cart overlay */}
                <div className='absolute bottom-0 left-0 right-0 bg-slate-800/80 dark:bg-slate-900/80 text-white text-xs font-medium py-2 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-b-2xl'>
                    <button onClick={handleAddToCart} className='w-full'>Add to Cart</button>
                </div>
            </div>

            <div className='flex justify-between gap-2 text-sm text-slate-800 dark:text-slate-200 pt-2.5 px-0.5'>
                <div className='flex-1 min-w-0'>
                    <p className='truncate font-medium text-xs sm:text-sm'>{product.name}</p>
                    <div className='flex items-center gap-1 mt-0.5'>
                        {Array(5).fill('').map((_, i) => (
                            <StarIcon key={i} size={11} fill={avgRating >= i + 1 ? '#00C950' : '#D1D5DB'} className='text-transparent' />
                        ))}
                        <span className='text-[10px] text-slate-400 dark:text-slate-500 ml-0.5'>({product.rating.length})</span>
                    </div>
                </div>
                <div className='text-right shrink-0'>
                    <p className='font-semibold text-slate-800 dark:text-slate-100 text-sm'>{currency}{product.price}</p>
                    {discount > 0 && (
                        <p className='text-[10px] text-slate-400 line-through'>{currency}{product.mrp}</p>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
