'use client'
import Image from "next/image";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import { useState } from "react";
import RatingModal from "./RatingModal";

const statusStyles = {
    DELIVERED: 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
    CONFIRMED: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300',
    PENDING: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
    CANCELLED: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
}

const OrderItem = ({ order }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const [ratingModal, setRatingModal] = useState(null);
    const { ratings } = useSelector(state => state.rating);

    const statusClass = statusStyles[order.status] || statusStyles.PENDING

    return (
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden mb-4">
            {/* Order Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700 flex-wrap gap-3">
                <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Order ID</p>
                    <p className="text-xs font-mono text-slate-600 dark:text-slate-300">{order.id.slice(0, 24)}...</p>
                </div>
                <div className="flex items-center gap-4">
                    <div>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Date</p>
                        <p className="text-xs text-slate-600 dark:text-slate-300">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Total</p>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{currency}{order.total}</p>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusClass}`}>
                        {order.status.replace(/_/g, ' ')}
                    </span>
                </div>
            </div>

            {/* Order Items */}
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
                {order.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center gap-4 px-5 py-4">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center shrink-0">
                            <Image className="h-12 w-auto object-contain" src={item.product.images[0]} alt={item.product.name} width={48} height={48} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-slate-800 dark:text-slate-100 truncate">{item.product.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{currency}{item.price} × {item.quantity}</p>
                            <div className="mt-1">
                                {ratings.find(r => order.id === r.orderId && item.product.id === r.productId)
                                    ? <Rating value={ratings.find(r => order.id === r.orderId && item.product.id === r.productId).rating} />
                                    : order.status === 'DELIVERED' && (
                                        <button
                                            onClick={() => setRatingModal({ orderId: order.id, productId: item.product.id })}
                                            className="text-xs text-green-500 dark:text-green-400 hover:text-green-600 font-medium transition"
                                        >
                                            ★ Rate this product
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="font-semibold text-slate-800 dark:text-slate-100">{currency}{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Address */}
            <div className="px-5 py-3 bg-slate-50 dark:bg-slate-700/30 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-600 dark:text-slate-300">Delivery: </span>
                {order.address.name}, {order.address.street}, {order.address.city}, {order.address.state} {order.address.zip}
            </div>

            {ratingModal && <RatingModal ratingModal={ratingModal} setRatingModal={setRatingModal} />}
        </div>
    )
}

export default OrderItem
