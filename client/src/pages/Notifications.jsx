import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { RiFlag2Fill } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import PaymentNotify from '../components/notifications/PaymentNotify';
import SplitRequestNotify from '../components/notifications/SplitRequestNotify';

const Notifications = () => {
    const { notifications, axios, setUnreadCount } = useAppContext();
    const [notifyFilter, setNotifyFilter] = useState('all');
    const [filterdNotifications, setFilterdNotifications]= useState([]);

    // useEffect(()=>{
    //     console.log(notifications)
    // },[]);

    useEffect(()=>{

        if(notifyFilter === 'all'){
            setFilterdNotifications(notifications);
        }

        if(notifyFilter === 'request'){

            const requestNotifications = notifications.filter((notify)=> notify.type === 'split_request')
            setFilterdNotifications(requestNotifications);
        }
        
    },[notifyFilter, notifications]);

    useEffect(() => {
        const markAsRead = async () => {
            try {
                const { data } = await axios.post('/api/notifications/read');
                if (data.success) {
                    setUnreadCount(0);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        markAsRead();

    }, []);

    return (

        <div className='w-full h-full flex md:justify-center'>
            <div className='w-full h-full max-w-md flex flex-col'>
                <div className='flex justify-between py-4 px-5 border-b border-[var(--text-muted)] items-center'>
                    <h4>Notifications</h4>
                    
                    <div className='flex'>
                        <button
                            type='button'
                            onClick={()=>setNotifyFilter('all')}
                            className={`text-sm py-2 px-3 rounded-md cursor-pointer 
                                ${notifyFilter === 'all'
                                    ? 'bg-[var(--primary)]/20 text-[var(--primary)]' 
                                    : 'text-[var(--text-muted)]'
                                }
                            `}
                        >
                            All
                        </button>

                        <button 
                            type='button'
                            onClick={()=>setNotifyFilter('request')}
                            className={`text-sm py-2 px-3 rounded-md cursor-pointer 
                                ${notifyFilter === 'request'
                                    ? 'bg-[var(--primary)]/20 text-[var(--primary)]' 
                                    : 'text-[var(--text-muted)]'
                                }
                            `}
                        >
                            Request
                        </button>
                    </div>
                </div>

                <div className='flex-1 overflow-y-scroll'>

                    {filterdNotifications? (

                        <div className='divide-y divide-[var(--border-color)]'>

                            {
                                filterdNotifications.map((notify)=>{
                                    if (notify.type === 'payment'){
                                        return (
                                            <PaymentNotify notification={notify} key={notify._id}/>
                                        )
                                    }

                                    if (notify.type === 'split_request'){
                                        return (
                                            <SplitRequestNotify notification={notify} key={notify._id}/>
                                        )
                                    }

                                    return null;
                                })
                            }

                        </div>

                    )
                    :
                    (

                        <div className='flex flex-col items-center justify-center w-full h-full px-10'>

                            <span className='font-medium text-lg'>No notifications yet</span>
                            <p className='text-sm text-center text-[var(--text-secondary)]'>Your notification will appear here once you've received them.</p>

                        </div>

                    )}

                </div>
            </div>
        </div>
    )
}

export default Notifications