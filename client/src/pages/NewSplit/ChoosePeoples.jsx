import React from 'react'
import { assets } from '../../assets/assets'
import { IoClose } from "react-icons/io5";
import { useAppContext } from '../../context/AppContext';
import { FaArrowLeft } from "react-icons/fa6";

const ChoosePeoples = () => {

    const {navigate} = useAppContext();

    const profile = [
        assets.p1, assets.p2, assets.p3, assets.p4
    ]

    const handleClick=()=>{
        navigate('/split-amount');
    }

    return (
        <div className='w-full max-w-md flex flex-col gap-5'>
            <FaArrowLeft onClick={()=>navigate(-1)} className='text-xl text-[var(--text)] hover:text-[var(--text-dull)] cursor-pointer'/>
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
                '>3</div>
            </div>
            <div>
                <h3 className='text-2xl md:text-3xl font-semibold leading-snug'>
                    Choose people <br className='hidden sm:block' /> in this split.
                </h3>

                <p className='text-sm text-[var(--text-dull)] mt-1'>
                    Search for a name in your list
                </p>
            </div>

            <div className='flex flex-wrap gap-2 max-w-full'>
                {profile.map((img, index)=>(
                    <div key={index} className='flex flex-col w-fit items-center gap-1'>
                        <div className='relative'>
                            <div className='w-12 h-12 rounded-full overflow-hidden'>
                                <img className='w-full h-full object-cover' src={img} alt="" />
                            </div>
                            <div className='absolute top-0 right-0 w-5 h-5 rounded-full flex items-center justify-center
                        bg-gray-500 text-white text-xs cursor-pointer'>
                                <IoClose size={12} />
                            </div>
                        </div>
                        <span className='text-xs'>Mac</span>
                    </div>
                ))}
            </div>

            <input
                type='text'
                placeholder="User Name"
                className="
                        w-full py-3 px-4 rounded-xl
                        bg-[var(--bg-card)] border border-[var(--border)]
                        text-[var(--text)] placeholder:text-[var(--text-dull)]
                        focus:outline-none focus:border-blue-500
                        focus:ring-2 focus:ring-blue-500/20
                        transition
                    "
            />

            <div className='bg-[var(--bg-card)] h-42 flex flex-col gap-1 p-3 overflow-scroll no-scrollbar rounded-lg'>
                <div className=' flex items-center gap-2 cursor-pointer py-1'>
                    <div className='w-11 h-11 rounded-full overflow-hidden'>
                        <img className='w-full h-full object-cover' src={assets.p1} alt="" />
                    </div>
                    <span className='text-sm'>Mac</span>
                </div>
                <div className=' flex items-center gap-2 cursor-pointer'>
                    <div className='w-12 h-12 rounded-full overflow-hidden'>
                        <img className='w-full h-full object-cover' src={assets.p1} alt="" />
                    </div>
                    <span className='text-sm'>Mac</span>
                </div>
                <div className=' flex items-center gap-2 cursor-pointer'>
                    <div className='w-12 h-12 rounded-full overflow-hidden'>
                        <img className='w-full h-full object-cover' src={assets.p1} alt="" />
                    </div>
                    <span className='text-sm'>Mac</span>
                </div>
                <div className=' flex items-center gap-2 cursor-pointer'>
                    <div className='w-12 h-12 rounded-full overflow-hidden'>
                        <img className='w-full h-full object-cover' src={assets.p1} alt="" />
                    </div>
                    <span className='text-sm'>Mac</span>
                </div>

            </div>
            <button onClick={handleClick} className='w-full py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600
                text-white font-medium hover:opacity-90 active:scale-95 transition-all duration-200
                shadow-[0_5px_15px_rgba(59,130,246,0.4)] cursor-pointer'>
                Continue
            </button>
        </div>
    )
}

export default ChoosePeoples