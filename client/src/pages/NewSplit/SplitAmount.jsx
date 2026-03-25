import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

const SplitAmount = () => {
    const {navigate}=useAppContext();

    const [splitValue, setSplitValue] = useState('equal');

    const handleSubmit=()=>{
        navigate('/home');
    }
    return (
        <div className='w-full max-w-md flex flex-col gap-5'>
            <FaArrowLeft onClick={() => navigate(-1)} className='text-xl text-[var(--text)] hover:text-[var(--text-dull)] cursor-pointer' />
            <div className='flex items-center gap-2 text-xs'>
                <div className='
                            w-6 h-6 rounded-full 
                            bg-blue-500 text-white 
                            flex items-center justify-center
                            font-medium
                        '>3</div>

                <span className='text-[var(--text-dull)]'>of</span>

                <div className='
                            w-6 h-6 rounded-full 
                            bg-[var(--bg-card-hover)] 
                            text-[var(--text)]
                            flex items-center justify-center
                        '>3</div>
            </div>
            <div>
                <h3 className='text-2xl md:text-3xl font-semibold leading-snug'>
                    How do you <br className='hidden sm:block' /> want to split.
                </h3>

                {splitValue === 'equal'?
                    <p className='text-sm text-[var(--text-dull)] mt-1'>
                        Split equally between all members
                    </p> :
                    <p className='text-sm text-[var(--text-dull)] mt-1'>
                        Split custom between all members
                    </p>
                }

            </div>
            <div className='flex gap-1'>
                <button onClick={()=>setSplitValue('equal')} className={`px-5 py-1 ${splitValue === 'equal' ? "bg-[var(--primary)]" : "bg-[var(--text-dull)] text-black"} rounded-lg cursor-pointer`}>Equal</button>
                <button onClick={()=>setSplitValue('custom')} className={`px-5 py-1 ${splitValue === 'custom' ? "bg-[var(--primary)]" : "bg-[var(--text-dull)] text-black"} rounded-lg cursor-pointer`}>Custom</button>
            </div>

            <div className='bg-[var(--bg-card)] max-h-59 flex flex-col gap-1 p-3 overflow-scroll no-scrollbar rounded-lg'>
                <div className='flex items-center gap-3 p-1 cursor-pointer'>

                    <div className='w-11 h-11 rounded-full overflow-hidden flex-shrink-0'>
                        <img className='w-full h-full object-cover' src={assets.p1} alt="" />
                    </div>

                    <div className='flex justify-between items-center w-full'>
                        <span className='text-sm truncate'>Mac</span>
                        { splitValue === 'equal' ?
                            <span className='text-sm font-medium whitespace-nowrap'>₹100</span>
                            :
                            <input className='focus:outline-none' type="text" placeholder='Amount' />
                        }
                    </div>

                </div>

            </div>
            <button onClick={handleSubmit} className='w-full py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600
                            text-white font-medium hover:opacity-90 active:scale-95 transition-all duration-200
                            shadow-[0_5px_15px_rgba(59,130,246,0.4)] cursor-pointer'>
                Send Request
            </button>
        </div>
    )
}

export default SplitAmount