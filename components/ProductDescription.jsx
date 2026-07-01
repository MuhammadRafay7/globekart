'use client'
import { ArrowRight, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }) => {
    const [selectedTab, setSelectedTab] = useState('Description')

    return (
        <div className="my-14 text-sm text-slate-600 dark:text-slate-400">

            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-700 mb-8 max-w-2xl gap-1">
                {['Description', 'Reviews'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`px-5 py-2.5 font-medium transition-all rounded-t-lg ${tab === selectedTab
                            ? 'border-b-2 border-green-500 text-green-600 dark:text-green-400 font-semibold'
                            : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                            }`}
                    >
                        {tab} {tab === 'Reviews' && `(${product.rating.length})`}
                    </button>
                ))}
            </div>

            {/* Description */}
            {selectedTab === "Description" && (
                <div className="max-w-2xl">
                    <p className="leading-relaxed text-slate-600 dark:text-slate-400">{product.description}</p>
                </div>
            )}

            {/* Reviews */}
            {selectedTab === "Reviews" && (
                <div className="flex flex-col gap-6 max-w-2xl">
                    {product.rating.map((item, index) => (
                        <div key={index} className="flex gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                            <Image src={item.user.image} alt={item.user.name} className="w-10 h-10 rounded-full object-cover shrink-0" width={40} height={40} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
                                    <p className="font-semibold text-slate-800 dark:text-slate-100">{item.user.name}</p>
                                    <div className="flex items-center gap-1">
                                        {Array(5).fill('').map((_, i) => (
                                            <StarIcon key={i} size={14} className='text-transparent' fill={item.rating >= i + 1 ? "#00C950" : "#D1D5DB"} />
                                        ))}
                                    </div>
                                </div>
                                <p className="leading-relaxed text-slate-600 dark:text-slate-400">{item.review}</p>
                                <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Store section */}
            {product.store && (
                <div className="flex gap-3 mt-10 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 max-w-xs">
                    <Image src={product.store.logo} alt={product.store.name} className="w-11 h-11 rounded-xl object-contain border border-slate-200 dark:border-slate-600" width={44} height={44} />
                    <div>
                        <p className="font-semibold text-slate-700 dark:text-slate-300">Sold by {product.store.name}</p>
                        <Link href={`/shop/${product.store.username}`} className="flex items-center gap-1 text-green-500 dark:text-green-400 hover:text-green-600 text-xs mt-0.5 transition">
                            Visit Store <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDescription
