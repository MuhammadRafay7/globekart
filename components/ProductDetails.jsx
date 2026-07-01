'use client'
import { addToCart } from "@/lib/features/cart/cartSlice";
import { toggleWishlist } from "@/lib/features/wishlist/wishlistSlice";
import { StarIcon, TagIcon, EarthIcon, CreditCardIcon, UserIcon, Heart, ShoppingCart, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProductDetails = ({ product }) => {
    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';

    const cart = useSelector(state => state.cart.cartItems);
    const wishlistItems = useSelector(state => state.wishlist.items);
    const isWishlisted = wishlistItems.includes(productId);
    const dispatch = useDispatch();
    const router = useRouter();

    const [mainImage, setMainImage] = useState(product.images[0]);

    const averageRating = product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length;
    const discount = ((product.mrp - product.price) / product.mrp * 100).toFixed(0);

    const handleWishlist = () => {
        dispatch(toggleWishlist({ productId }))
        toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!')
    }

    return (
        <div className="flex max-lg:flex-col gap-10 lg:gap-14">
            {/* Images */}
            <div className="flex max-sm:flex-col-reverse gap-3">
                <div className="flex sm:flex-col gap-3">
                    {product.images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setMainImage(image)}
                            className={`bg-slate-100 dark:bg-slate-800 flex items-center justify-center w-20 h-20 rounded-xl transition-all border-2 ${mainImage === image ? 'border-green-400' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}
                        >
                            <Image src={image} className="w-14 h-14 object-contain" alt="" width={56} height={56} />
                        </button>
                    ))}
                </div>
                <div className="flex justify-center items-center min-h-80 sm:w-96 bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden">
                    <Image src={mainImage} alt={product.name} width={280} height={280} className="object-contain p-6 hover:scale-105 transition-transform duration-300" />
                </div>
            </div>

            {/* Details */}
            <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-sm text-green-500 dark:text-green-400 font-medium mb-1">{product.category}</p>
                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">{product.name}</h1>
                    </div>
                    <button
                        onClick={handleWishlist}
                        className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all shrink-0"
                    >
                        <Heart size={20} className={isWishlisted ? 'text-red-500 fill-red-500' : 'text-slate-400 dark:text-slate-500'} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-3">
                    {Array(5).fill('').map((_, i) => (
                        <StarIcon key={i} size={16} className='text-transparent' fill={averageRating >= i + 1 ? "#00C950" : "#D1D5DB"} />
                    ))}
                    <p className="text-sm text-slate-500 dark:text-slate-400 ml-1">({product.rating.length} reviews)</p>
                </div>

                {/* Price */}
                <div className="flex items-end gap-3 my-5">
                    <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{currency}{product.price}</p>
                    <p className="text-xl text-slate-400 dark:text-slate-500 line-through pb-0.5">{currency}{product.mrp}</p>
                    <span className="bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-full">
                        -{discount}%
                    </span>
                </div>

                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm mb-6">
                    <TagIcon size={14} />
                    <p>You save {currency}{(product.mrp - product.price).toFixed(2)} on this item</p>
                </div>

                {/* Stock */}
                <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 ${product.inStock ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>

                {/* Cart actions */}
                <div className="flex items-center gap-4 flex-wrap">
                    {cart[productId] && (
                        <div className="flex flex-col gap-1.5">
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Quantity</p>
                            <Counter productId={productId} />
                        </div>
                    )}
                    <button
                        onClick={() => !cart[productId] ? dispatch(addToCart({ productId })) : router.push('/cart')}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all shadow-md shadow-green-200 dark:shadow-green-900/30"
                    >
                        <ShoppingCart size={16} />
                        {!cart[productId] ? 'Add to Cart' : 'View Cart'}
                    </button>
                    <button
                        onClick={() => { dispatch(addToCart({ productId })); router.push('/cart') }}
                        className="flex items-center gap-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 active:scale-95 transition-all"
                    >
                        <Zap size={16} />
                        Buy Now
                    </button>
                </div>

                <hr className="border-slate-200 dark:border-slate-700 my-6" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                        { icon: EarthIcon, text: 'Free worldwide shipping', sub: 'Orders over $50' },
                        { icon: CreditCardIcon, text: '100% Secure Payment', sub: 'SSL Encrypted' },
                        { icon: UserIcon, text: 'Trusted by 50K+', sub: 'Happy customers' },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                            <item.icon size={18} className="text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.text}</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500">{item.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Store info */}
                {product.store && (
                    <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600">
                            <Image src={product.store.logo} alt={product.store.name} width={40} height={40} className="object-contain w-full h-full" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{product.store.name}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500">Verified Seller</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductDetails
