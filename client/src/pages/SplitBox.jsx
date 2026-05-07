import React, { useEffect, useState } from 'react'
import SplitCard from '../components/SplitCard';
import { useAppContext } from '../context/AppContext';

const SplitBox = () => {

    const {splits} = useAppContext();

    const [activeBtn, setActiveBtn] = useState('Recent');
    const buttons = ['Recent', 'Pending', 'Completed'];

    const filteredSplits = splits.filter((split)=> {

        if(activeBtn === 'Recent'){
            return split
        }

        if(activeBtn === 'Completed'){
            return split?.paid === true
        }

        if(activeBtn === 'Pending'){
            return split?.paid !== true
        }
    })

  return (
    <div className='w-full h-full flex md:justify-center overflow-hidden'>
        <div className='w-full h-full max-w-md flex flex-col px-5 md:py-10 gap-4'>
            <div className='grid w-full grid-cols-3 rounded-full bg-[var(--bg-secondary)] px-1 mt-5 md:mt-0'>
                {
                    buttons.map((btn)=>(
                        <button 
                            type='button'
                            onClick={()=>setActiveBtn(btn)}
                            key={btn}
                            className={`rounded-full px-3 py-2 text-sm font-medium transition-colors duration-200
                                ${
                                    activeBtn === btn 
                                    ? 'bg-[var(--primary)] text-white shadow-sm' 
                                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                } 
                            `}
                        >
                                {btn}
                        </button>
                    ))
                }
                
            </div>

            <div className='flex-1 flex-col space-y-3 overflow-y-scroll'>
                
                {
                    filteredSplits.length > 0 ?
                        filteredSplits.map((split)=>(
                            <SplitCard data={split} key={split._id}/>
                        ))
                    : 
                        <div className='w-full h-full flex justify-center items-center'>
                            <span className='text-[var(--text-secondary)]'>No {activeBtn} splits yet</span>
                        </div>
                }

            </div>
        </div>
    </div>
  )
}

export default SplitBox