import React from 'react'
import { assets } from '../assets/assets'

const SplitCard = () => {
  const profile = [
    assets.p1, assets.p2, assets.p3, assets.p4
  ]
  return (
    <div className='
      w-full rounded-2xl p-5 text-white
      bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]
      shadow-[0_10px_30px_rgba(0,0,0,0.4)]
      hover:scale-[1.02] transition-all duration-300
      relative overflow-hidden
    '>

      {/* 🔹 Subtle Light Overlay */}
      <div className='absolute inset-0 bg-white/5 pointer-events-none'></div>

      {/* 🔹 User */}
      <div className='flex items-center gap-2 mb-3 relative z-10'>
        <div className='w-6 h-6 rounded-full overflow-hidden'>
          <img className='w-full h-full object-cover' src={assets.p1} alt="" />
        </div>
        <span className='text-sm text-white/80 font-medium'>User</span>
      </div>

      {/* 🔹 Title */}
      <h3 className='text-lg font-semibold relative z-10'>
        Birthday Preps
      </h3>

      {/* 🔹 Amount */}
      <h1 className='text-3xl font-bold mt-1 tracking-tight relative z-10'>
        $725
      </h1>

      {/* 🔹 Progress Bar */}
      <div className='w-full h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden relative z-10'>
        <div className='
          w-[70%] h-full rounded-full
          bg-gradient-to-r from-cyan-300 to-blue-400
          shadow-[0_0_10px_rgba(56,189,248,0.6)]
        '></div>
      </div>

      {/* 🔹 Avatars + Status */}
      <div className='flex items-center justify-between mt-4 relative z-10'>

        <div className='flex -space-x-2'>
          {profile.map((img, index) => (
            <div
              key={index}
              className='w-7 h-7 rounded-full border-2 border-white overflow-hidden'
            >
              <img className='w-full h-full object-cover' src={img} alt="" />
            </div>
          ))}
        </div>

        <span className='text-sm text-white/80 font-medium'>
          4/5 paid
        </span>
      </div>

      {/* 🔹 Button */}
      <button className='
        w-full mt-5 py-2.5 rounded-xl
        bg-white text-black font-medium
        hover:bg-gray-200 active:scale-95
        transition-all duration-200 cursor-pointer
      '>
        Pay
      </button>

    </div>
  )
}

export default SplitCard