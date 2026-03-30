import React, { useEffect } from 'react'
import AdsCard from '../components/AdsCard'
import RecentList from '../components/RecentList'
import SplitCard from '../components/SplitCard'
import TotalExpenses from '../components/TotalExpenses'
import { useAppContext } from '../context/AppContext'

const Home = () => {

  const {navigate, user, splits, setSplits, getSplits, newSplitData}=useAppContext();

  const date = new Date();

  const formattedDate = date.toLocaleDateString('en-Us', {
    weekday: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(()=>{
    console.log(splits);
  },[splits])

  useEffect(()=>{
    getSplits();
  },[newSplitData]);

  return (
    <div className='w-full flex flex-col gap-3'>
      <div className='bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] p-5 rounded-lg flex flex-col gap-5'>
        <div>
          <h3 className='text-3xl font-medium'>Hi {user ? user.userName : ""}</h3>
          <span>{formattedDate}</span>
        </div>
        <div className='flex gap-8'>
          <div>
            <h3>You Owe</h3>
            <h3 className='text-5xl font-medium'>₹1502</h3>
          </div>
          <div>
            <h3>You Are Owed</h3>
            <h3 className='text-5xl font-medium'>₹2300</h3>
          </div>
        </div>
      </div>
      <RecentList/>
      <AdsCard/>
      <div className='bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] p-5 rounded-lg flex flex-col'>
        <div className='flex justify-between'>
          <span className='text-sm'>Recent Splits</span>
          <span onClick={()=>navigate('/splits')} className='text-sm cursor-pointer text-[var(--text)] hover:text-[var(--text-dull)]'>View all</span>
        </div>
        <div className='flex py-3 gap-4 overflow-x-scroll no-scrollbar'>

          {splits.map((item, index)=>(
            <div key={index} className='min-w-[220px]'>
              <SplitCard createdBy={item.createdBy} title={item.title} amount={item.amount} participants={item.participants} id={item._id}/>
            </div>
          ))}

        </div>
      </div>
      <TotalExpenses/>
    </div>
  )
}

export default Home