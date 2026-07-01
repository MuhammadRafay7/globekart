'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'

const Hero = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-6 max-w-7xl mx-auto my-10'>
                {/* Main hero card */}
                <div className='relative flex-1 flex flex-col bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/40 dark:to-emerald-900/30 rounded-3xl xl:min-h-[420px] group overflow-hidden border border-green-200 dark:border-green-800/50'>
                    <div className='p-6 sm:p-14 z-10'>
                        <div className='inline-flex items-center gap-3 bg-green-200 dark:bg-green-800/50 text-green-700 dark:text-green-300 pr-4 p-1 rounded-full text-xs sm:text-sm mb-4'>
                            <span className='bg-green-600 px-3 py-1 rounded-full text-white text-xs font-medium'>NEWS</span>
                            Free Shipping on Orders Above {currency}50!
                            <ChevronRightIcon className='group-hover:ml-1 transition-all' size={14} />
                        </div>
                        <h1 className='text-3xl sm:text-5xl leading-[1.15] font-semibold text-slate-800 dark:text-slate-100 max-w-sm sm:max-w-md'>
                            Gadgets you&apos;ll <span className='text-green-600 dark:text-green-400'>love.</span><br />
                            Prices you&apos;ll <span className='text-green-600 dark:text-green-400'>trust.</span>
                        </h1>
                        <div className='text-slate-700 dark:text-slate-300 text-sm font-medium mt-6 sm:mt-10'>
                            <p className='text-slate-500 dark:text-slate-400'>Starts from</p>
                            <p className='text-4xl font-bold text-slate-800 dark:text-white'>{currency}4.90</p>
                        </div>
                        <div className='flex gap-3 mt-6 sm:mt-8'>
                            <Link href="/shop" className='flex items-center gap-2 bg-slate-800 dark:bg-white text-white dark:text-slate-800 text-sm py-3 px-8 rounded-full hover:bg-slate-900 dark:hover:bg-slate-100 hover:scale-105 active:scale-95 transition font-medium'>
                                <ShoppingBag size={16} />
                                Shop Now
                            </Link>
                            <Link href="/about" className='text-slate-700 dark:text-slate-300 text-sm py-3 px-6 rounded-full border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition'>
                                Learn More
                            </Link>
                        </div>
                    </div>
                    <Image
                        className='sm:absolute bottom-0 right-0 md:right-8 w-full sm:max-w-sm object-contain drop-shadow-xl'
                        src={assets.hero_model_img}
                        alt="Featured gadget"
                        priority
                    />
                    {/* Decorative circle */}
                    <div className='absolute -bottom-20 -right-20 w-64 h-64 bg-green-300/30 dark:bg-green-700/20 rounded-full blur-3xl pointer-events-none' />
                </div>

                {/* Side cards */}
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-[320px] text-sm'>
                    <Link href="/shop?search=best" className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-orange-100 to-amber-200 dark:from-orange-900/40 dark:to-amber-900/30 rounded-3xl p-6 px-8 group border border-orange-200 dark:border-orange-800/40 hover:shadow-lg transition-all duration-300'>
                        <div>
                            <p className='text-2xl font-semibold text-slate-800 dark:text-slate-100 max-w-32 leading-tight'>Best Products</p>
                            <p className='flex items-center gap-1 mt-4 text-slate-600 dark:text-slate-300'>
                                View more <ArrowRightIcon className='group-hover:ml-2 transition-all' size={16} />
                            </p>
                        </div>
                        <Image className='w-28 drop-shadow-md group-hover:scale-105 transition-transform duration-300' src={assets.hero_product_img1} alt="" />
                    </Link>

                    <Link href="/shop" className='flex-1 flex items-center justify-between w-full bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/40 dark:to-indigo-900/30 rounded-3xl p-6 px-8 group border border-blue-200 dark:border-blue-800/40 hover:shadow-lg transition-all duration-300'>
                        <div>
                            <p className='text-2xl font-semibold text-slate-800 dark:text-slate-100 max-w-32 leading-tight'>20% discounts</p>
                            <p className='flex items-center gap-1 mt-4 text-slate-600 dark:text-slate-300'>
                                View more <ArrowRightIcon className='group-hover:ml-2 transition-all' size={16} />
                            </p>
                        </div>
                        <Image className='w-28 drop-shadow-md group-hover:scale-105 transition-transform duration-300' src={assets.hero_product_img2} alt="" />
                    </Link>
                </div>
            </div>

            <CategoriesMarquee />
        </div>
    )
}

export default Hero
