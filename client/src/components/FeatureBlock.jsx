import React from 'react'
import { assets } from '../assets/assets'
import { ArrowUpRight } from 'lucide-react';

const FeatureBlock = ({ title, subTitle, img, features, reverse }) => {
    return (
        <div className={`flex flex-col justify-between ${reverse ? 'md:flex-row-reverse' : ''} gap-10 md:flex-row py-30 md:px-60`}>
            <div className='flex justify-center'>
                <img className='w-50' src={img} alt="" />
            </div>
            <div className='flex flex-col justify-center max-w-sm gap-5'>
                <h4 className='text-2xl font-medium md:text-4xl'>{title}</h4>
                <p>{subTitle}</p>
                <div className='flex flex-col gap-3'>
                    {features.map((text, i) => (
                        <div key={i} className='flex items-center gap-2'>
                            <img className='h-7 w-7' src={assets.check} alt="" />
                            <p>{text}</p>
                        </div>
                    ))}
                </div>
                <div className='flex w-fit items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 
                                text-white px-2 py-1 rounded-full shadow-md cursor-pointer hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] 
                                transition-all duration-300'>

                    <span className='text-xs'>Get Started</span>

                    <div className='p-1 rounded-full bg-white/20'>
                        <ArrowUpRight className='w-4 h-4' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureBlock