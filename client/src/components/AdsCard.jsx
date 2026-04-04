import React from 'react'
import { assets } from '../assets/assets'

const AdsCard = () => {
  return (
    <div className='bg-linear-to-br flex flex-col md:flex-row from-blue-400 to-blue-600 w-full h-fit rounded-lg items-center justify-between'>
        <div className='p-5'>
            <span>Limited Time Offer</span>
            <h3 className='text-2xl font-bold'>SPLIT YOUR BILLS WITH <br /> 10% OFF</h3>
        </div>
        <img loading="lazy" className='h-50 md:h-35 justify-end' src={assets.ad1} alt="ads" />
    </div>
  )
}

export default AdsCard