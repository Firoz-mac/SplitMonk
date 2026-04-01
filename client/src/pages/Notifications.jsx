import React from 'react'
import { useAppContext } from '../context/AppContext'

const Notifications = () => {
    const {notifications} = useAppContext();
    return (
        <div className='w-full bg-[var(--bg-card)] rounded-xl p-5 shadow-sm text-[var(--text)]'>

            <h4 className='text-lg font-semibold'>Notifications</h4>

            <div className='flex flex-col divide-y divide-[var(--border)]'>

                {notifications.map((notification, index)=>(
                    <p className='py-3 text-sm'>{notification.message}</p>
                ))}
                

            </div>

        </div>
    )
}

export default Notifications