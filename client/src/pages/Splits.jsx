import React from 'react'
import SplitCard from '../components/SplitCard'

const Splits = () => {
  return (
    <div className='w-full bg-[var(--bg-card)] rounded-lg p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        <SplitCard/>
        <SplitCard/>
        <SplitCard/>
        <SplitCard/>
        <SplitCard/>
        <SplitCard/>
        <SplitCard/>
        <SplitCard/>
    </div>
  )
}

export default Splits