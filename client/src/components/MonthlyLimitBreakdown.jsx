import React, { useMemo } from 'react'
import { UtensilsCrossed } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const MonthlyLimitBreakdown = () => {

    const {monthlyLimit} = useAppContext();

    const processedData = useMemo(()=>{
        return monthlyLimit.map(item =>({
            ...item,
            percentage: Math.min((item.spent / item.limit) * 100, 100)
        }));
        
    },[monthlyLimit]);

    return (
        <div className='flex flex-col gap-3'>
            <h6>Breakdown</h6>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                {processedData.map((item, index)=>(
                    <div key={index} className='w-full p-5 rounded-xl bg-gradient-to-br from-white/5 via-white/5 to-white/10
                        backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
                    >
                        <div className='flex items-center justify-between'>

                            <div className='flex items-center gap-3'>
                                <div className='bg-gradient-to-br from-rose-400/30 to-rose-500/20 p-3 rounded-xl border border-white/10'>
                                    <UtensilsCrossed className='text-rose-300' size={18} />
                                </div>
                                <span className='text-white/90 font-medium'>{item.category}</span>
                            </div>

                            <span className='flex flex-col text-right'>
                                <span className='text-white font-semibold'>₹{item.spent}</span>
                                <span className='text-xs text-white/50'>of ₹{item.limit}</span>
                            </span>
                        </div>

                        <div className='w-full h-1.5 bg-white/10 rounded-full mt-4 overflow-hidden'>
                            <div className='h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400
                                shadow-[0_0_12px_rgba(56,189,248,0.6)]'
                                style={{ width: `${item.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MonthlyLimitBreakdown