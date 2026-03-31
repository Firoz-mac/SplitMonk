import React from 'react'
import SplitCard from '../components/SplitCard'
import { useAppContext } from '../context/AppContext'

const Splits = () => {
  const {splits, setSplits} = useAppContext();
  return (
    <div className='w-full bg-[var(--bg-card)] rounded-lg p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {splits.map((item, index) => (
        <div key={index} className='min-w-[220px]'>
          <SplitCard createdBy={item.createdBy} title={item.title} amount={item.amount} participants={item.participants} id={item._id} />
        </div>
      ))}
    </div>
  )
}

export default Splits