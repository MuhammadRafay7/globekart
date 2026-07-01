'use client'
import PageTitle from "@/components/PageTitle"
import { useEffect, useState } from "react";
import OrderItem from "@/components/OrderItem";
import { orderDummyData } from "@/assets/assets";
import { Package } from "lucide-react";
import Link from "next/link";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(orderDummyData)
    }, []);

    if (orders.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-5 text-center px-6 bg-white dark:bg-slate-900">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <Package size={40} className="text-slate-400 dark:text-slate-500" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">No orders yet</h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">You haven't placed any orders. Start shopping to see your orders here.</p>
                <Link href="/shop" className="px-8 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 hover:scale-105 active:scale-95 transition-all">
                    Browse Products
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-[70vh] mx-6 bg-white dark:bg-slate-900">
            <div className="max-w-4xl mx-auto py-8">
                <PageTitle heading="My Orders" text={`${orders.length} order${orders.length !== 1 ? 's' : ''} placed`} path="/" linkText="Go to home" />
                <div className="mt-6">
                    {orders.map(order => (
                        <OrderItem order={order} key={order.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}
