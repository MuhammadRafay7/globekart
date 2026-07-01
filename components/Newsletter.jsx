'use client'
import React, { useState } from 'react'
import Title from './Title'
import toast from 'react-hot-toast'

const Newsletter = () => {
    const [email, setEmail] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email) {
            toast.success('Subscribed successfully! 🎉')
            setEmail('')
        }
    }

    return (
        <div className='flex flex-col items-center mx-4 my-24 sm:my-36'>
            <div className='w-full max-w-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/50 border border-green-100 dark:border-slate-700 rounded-3xl p-8 sm:p-12 text-center'>
                <Title
                    title="Join Our Newsletter"
                    description="Subscribe for exclusive deals, new arrivals, and insider updates delivered to your inbox every week."
                    visibleButton={false}
                />
                <form onSubmit={handleSubmit} className='flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-sm p-1.5 rounded-full w-full mt-8 shadow-sm'>
                    <input
                        className='flex-1 pl-5 outline-none bg-transparent text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500'
                        type="email"
                        placeholder='Enter your email address'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className='font-medium bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 hover:scale-105 active:scale-95 transition-all'
                    >
                        Subscribe
                    </button>
                </form>
                <p className='text-xs text-slate-400 dark:text-slate-500 mt-3'>No spam, unsubscribe anytime.</p>
            </div>
        </div>
    )
}

export default Newsletter
