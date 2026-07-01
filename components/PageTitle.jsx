'use client'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

const PageTitle = ({ heading, text, path = '/', linkText }) => {
    return (
        <div className="my-6">
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-100">{heading}</h2>
            <div className="flex items-center gap-3 mt-1">
                <p className="text-sm text-slate-500 dark:text-slate-400">{text}</p>
                {linkText && (
                    <Link href={path} className="flex items-center gap-1 text-green-500 dark:text-green-400 text-sm font-medium hover:gap-2 transition-all">
                        {linkText} <ArrowRightIcon size={14} />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default PageTitle
