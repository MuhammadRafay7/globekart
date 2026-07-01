'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Title = ({ title, description, visibleButton = true, href = '' }) => {
    return (
        <div className='flex flex-col items-center text-center'>
            <h2 className='text-2xl sm:text-3xl font-semibold text-slate-800 dark:text-slate-100'>{title}</h2>
            <div className='flex items-center gap-5 text-sm text-slate-500 dark:text-slate-400 mt-2'>
                <p className='max-w-lg'>{description}</p>
                {visibleButton && href && (
                    <Link href={href} className='text-green-500 dark:text-green-400 flex items-center gap-1 shrink-0 hover:gap-2 transition-all font-medium'>
                        View more <ArrowRight size={14} />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Title
