import React, { useEffect } from 'react'
import AdsCard from '../components/AdsCard'
import SplitCard from '../components/SplitCard'
import TotalExpenses from '../components/TotalExpenses'
import { useAppContext } from '../context/AppContext'
import { useState } from 'react'
import MonthlyLimit from '../components/MonthlyLimit'
import MonthlyLimitBreakdown from '../components/MonthlyLimitBreakdown'

const Home = () => {

  const {navigate, user, splits, getSplits, newSplitData, axios, monthlyLimit}=useAppContext();
  const [youOwe, setYouOwe] = useState(0);
  const [youAreOwed, setYouAreOwed] = useState(0);

  const date = new Date();

  const formattedDate = date.toLocaleDateString('en-Us', {
    weekday: "long",
    day: "numeric",
    year: "numeric",
  });

  useEffect(()=>{
    getSplits();
  },[newSplitData]);

  const getBalance = async ()=>{
    const {data} = await axios.get('/api/balance/get');
    if(data.success){
      setYouOwe(data.youOwe);
      setYouAreOwed(data.youAreOwed);
    }
  }

  useEffect(()=>{
      getBalance();
  },[user, splits]);

  return (
    <div className='w-full flex flex-col gap-3'>

      <div className='py-2'>
        <span className='text-sm text-[var(--text-dull)]'>{formattedDate}</span>
        <h3 className='text-2xl md:text-3xl font-medium'>Welcome {user ? user.userName : "User"}</h3>
      </div>

      <div className='grid md:grid-cols-2 gap-3'>
        <div className='flex-1'>
          <TotalExpenses/>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='bg-[var(--bg-card)]/80 backdrop-blur-md p-6 rounded-2xl border border-[var(--border)] 
            shadow-sm'>
            <h3>You Owe</h3>
            <h3 className='text-4xl font-medium'>₹ {youOwe}</h3>
          </div>
          <div className='bg-[var(--bg-card)]/80 backdrop-blur-md p-6 rounded-2xl border border-[var(--border)] 
            shadow-sm'>
            <h3>You Are Owed</h3>
            <h3 className='text-4xl font-medium'>₹ {youAreOwed}</h3>
          </div>
        </div>
      </div>
      
      <div className='bg-[var(--bg-card)]/80 backdrop-blur-md p-6 rounded-2xl border border-[var(--border)] p-5 flex flex-col'>
        <div className='flex justify-between'>
          <span className='text-sm'>Recent Splits</span>
          {splits.length > 0 ?
          <span onClick={()=>navigate('/splits')} className='text-sm cursor-pointer text-[var(--text)] hover:text-[var(--text-dull)]'>View all</span>
          : null
          }
        </div>
        <div className='flex py-3 gap-4 overflow-x-scroll no-scrollbar'>

          
          {splits.length > 0 ? 
          
            splits.map((item, index)=>(
              <div key={index} className='min-w-[220px]'>
                <SplitCard createdBy={item.createdBy} title={item.title} amount={item.amount} participants={item.participants} id={item._id}/>
              </div>
            ))
            :
            <div >
              <span className='text-sm text-[var(--text-dull)]'>
                No splits yet,
                Start by creating a new split with your friends.
              </span>
            </div> 
          }

        </div>
      </div>
      <AdsCard/>
      <MonthlyLimit/>
      {monthlyLimit.length > 0 ?
        <MonthlyLimitBreakdown/> : null
      }
      
    </div>
  )
}

export default Home