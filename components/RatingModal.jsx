'use client'
import { Star, XIcon } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

const RatingModal = ({ ratingModal, setRatingModal }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [hovered, setHovered] = useState(0);

    const handleSubmit = async () => {
        if (rating < 1 || rating > 5) return toast('Please select a rating');
        if (review.length < 5) return toast('Please write a short review');
        setRatingModal(null);
        toast.success('Review submitted!');
    }

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-6'>
            <div className='bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-sm p-7 relative'>
                <button
                    onClick={() => setRatingModal(null)}
                    className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition'
                >
                    <XIcon size={18} />
                </button>

                <h2 className='text-xl font-semibold text-slate-800 dark:text-slate-100 mb-1'>Rate Product</h2>
                <p className='text-sm text-slate-400 dark:text-slate-500 mb-5'>Share your experience with other shoppers</p>

                <div className='flex items-center justify-center gap-1 mb-6'>
                    {Array.from({ length: 5 }, (_, i) => (
                        <button
                            key={i}
                            onMouseEnter={() => setHovered(i + 1)}
                            onMouseLeave={() => setHovered(0)}
                            onClick={() => setRating(i + 1)}
                            className='p-1'
                        >
                            <Star
                                size={32}
                                className={`transition-all ${(hovered || rating) > i ? "text-yellow-400 fill-yellow-400 scale-110" : "text-slate-300 dark:text-slate-600"}`}
                            />
                        </button>
                    ))}
                </div>
                {rating > 0 && (
                    <p className='text-center text-sm text-slate-500 dark:text-slate-400 mb-4'>
                        {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                    </p>
                )}

                <textarea
                    className='w-full p-3 border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 rounded-xl mb-4 outline-none focus:border-green-400 transition resize-none text-sm'
                    placeholder='Write your review...'
                    rows={4}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                />

                <button
                    onClick={e => toast.promise(handleSubmit(), { loading: 'Submitting...' })}
                    className='w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] active:scale-95 transition-all'
                >
                    Submit Review
                </button>
            </div>
        </div>
    )
}

export default RatingModal
