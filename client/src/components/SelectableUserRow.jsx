import React from 'react'
import { IoIosCheckmark } from "react-icons/io";

const SelectableUserRow = ({user, onClick, alreadySelected}) => {

    if (!user) return null;

  return (

    <button
        onClick={()=>onClick(user)}
        type="button"
        className='flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition
        hover:bg-[var(--bg-secondary)] active:scale-[0.99] cursor-pointer'
    >
        {
            user?.profileImg? (

                <div className='flex h-10 w-10 shrink-0 rounded-full overflow-hidden'>
                    
                    <img 
                        className='w-full h-full object-cover'
                        src={user?.profileImg}
                        alt="" 
                    />

                </div>

            )

            :

            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]
            text-sm font-medium text-white'
            >
                {user?.userName?.charAt(0)?.toUpperCase()}
            </div>
        }

        <div className="min-w-0 flex flex-1 flex-col">
            <span className="truncate text-sm font-medium text-[var(--text-primary)]">{user?.userName}</span>
            <span className="truncate text-xs text-[var(--text-secondary)]">Tap to select</span>
        </div>

        {alreadySelected && (
            <span className='flex justify-center text-white items-center w-6 h-6 bg-[var(--primary)] rounded-full'>
                <IoIosCheckmark size={20} />
            </span>
        )}

    </button>

  )
}

export default SelectableUserRow