import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const SplitRequestNotify = ({notification}) => {

    const {axios, getNotifications} = useAppContext();

    const handleRequestStatus = async (value, notificationId, splitId)=>{

        const data = {value, notificationId, splitId};

        try {
            const response = await axios.post('/api/notifications/statusUpdate', data);
            if(response.data.success){
                toast.success(response.data.message)
                getNotifications();
            }
        } catch (error) {
            console.log(error)
        }
        
    }

  return (

    <div className={`flex items-start gap-3 rounded-md py-5 px-5 
        ${notification.status === 'accepted' 
            ? 'bg-[var(--primary)]/20' 
            : notification.status === 'declined' ? 'bg-red-200' : ''
        }`
    }>

        {
            notification.splitCreatorId.profileImg? (
                <div className='h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                    <img 
                        src={notification.splitCreatorId?.profileImg} 
                        alt="profile"
                        className='h-full w-full object-cover'
                    />
                </div>
            )

            : (

                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] 
                text-sm font-medium text-white'
                >
                    {notification.splitCreatorId?.userName?.charAt(0)?.toUpperCase()}
                </div>
            )

        }

            <div className='min-w-0 space-y-3'>

                <div>
                    <div className='flex items-center gap-2'>
                        <span className='font-medium'>{notification.splitCreatorId?.userName}</span>
                        <span className='text-sm text-[var(--text-secondary)]'>4h ago</span>
                    </div>

                    <p className='break-words text-sm'>{notification.message}</p>
                </div>

                {notification.status === 'pending' ? (

                    <div className='flex flex-wrap gap-2'>
                        <button
                            type='button'
                            onClick={()=>handleRequestStatus('declined', notification._id, notification.splitId)}
                            className='rounded-md border border-[var(--border-color)] bg-transparent px-5 py-2 
                            text-sm hover:bg-[var(--surface-hover)] cursor-pointer'
                        >
                            Decline
                        </button>

                        <button
                            type='button'
                            onClick={()=>handleRequestStatus('accepted', notification._id, notification.splitId)}
                            className='rounded-md bg-[var(--primary)] px-5 py-2 text-sm text-white hover:opacity-90 
                            cursor-pointer'
                        >
                            Accept
                        </button>
                    </div>
                )
                : 
                null
                }
              
            </div>

    </div>

  )
}

export default SplitRequestNotify