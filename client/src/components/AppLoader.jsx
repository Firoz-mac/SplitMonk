import React from 'react'
import { assets } from '../assets/assets'

const AppLoader = () => {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-[var(--bg-primary)]'>
        <img src={assets.logo} alt="Splitzy" className='w-16 h-16 animate-pulse' />
    </div>
  )
}

export default AppLoader