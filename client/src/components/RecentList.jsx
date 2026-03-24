import React from 'react'
import { MdOutlineAdd } from "react-icons/md";
import { assets } from '../assets/assets';

const RecentList = () => {

    const profile = [
        assets.p1, assets.p2, assets.p3, assets.p4
    ]
  return (
    <div className='w-full p-4 rounded-2xl flex items-center gap-4 bg-[var(--bg-card)] 
            border border-white/5 overflow-x-auto no-scrollbar'>

            <div className='flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center
                bg-gradient-to-br from-[#1f2937] to-[#111827] shadow-inner shadow-black/40
                hover:scale-105 transition-all cursor-pointer'>
                <MdOutlineAdd className="text-gray-300 text-xl" />
            </div>

            {profile.map((img, index) => (
                <div key={index} className='flex-shrink-0 group cursor-pointer'>
                    <div className='p-[2px] rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500
                        group-hover:scale-105 transition'>
                        <div className='w-14 h-14 rounded-full overflow-hidden bg-black'>
                            <img src={img} alt="" className='w-full h-full object-cover'/>
                        </div>
                    </div>
                </div>
            ))}

        </div>
  )
}

export default RecentList