import React from 'react'
import { MdOutlineAdd } from "react-icons/md";
import { UtensilsCrossed } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const MonthlyLimit = () => {

    const {navigate} = useAppContext();

    return (
        <div className='flex flex-col  gap-3 p-6 bg-[var(--bg-card)]/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-[var(--border)] '>
            <div className='flex items-center justify-between md:justify-start md:gap-5'>
                <div className='flex flex-col'>
                    <h4 className='font-semibold text-3xl'>
                        Set Monthly Limit
                    </h4>
                    <span className='text-sm text-[var(--text-dull)]'>
                        Manage your spending habits
                    </span>
                </div>
                <button onClick={()=>navigate('/add-limit')} className='bg-[var(--primary)] hover:opacity-90 transition p-3 rounded-xl flex items-center justify-center cursor-pointer'>
                    <MdOutlineAdd className='text-xl text-white' />
                </button>
            </div>
            <div className='py-5'>
                <div
                    className='w-full p-5 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 
                    backdrop-blur-md border border-[var(--border)] 
                    opacity-70 pointer-events-none select-none shadow-[0_0_30px_rgba(59,130,246,0.1)]'

                    style={{
                        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 15%, rgba(0,0,0,0))",
                        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 40%, rgba(0,0,0,0))"
                    }}
                >

                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            <div className='bg-rose-400/40 p-3 rounded-lg'>
                                <UtensilsCrossed />
                            </div>
                            <span>Food</span>
                        </div>

                        <span className='flex flex-col'>
                            ₹750
                            <span className='text-xs text-[var(--text-dull)]'>of ₹1000</span>
                        </span>
                    </div>

                    <div className='w-full h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden'>
                        <div className='h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-400 w-[70%]' />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MonthlyLimit