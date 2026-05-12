import React, { useEffect, useState } from 'react'
import SplitCard from '../components/SplitCard';
import { useAppContext } from '../context/AppContext';

const SplitBox = () => {

    const { splits, user } = useAppContext();

    const [activeBtn, setActiveBtn] = useState('Recent');
    const buttons = ['Recent', 'Pending', 'Completed'];

    const loggedUserId = user?._id

    const filteredSplits = splits.filter((split)=> {

        if(activeBtn === 'Recent'){
            return split
        }

        if(activeBtn === 'Pending'){

            
            return split.participants.some((participant)=>(
                participant.user._id === loggedUserId && participant.paid !== true
            ))
        }

        if (activeBtn === 'Completed'){
            
            return split.participants.some((participant)=>(
                participant.user._id === loggedUserId && participant.paid === true
            ))
        }
    })

    return (

        <div className='flex flex-col w-full h-full p-5 gap-6 md:p-8'>

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:items-center md:justify-between">
                
                <div className="hidden md:flex md:flex-col">
                    <h3 className="text-2xl font-semibold">Split Box</h3>
                    <span className="text-sm text-[var(--text-secondary)]">
                        Easily manage your splits
                    </span>
                </div>

                <div className="grid w-full grid-cols-3 rounded-full bg-[var(--bg-secondary)] p-1 md:w-[360px]">
                    {buttons.map((btn) => (
                        <button
                            type="button"
                            key={btn}
                            onClick={() => setActiveBtn(btn)}
                            className={`rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 cursor-pointer
                                ${activeBtn === btn
                                    ? "bg-[var(--primary)] text-white shadow-sm"
                                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                                }`}
                        >
                            {btn}
                        </button>
                    ))}
                </div>

            </div>

            <div className='min-h-0 flex-1 overflow-y-auto pr-1'>
                {
                    filteredSplits.length > 0 ?
                        <div className="flex flex-col gap-3">
                            {
                                filteredSplits.map((split) => (
                                    <SplitCard data={split} key={split._id} />
                                ))
                            }
                        </div>
                    :
                        <div className='w-full h-full flex justify-center items-center'>
                            <span className='text-sm text-[var(--text-secondary)]'>No {activeBtn} splits yet</span>
                        </div>
                }
            </div>

        </div>
    )
}

export default SplitBox