import React from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'

const OurSpecs = () => {
    return (
        <div className='px-6 my-20 max-w-6xl mx-auto'>
            <Title
                visibleButton={false}
                title='Why Choose GoCart?'
                description="We offer top-tier service and convenience to ensure your shopping experience is smooth, secure, and completely hassle-free."
            />
            <div className='grid grid-cols-1 md:grid-cols-3 gap-7 mt-20'>
                {ourSpecsData.map((spec, index) => (
                    <div
                        key={index}
                        className='relative h-52 px-8 flex flex-col items-center justify-center w-full text-center border rounded-2xl group hover:shadow-lg transition-all duration-300 dark:border-slate-700'
                        style={{ backgroundColor: spec.accent + '15', borderColor: spec.accent + '40' }}
                    >
                        <h3 className='text-slate-800 dark:text-slate-100 font-semibold text-lg mt-4'>{spec.title}</h3>
                        <p className='text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed'>{spec.description}</p>
                        <div
                            className='absolute -top-6 text-white size-12 flex items-center justify-center rounded-2xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-lg'
                            style={{ backgroundColor: spec.accent }}
                        >
                            <spec.icon size={22} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OurSpecs
