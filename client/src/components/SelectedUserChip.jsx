import React from 'react'
import { IoMdClose } from "react-icons/io";

const SelectedUserChip = ({user, onRemove}) => {

    if (!user) return null;

  return (

    <div 
        className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 
        bg-[var(--primary)]/10 px-3 py-2"
    >

        {
            user?.profileImg ? (
                <div className='flex h-6 w-6 shrink-0 rounded-full overflow-hidden'>
                    <img
                        className='w-full h-full object-cover'
                        src={user?.profileImg} 
                        alt="profile" 
                    />
                </div>
            )

            :

            <div className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]
            text-xs font-medium text-white'
            >
                {user.userName?.charAt(0)?.toUpperCase()}
            </div>
        }

        <span className='max-w-28 truncate text-sm font-medium text-[var(--text-primary)]'>{user?.userName}</span>
        
        <button
            onClick={()=>onRemove(user)}
            type="button"
            className='rounded-full p-1 text-[var(--text-secondary)] transition hover:bg-[var(--bg-secondary)]
            hover:text-[var(--text-primary)]'
        >
            <IoMdClose className="text-sm" />
        </button>

    </div>
  )
}

export default SelectedUserChip