import React from 'react'
import { BsStars } from "react-icons/bs";

const AdsCard = () => {
  return (
    <div className='relative overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 
      backdrop-blur-md p-6 rounded-2xl border border-[var(--border)]'>
      <div className='absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 blur-3xl'></div>
      <div className='flex items-start gap-4'>
        <div className='bg-[var(--primary)]/20 text-[var(--primary)] 
          p-3 rounded-xl'>
          <BsStars className='text-xl' />
        </div>

        <div className='flex flex-col gap-1'>
          <span className='text-xs font-semibold text-blue-400 uppercase tracking-wide'>
            Limited Time Offer
          </span>
          <p className='text-sm text-[var(--text)] font-medium'>
            Refer a friend and earn ₹120 credit
          </p>
          <p className='text-xs text-[var(--text-dull)]'>
            Use it toward your next subscription.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdsCard