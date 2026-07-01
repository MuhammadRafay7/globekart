'use client'
import { addToCart, removeFromCart } from "@/lib/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Counter = ({ productId }) => {
    const { cartItems } = useSelector(state => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <button
                onClick={() => dispatch(removeFromCart({ productId }))}
                className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-lg font-medium select-none transition"
            >
                −
            </button>
            <span className="w-6 text-center font-semibold text-sm">{cartItems[productId] || 0}</span>
            <button
                onClick={() => dispatch(addToCart({ productId }))}
                className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-lg font-medium select-none transition"
            >
                +
            </button>
        </div>
    )
}

export default Counter
