'use client'
import { PlusIcon, SquarePenIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react'
import AddressModal from './AddressModal';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OrderSummary = ({ totalPrice, items }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$';
    const router = useRouter();
    const addressList = useSelector(state => state.address.list);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [coupon, setCoupon] = useState('');

    const handleCouponCode = async (event) => {
        event.preventDefault();
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        router.push('/orders')
    }

    return (
        <div className='w-full max-w-lg lg:max-w-[340px] bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm rounded-2xl p-6'>
            <h2 className='text-xl font-semibold text-slate-800 dark:text-slate-100 mb-5'>Payment Summary</h2>

            {/* Payment Method */}
            <div className='mb-4'>
                <p className='text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2'>Payment Method</p>
                <div className='space-y-2'>
                    {['COD', 'STRIPE'].map(method => (
                        <label key={method} className='flex items-center gap-2.5 cursor-pointer'>
                            <input
                                type="radio"
                                id={method}
                                name="payment"
                                onChange={() => setPaymentMethod(method)}
                                checked={paymentMethod === method}
                                className='accent-green-500 cursor-pointer'
                            />
                            <span className='text-slate-700 dark:text-slate-300'>
                                {method === 'COD' ? 'Cash on Delivery' : 'Stripe Payment'}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Address */}
            <div className='py-4 border-y border-slate-200 dark:border-slate-700 mb-4'>
                <p className='text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2'>Delivery Address</p>
                {selectedAddress ? (
                    <div className='flex gap-2 items-start'>
                        <p className='flex-1 text-slate-700 dark:text-slate-300 text-sm'>
                            {selectedAddress.name}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zip}
                        </p>
                        <button onClick={() => setSelectedAddress(null)} className='text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition shrink-0'>
                            <SquarePenIcon size={16} />
                        </button>
                    </div>
                ) : (
                    <div>
                        {addressList.length > 0 && (
                            <select
                                className='border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 p-2 w-full my-2 outline-none rounded-xl text-sm'
                                onChange={(e) => setSelectedAddress(addressList[e.target.value])}
                            >
                                <option value="">Select Address</option>
                                {addressList.map((address, index) => (
                                    <option key={index} value={index}>
                                        {address.name}, {address.city}, {address.state}
                                    </option>
                                ))}
                            </select>
                        )}
                        <button
                            className='flex items-center gap-1 text-green-500 dark:text-green-400 text-sm hover:text-green-600 transition mt-1'
                            onClick={() => setShowAddressModal(true)}
                        >
                            <PlusIcon size={16} /> Add New Address
                        </button>
                    </div>
                )}
            </div>

            {/* Price Breakdown */}
            <div className='space-y-2 pb-4 border-b border-slate-200 dark:border-slate-700 mb-4'>
                <div className='flex justify-between text-sm'>
                    <span className='text-slate-500 dark:text-slate-400'>Subtotal</span>
                    <span className='font-medium text-slate-800 dark:text-slate-200'>{currency}{totalPrice.toLocaleString()}</span>
                </div>
                <div className='flex justify-between text-sm'>
                    <span className='text-slate-500 dark:text-slate-400'>Shipping</span>
                    <span className='text-green-500 font-medium'>Free</span>
                </div>
                {coupon && (
                    <div className='flex justify-between text-sm'>
                        <span className='text-slate-500 dark:text-slate-400'>Coupon ({coupon.code})</span>
                        <span className='text-red-500 font-medium'>-{currency}{(coupon.discount / 100 * totalPrice).toFixed(2)}</span>
                    </div>
                )}

                {/* Coupon Input */}
                {!coupon ? (
                    <form onSubmit={e => toast.promise(handleCouponCode(e), { loading: 'Checking coupon...' })} className='flex gap-2 mt-3'>
                        <input
                            onChange={(e) => setCouponCodeInput(e.target.value)}
                            value={couponCodeInput}
                            type="text"
                            placeholder='Coupon code'
                            className='border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 p-2 rounded-xl w-full outline-none text-sm focus:border-green-400 transition'
                        />
                        <button className='bg-slate-700 dark:bg-slate-600 text-white px-4 rounded-xl text-sm hover:bg-slate-800 dark:hover:bg-slate-500 active:scale-95 transition'>
                            Apply
                        </button>
                    </form>
                ) : (
                    <div className='flex items-center justify-between bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl px-3 py-2 mt-2 text-xs'>
                        <span className='text-green-700 dark:text-green-300 font-medium'>{coupon.code.toUpperCase()} — {coupon.description}</span>
                        <button onClick={() => setCoupon('')} className='text-slate-400 hover:text-red-500 transition ml-2'>
                            <XIcon size={14} />
                        </button>
                    </div>
                )}
            </div>

            <div className='flex justify-between text-base font-semibold text-slate-800 dark:text-slate-100 mb-5'>
                <span>Total</span>
                <span>{currency}{coupon ? (totalPrice - (coupon.discount / 100 * totalPrice)).toFixed(2) : totalPrice.toLocaleString()}</span>
            </div>

            <button
                onClick={e => toast.promise(handlePlaceOrder(e), { loading: 'Placing order...' })}
                className='w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] active:scale-95 transition-all'
            >
                Place Order
            </button>

            {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}
        </div>
    )
}

export default OrderSummary
