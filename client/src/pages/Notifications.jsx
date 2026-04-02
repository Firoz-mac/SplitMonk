import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'

const Notifications = () => {
    const {notifications, axios, setUnreadCount} = useAppContext();

    useEffect(()=>{
        const markAsRead = async ()=>{
            try {
                const {data} = await axios.post('/api/notifications/read');
                if(data.success){
                    setUnreadCount(0);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        markAsRead();
    },[]);

    return (
        <div className='w-full bg-[var(--bg-card)] rounded-xl p-5 shadow-sm text-[var(--text)]'>

            <h4 className='text-lg font-semibold'>Notifications</h4>

            <div className='flex flex-col divide-y divide-[var(--border)]'>

                {notifications.map((notification, index)=>(
                    <p key={index} className='py-3 text-sm'>{notification.message}</p>
                ))}

            </div>

        </div>
    )
}

export default Notifications