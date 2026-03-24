import React from 'react'
import { assets } from '../../assets/assets'
import { IoClose } from "react-icons/io5";

const ChoosePeoples = () => {
    return (
        <div className='w-full max-w-md flex flex-col gap-5'>
            <div className='flex items-center gap-2 text-xs'>
                <div className='
                    w-6 h-6 rounded-full 
                    bg-blue-500 text-white 
                    flex items-center justify-center
                    font-medium
                '>2</div>

                <span className='text-[var(--text-dull)]'>of</span>

                <div className='
                    w-6 h-6 rounded-full 
                    bg-[var(--bg-card-hover)] 
                    text-[var(--text)]
                    flex items-center justify-center
                '>4</div>
            </div>
            <div>
                <h3 className='text-2xl md:text-3xl font-semibold leading-snug'>
                    Choose people <br className='hidden sm:block' /> in this split.
                </h3>

                <p className='text-sm text-[var(--text-dull)] mt-1'>
                    Search for a name in your list
                </p>
            </div>
        </div>
    )
}

export default ChoosePeoples