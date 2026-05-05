import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { RiFlag2Fill } from "react-icons/ri";
import { MdPayment } from "react-icons/md";
import PaymentNotify from '../components/notifications/PaymentNotify';
import SplitRequestNotify from '../components/notifications/SplitRequestNotify';

const Notifications = () => {
    const { notifications, axios, setUnreadCount } = useAppContext();
    const [notifyfilter, setNotifyFilter] = useState('all');

    useEffect(()=>{
        console.log(notifications)
    },[])

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
                                ${notifyfilter === 'all'
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
                                ${notifyfilter === 'request'
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

                    <div className='divide-y divide-[var(--border-color)]'>
                        <PaymentNotify />
                        <SplitRequestNotify/>
                        <SplitRequestNotify/>
                        <PaymentNotify />
                    </div>

                    {/* <div className='flex flex-col items-center justify-center w-full h-full px-10'>

                        <span className='font-medium text-lg'>No notifications yet</span>
                        <p className='text-sm text-center text-[var(--text-secondary)]'>Your notification will appear here once you've received them.</p>

                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default Notifications