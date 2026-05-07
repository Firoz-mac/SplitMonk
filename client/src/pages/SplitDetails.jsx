import React from 'react'
import { useAppContext } from '../context/AppContext'
import { IoArrowBackOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";

const SplitDetails = () => {

    const {navigate, user, selectedSplit} = useAppContext();

    const loggedUserId = user?._id;

    const formattedDate = selectedSplit?.updatedAt 
        ? new Date(selectedSplit.updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
        })
        : '';

    const participants = selectedSplit?.participants ?? [];

    const loggedUserSplitData = participants.find(
        (participant) => participant?.user?._id === loggedUserId
    );

    

  return (
    <div className='w-full h-full flex md:justify-center'>
        <div className='w-full h-full max-w-md flex flex-col'>
            <div className='w-full bg-[var(--primary)] text-white px-5 md:py-8'>
                <div className='relative flex justify-between py-5 md:py-0 items-center'>

                    <button 
                        type="button"
                        onClick={()=>navigate(-1)}
                        className='cursor-pointer'
                    >
                        <IoArrowBackOutline/>
                    </button>
                    <h4>Split Details</h4>

                    {loggedUserId === selectedSplit?.createdBy?._id ?
                        <button 
                            type="button"
                            className='cursor-pointer'
                        >
                            <RiDeleteBinLine/>
                        </button>
                        :
                        <div></div>
                    }
                    
                </div>

                <div className='flex flex-col items-center py-20 gap-2'>
                    <span className='text-3xl'>{selectedSplit?.title}</span>
                    <div className='text-xs flex justify-center items-center gap-1'>
                        <span>{formattedDate}</span>
                        <div className='w-1 h-1 rounded-full bg-white'></div>
                        <span>{selectedSplit?.splitType ? 'Split Equally' : 'Split Custom'}</span>
                        <div className='w-1 h-1 rounded-full bg-white'></div>
                        <span>{participants.length} People</span>
                    </div>
                </div>
            </div>
            
            <div className='flex-1 px-5 py-2 space-y-1 overflow-y-scroll'>

                {
                    participants?.map((participant)=>(
                        <div 
                            key={participant?.user?._id} 
                            className='flex w-full items-center justify-between rounded-xl border 
                            border-[var(--border-color)] bg-[var(--bg-secondary)] p-3'
                        >

                            <div className='flex min-w-0 items-center gap-3'>

                                { 
                                    participant?.user?.profileImg ? 
                                        <div className='w-11 h-11 rounded-full shrink-0 overflow-hidden'>
                                            <img 
                                                className='w-full h-full object-cover' 
                                                src={participant?.user?.profileImg} 
                                                alt={participant?.user?.userName || 'User'} 
                                            />
                                        </div>
                                    :
                                        <div className='flex w-11 h-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-medium text-white'>
                                            {participant?.user?.userName?.charAt(0)?.toUpperCase()}
                                        </div>
                                    
                                }
                                
                                <div className='flex min-w-0 flex-col'>
                                    <span className="truncate text-sm font-semibold text-[var(--text-primary)]">{participant?.user?.userName}</span>
                                    <span 
                                        className={`mt-0.5 w-fit rounded-full text-[11px] px-2 
                                        ${participant?.paid ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                                    >
                                        {participant?.paid ? 'Paid':'Pending'}
                                    </span>
                                </div>

                            </div>

                            <span className="shrink-0 text-sm font-medium text-[var(--text-primary)]">₹{participant?.amount ?? 0}</span>

                        </div>
                    ))
                }
                
                

            </div>

            {!loggedUserSplitData?.paid && (

                <div className='px-5 md:mb-5'>
                    <button
                        type='button'
                        className='w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white p-2
                        rounded-lg cursor-pointer'
                    >
                        Pay
                    </button>
                </div>

            )}

        </div>
    </div>
  )
}

export default SplitDetails