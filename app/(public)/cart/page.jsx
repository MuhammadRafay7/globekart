'use client'
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { ShoppingCart, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const { cartItems } = useSelector(state => state.cart);
    const products = useSelector(state => state.product.list);
    const dispatch = useDispatch();

    const [cartArray, setCartArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const createCartArray = () => {
        let total = 0;
        const arr = [];
        for (const [key, value] of Object.entries(cartItems)) {
            const product = products.find(p => p.id === key);
            if (product) {
                arr.push({ ...product, quantity: value });
                total += product.price * value;
            }
        }
        setCartArray(arr);
        setTotalPrice(total);
    };

    useEffect(() => {
        if (products.length > 0) createCartArray();
    }, [cartItems, products]);

    if (cartArray.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center gap-5 text-center px-6 bg-white dark:bg-slate-900">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <ShoppingCart size={40} className="text-slate-400 dark:text-slate-500" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100">Your cart is empty</h1>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm">Add items to your cart and they will appear here.</p>
                <Link href="/shop" className="px-8 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 hover:scale-105 active:scale-95 transition-all">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen mx-6 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto">
                <PageTitle heading="My Cart" text={`${cartArray.length} item${cartArray.length !== 1 ? 's' : ''} in your cart`} path="/shop" linkText="Continue shopping" />

                <div className="flex items-start justify-between gap-8 max-lg:flex-col mb-16">
                    {/* Cart Items */}
                    <div className="flex-1 w-full">
                        <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 pb-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">
                            <span>Product</span>
                            <span className="text-center">Qty</span>
                            <span className="text-center">Total</span>
                            <span className="text-center">Remove</span>
                        </div>
                        <div className="space-y-3">
                            {cartArray.map((item) => (
                                <div key={item.id} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_auto_auto] gap-4 items-center bg-slate-50 dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-slate-700 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-600">
                                            <Image src={item.images[0]} className="max-h-14 w-auto object-contain" alt={item.name} width={56} height={56} />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800 dark:text-slate-100 text-sm">{item.name}</p>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.category}</p>
                                            <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-1">{currency}{item.price}</p>
                                        </div>
                                    </div>
                                    <Counter productId={item.id} />
                                    <div className="hidden sm:block text-center font-semibold text-slate-800 dark:text-slate-100">
                                        {currency}{(item.price * item.quantity).toLocaleString()}
                                    </div>
                                    <div className="hidden sm:flex justify-center">
                                        <button
                                            onClick={() => dispatch(deleteItemFromCart({ productId: item.id }))}
                                            className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition"
                                        >
                                            <Trash2Icon size={16} />
                                        </button>
                                    </div>
                                    {/* Mobile: show total + remove inline */}
                                    <div className="sm:hidden flex flex-col items-end gap-2">
                                        <span className="font-semibold text-sm">{currency}{(item.price * item.quantity).toLocaleString()}</span>
                                        <button
                                            onClick={() => dispatch(deleteItemFromCart({ productId: item.id }))}
                                            className="text-red-400 p-1"
                                        >
                                            <Trash2Icon size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <OrderSummary totalPrice={totalPrice} items={cartArray} />
                </div>
            </div>
        </div>
    );
}
