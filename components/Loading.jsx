'use client'

const Loading = () => {
    return (
        <div className='flex items-center justify-center min-h-screen bg-white dark:bg-slate-900'>
            <div className='flex flex-col items-center gap-4'>
                <div className='w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700 border-t-green-500 animate-spin' />
                <p className='text-sm text-slate-400 dark:text-slate-500 animate-pulse'>Loading...</p>
            </div>
        </div>
    )
}

export default Loading
