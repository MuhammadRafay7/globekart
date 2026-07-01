'use client'
import Image from 'next/image'
import Link from 'next/link'
import { assets, dummyStoreData } from '@/assets/assets'
import { ShieldCheck, Truck, Headset, Zap, Users, Star, Award, Globe } from 'lucide-react'

const stats = [
    { label: 'Products Available', value: '10,000+', icon: Zap },
    { label: 'Happy Customers', value: '50,000+', icon: Users },
    { label: 'Average Rating', value: '4.8★', icon: Star },
    { label: 'Countries Served', value: '25+', icon: Globe },
]

const values = [
    {
        icon: ShieldCheck,
        title: 'Trust & Security',
        description: 'Every transaction is protected with bank-grade encryption. Your personal data and payment information are always safe.',
        color: '#00C950',
    },
    {
        icon: Truck,
        title: 'Fast Delivery',
        description: 'Free shipping on orders over $50. We deliver to over 25 countries with reliable tracking on every package.',
        color: '#FF8904',
    },
    {
        icon: Headset,
        title: '24/7 Support',
        description: 'Our dedicated support team is available around the clock to help you with any questions or concerns.',
        color: '#A684FF',
    },
    {
        icon: Award,
        title: 'Quality Guarantee',
        description: 'All products are carefully vetted. Not satisfied? We offer hassle-free returns within 7 days, no questions asked.',
        color: '#FF4D6D',
    },
]

const team = [
    { name: 'Sarah Johnson', role: 'CEO & Co-Founder', image: assets.gs_logo },
    { name: 'Mark Davis', role: 'Head of Product', image: assets.gs_logo },
    { name: 'Priya Patel', role: 'Lead Designer', image: assets.gs_logo },
]

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
                        Our Story
                    </span>
                    <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-6">
                        Shopping made <span className="text-green-500">smarter,</span><br />
                        every single day.
                    </h1>
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        GoCart was born from a simple belief: finding the best tech gadgets shouldn't be complicated. We curate the finest electronics and accessories so you can shop with confidence.
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <Link href="/shop" className="px-8 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 hover:scale-105 active:scale-95 transition-all">
                            Browse Products
                        </Link>
                        <Link href="/contact" className="px-8 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-full font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                            Get in Touch
                        </Link>
                    </div>
                </div>
                {/* Decorative blobs */}
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-green-200/40 dark:bg-green-900/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-200/40 dark:bg-emerald-900/20 rounded-full blur-3xl pointer-events-none" />
            </section>

            {/* Stats Section */}
            <section className="py-16 px-6 border-b border-slate-100 dark:border-slate-800">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center group">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
                                <stat.icon size={22} className="text-green-600 dark:text-green-400" />
                            </div>
                            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{stat.value}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14">
                    <div className="flex-1">
                        <span className="text-xs font-semibold text-green-500 uppercase tracking-widest">Our Mission</span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6 leading-tight">
                            Empowering people through <span className="text-green-500">smart technology</span>
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                            We believe everyone deserves access to premium technology at fair prices. That's why we work directly with top manufacturers and vetted sellers to cut out the middleman.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Our platform connects thousands of buyers with trusted stores, ensuring genuine products, competitive prices, and a shopping experience you can trust every time.
                        </p>
                    </div>
                    <div className="flex-1 relative">
                        <div className="relative w-full h-72 sm:h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-green-100 to-emerald-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center">
                            <Image src={dummyStoreData.logo} alt="Our store" fill className="object-cover opacity-80 dark:opacity-60" />
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-slate-700">
                            <p className="text-2xl font-bold text-green-500">98%</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Customer satisfaction</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-6 bg-slate-50 dark:bg-slate-800/50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-xs font-semibold text-green-500 uppercase tracking-widest">What We Stand For</span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-slate-800 dark:text-slate-100">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((val, i) => (
                            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 group">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                                    style={{ backgroundColor: val.color + '20' }}
                                >
                                    <val.icon size={22} style={{ color: val.color }} />
                                </div>
                                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">{val.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{val.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to start shopping?</h2>
                    <p className="text-green-100 mb-8 leading-relaxed">
                        Join 50,000+ happy customers who trust GoCart for their tech needs. Create your free account today.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link href="/shop" className="px-8 py-3 bg-white text-green-600 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg">
                            Start Shopping
                        </Link>
                        <Link href="/create-store" className="px-8 py-3 bg-white/20 text-white border border-white/40 rounded-full font-semibold hover:bg-white/30 transition-all">
                            Open a Store
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
