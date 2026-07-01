'use client'
import React from 'react'
import toast from 'react-hot-toast';

export default function Banner() {
    const [isOpen, setIsOpen] = React.useState(true);

    const handleClaim = () => {
        setIsOpen(false);
        toast.success('Coupon NEW20 copied to clipboard!');
        navigator.clipboard.writeText('NEW20');
    };

    return isOpen && (
        <div className="w-full px-6 py-2 font-medium text-sm text-white text-center bg-gradient-to-r from-violet-500 via-purple-600 to-orange-400">
            <div className='flex items-center justify-between max-w-7xl mx-auto gap-4'>
                <p className="flex-1 text-center">🎉 Get <span className="font-bold">20% OFF</span> on Your First Order! Use code <span className="font-bold underline">NEW20</span></p>
                <div className="flex items-center gap-4 shrink-0">
                    <button onClick={handleClaim} type="button" className="font-semibold text-purple-700 bg-white px-5 py-1.5 rounded-full hover:scale-105 active:scale-95 transition max-sm:hidden text-xs">
                        Claim Offer
                    </button>
                    <button onClick={() => setIsOpen(false)} type="button" className="text-white/80 hover:text-white transition p-1">
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="12.532" width="17.498" height="2.1" rx="1.05" transform="rotate(-45.74 0 12.532)" fill="currentColor" />
                            <rect x="12.533" y="13.915" width="17.498" height="2.1" rx="1.05" transform="rotate(-135.74 12.533 13.915)" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
