import React from 'react'
import { useAppContext } from '../context/AppContext'

const NewExpenses = () => {
    const {navigate} = useAppContext();
    const handleClick=()=>{
        navigate('/home')
    }
  return (
    <div className='w-full max-w-md flex flex-col gap-5'>
        <h3 className='text-3xl font-medium'>Track a new <br /> spending record</h3>
        <div className='flex flex-col gap-2'>
            <input type='text' placeholder="What was it for?"
                    className="w-full py-3 px-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]
                        text-[var(--text)] placeholder:text-[var(--text-dull)] focus:outline-none focus:border-blue-500
                        focus:ring-2 focus:ring-blue-500/20 transition"/>
            <input type='text' placeholder="How much?"
                    className="w-full py-3 px-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]
                        text-[var(--text)] placeholder:text-[var(--text-dull)] focus:outline-none focus:border-blue-500
                        focus:ring-2 focus:ring-blue-500/20 transition"/>
        </div>
        <button onClick={handleClick} className='w-full py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600
                text-white font-medium hover:opacity-90 active:scale-95 transition-all duration-200
                shadow-[0_5px_15px_rgba(59,130,246,0.4)]'>
                Add
        </button>
        <div className='flex flex-col w-full gap-2 max-h-75 overflow-scroll no-scrollbar'>
            <div className='flex items-center justify-between w-full'>
                <span className='text-sm'>Recent</span>
                <span className='text-sm cursor-pointer text-[var(--text)] hover:text-[var(--text-dull)]'>View all</span>
            </div>
            <div className='flex flex-col p-4 bg-[var(--bg-card)] rounded-lg'>
                <span>Birthday Party</span>
                <span>₹1200</span>
            </div>
            <div className='flex flex-col p-4 bg-[var(--bg-card)] rounded-lg'>
                <span>Birthday Party</span>
                <span>₹1200</span>
            </div>
            <div className='flex flex-col p-4 bg-[var(--bg-card)] rounded-lg'>
                <span>Birthday Party</span>
                <span>₹1200</span>
            </div>
            <div className='flex flex-col p-4 bg-[var(--bg-card)] rounded-lg'>
                <span>Birthday Party</span>
                <span>₹1200</span>
            </div>
        </div>
    </div>
  )
}

export default NewExpenses