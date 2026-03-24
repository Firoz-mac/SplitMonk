import React from 'react'
import { useAppContext } from '../../context/AppContext'

const NewSplit = () => {

    const {navigate} = useAppContext();

    const handleClick=()=>{
        navigate('/choose')
    }
    return (
        <div className='w-full max-w-md flex flex-col gap-5'>

            <div className='flex items-center gap-2 text-xs'>
                <div className='
                    w-6 h-6 rounded-full 
                    bg-blue-500 text-white 
                    flex items-center justify-center
                    font-medium
                '>1</div>

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
                    What are you <br className='hidden sm:block' /> splitting?
                </h3>

                <p className='text-sm text-[var(--text-dull)] mt-1'>
                    Add a name so it's easy to remember later
                </p>
            </div>

            <div className="flex flex-col gap-3">

                <input
                    type='text'
                    placeholder="e.g. Birthday Party"
                    className="
                        w-full py-3 px-4 rounded-xl
                        bg-[var(--bg-card)] border border-[var(--border)]
                        text-[var(--text)] placeholder:text-[var(--text-dull)]
                        focus:outline-none focus:border-blue-500
                        focus:ring-2 focus:ring-blue-500/20
                        transition
                    "
                />

                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-dull)]">
                        ₹
                    </span>

                    <input
                        type='number'
                        placeholder="0.00"
                        className="
                            w-full py-3 pl-8 pr-4 rounded-xl
                            bg-[var(--bg-card)] border border-[var(--border)]
                            text-[var(--text)]
                            focus:outline-none focus:border-blue-500
                            focus:ring-2 focus:ring-blue-500/20
                            transition
                        "
                    />
                </div>

            </div>

            <button onClick={handleClick} className='
                w-full py-3 rounded-xl
                bg-gradient-to-br from-blue-500 to-blue-600
                text-white font-medium
                hover:opacity-90 active:scale-95
                transition-all duration-200
                shadow-[0_5px_15px_rgba(59,130,246,0.4)]
            '>
                Continue
            </button>

        </div>
    )
}

export default NewSplit