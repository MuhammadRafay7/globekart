'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { assets, dummyUserData, orderDummyData } from '@/assets/assets'
import { User, Mail, Phone, MapPin, ShoppingBag, Heart, Settings, LogOut, Edit3, ChevronRight, Package } from 'lucide-react'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'settings', label: 'Settings', icon: Settings },
]

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('overview')
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({
        name: dummyUserData.name,
        email: dummyUserData.email,
        phone: '+1-212-456-7890',
    })

    const wishlistCount = useSelector(state => state.wishlist.items.length)
    const cartCount = useSelector(state => state.cart.total)
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const handleSave = (e) => {
        e.preventDefault()
        setEditing(false)
        toast.success('Profile updated!')
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-10 px-6">
            <div className="max-w-5xl mx-auto">

                {/* Profile Header */}
                <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden mb-6">
                    <div className="h-24 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400" />
                    <div className="px-8 pb-6">
                        <div className="flex items-end gap-5 -mt-12 mb-4">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-700 shadow-lg">
                                    <Image src={dummyUserData.image} alt="avatar" width={96} height={96} className="object-cover w-full h-full" />
                                </div>
                                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-green-600 transition">
                                    <Edit3 size={12} />
                                </button>
                            </div>
                            <div className="flex-1 pb-1">
                                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">{form.name}</h1>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{form.email}</p>
                            </div>
                            <button
                                onClick={() => setEditing(!editing)}
                                className="hidden sm:flex items-center gap-2 text-sm border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                            >
                                <Edit3 size={14} />
                                Edit Profile
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{orderDummyData.length}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Orders</p>
                            </div>
                            <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{wishlistCount}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Wishlist</p>
                            </div>
                            <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{cartCount}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">In Cart</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-1 mb-6">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                ? 'bg-green-500 text-white shadow-sm'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                                }`}
                        >
                            <tab.icon size={15} />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <div className="space-y-5">
                        {editing ? (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
                                <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-5">Edit Profile</h2>
                                <form onSubmit={handleSave} className="space-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">Full Name</label>
                                        <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400 transition" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">Email</label>
                                        <input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400 transition" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 block mb-1.5">Phone</label>
                                        <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-green-400 transition" />
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <button type="submit" className="px-6 py-2.5 bg-green-500 text-white rounded-xl text-sm font-medium hover:bg-green-600 transition">Save Changes</button>
                                        <button type="button" onClick={() => setEditing(false)} className="px-6 py-2.5 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-400 rounded-xl text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition">Cancel</button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6">
                                <h2 className="font-semibold text-slate-800 dark:text-slate-100 mb-5">Personal Information</h2>
                                <div className="space-y-4">
                                    {[
                                        { icon: User, label: 'Full Name', value: form.name },
                                        { icon: Mail, label: 'Email', value: form.email },
                                        { icon: Phone, label: 'Phone', value: form.phone },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                                            <div className="w-9 h-9 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center shrink-0">
                                                <item.icon size={16} className="text-green-600 dark:text-green-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-400 dark:text-slate-500">{item.label}</p>
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quick Links */}
                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                            {[
                                { icon: ShoppingBag, label: 'My Orders', sub: `${orderDummyData.length} total orders`, href: '/orders', color: '#00C950' },
                                { icon: Heart, label: 'My Wishlist', sub: `${wishlistCount} saved items`, href: '/wishlist', color: '#FF4D6D' },
                                { icon: MapPin, label: 'Addresses', sub: 'Manage delivery addresses', href: '/', color: '#FF8904' },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: item.color + '20' }}>
                                        <item.icon size={16} style={{ color: item.color }} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</p>
                                        <p className="text-xs text-slate-400 dark:text-slate-500">{item.sub}</p>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-400" />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="space-y-4">
                        {orderDummyData.map(order => (
                            <div key={order.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-5">
                                <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
                                    <div>
                                        <p className="text-xs text-slate-400 dark:text-slate-500">Order ID</p>
                                        <p className="text-sm font-mono font-medium text-slate-700 dark:text-slate-300">{order.id.slice(0, 20)}...</p>
                                    </div>
                                    <div className="text-right">
                                        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${order.status === 'DELIVERED' ? 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300' : 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300'}`}>
                                            {order.status}
                                        </span>
                                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">{currency}{order.total}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-wrap">
                                    {order.orderItems.slice(0, 3).map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 rounded-xl px-3 py-2">
                                            <Package size={14} className="text-slate-400" />
                                            <span className="text-xs text-slate-600 dark:text-slate-300">{item.product.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                                    <p className="text-xs text-slate-400 dark:text-slate-500">
                                        {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </p>
                                    <Link href="/orders" className="text-xs text-green-500 hover:text-green-600 font-medium flex items-center gap-1">
                                        View Details <ChevronRight size={12} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'settings' && (
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700">
                        {[
                            { label: 'Email Notifications', sub: 'Receive order updates via email', toggle: true },
                            { label: 'SMS Notifications', sub: 'Receive order updates via SMS', toggle: true },
                            { label: 'Marketing Emails', sub: 'Receive deals and promotions', toggle: false },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-5">
                                <div>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500">{item.sub}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" defaultChecked={item.toggle} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 peer-checked:bg-green-500 rounded-full peer transition-colors after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5" />
                                </label>
                            </div>
                        ))}
                        <div className="p-5">
                            <button onClick={() => toast('Sign out feature coming soon!')} className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 dark:text-red-400 font-medium transition">
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
