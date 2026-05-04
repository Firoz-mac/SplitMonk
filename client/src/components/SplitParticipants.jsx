import React from 'react'
import { assets } from '../assets/assets'

const SplitParticipants = ({user, splitEqually, onChange}) => {

    
  return (

    <div className='flex items-center justify-between gap-3 rounded-xl px-3 py-2'
    >

        <div className="flex min-w-0 items-center gap-3">

            {
                user.profileImg?(
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full">
                    <img 
                        className="h-full w-full object-cover" 
                        src={user?.profileImg} 
                        alt="profile" 
                    />
                </div>
                )
                :
                <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] 
                text-sm font-medium text-white'>
                    {user.userName?.charAt(0)?.toUpperCase()}
                </div>
            }

            <span className="truncate text-sm font-medium text-[var(--text-primary)]">
                {user?.userName}
            </span>

        </div>

        {
            splitEqually ? (
        

            <span className="shrink-0 text-sm font-semibold text-[var(--text-primary)]">
                ₹{user.amount}
            </span>

            )
            
            :

            <div className="relative w-32 shrink-0">

                <span className='absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--text-secondary)]'>₹</span>
                <input
                    onChange={(e) => onChange(e, user)}
                    type="text"
                    inputMode="decimal"
                    className='h-9 w-full rounded-xl border border-[var(--border-color)] bg-white pl-7 pr-3 
                    text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]'
                    placeholder="0.00"
                />

            </div>
        }

        

    </div>

  )
}

export default SplitParticipants