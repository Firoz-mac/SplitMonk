import React, { useEffect, useState } from 'react'
import TotalExpenses from '../components/TotalExpenses'
import QuickActions from '../components/QuickActions'
import People from '../components/People'
import LatestHistory from '../components/LatestHistory'

const Home = () => {
  
  return (

    <div className='h-screen overflow-y-scroll no-scrollbar'>

      <TotalExpenses/>

      <div className="mt-12 px-5 flex flex-col items-center">

        <QuickActions/>
        <People/>
        <LatestHistory/>

      </div>
      
    </div>
  )
}

export default Home