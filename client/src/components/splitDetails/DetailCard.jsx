import React from 'react'
import { useAppContext } from '../../context/AppContext'

const DetailCard = () => {

    const {user, selectedSplit} = useAppContext();

    const loggedUserId = user?._id;

    const participants = selectedSplit?.participants ?? [];

    const loggedUserSplitData = participants.find(
        (participant) => participant?.user?._id === loggedUserId
    );

    const formattedDate = selectedSplit?.updatedAt
        ?   new Date(selectedSplit.updatedAt).toLocaleDateString("en-US",{
            month: "short",
            day: "2-digit",
        })
        : ''

    const totalSplitAmount = selectedSplit?.amount ?? 0;

    const totalPaidAmount = participants.reduce(
        (total, participant)=> participant?.paid ? total + (participant.amount || 0) : total, 0
    )

    const remainingSplitBalance = totalSplitAmount - totalPaidAmount;


    return (
        <div className="w-full bg-[var(--primary)]/10 px-5 py-6 flex flex-col items-center gap-4">

            {selectedSplit?.createdBy?.profileImg?

                <div className="h-24 w-24 rounded-full bg-amber-300 overflow-hidden">
                    <img 
                        className='w-full h-full object-cover' 
                        src={selectedSplit?.createdBy?.profileImg} 
                        alt="profile"
                    />
                </div>
            :
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]
                text-sm font-medium text-white"
                >
                    {selectedSplit?.createdBy?.userName?.charAt(0)?.toUpperCase()}
                </div>

            }

            <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-xl font-medium text-[var(--text-primary)]">
                    {selectedSplit?.title}
                </span>

                <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm 
                text-[var(--text-secondary)]"
                >
                    <span>{formattedDate}</span>
                    <span className="h-1 w-1 rounded-full bg-[var(--text-secondary)]" />
                    <span>{selectedSplit?.splitType}</span>
                    <span className="h-1 w-1 rounded-full bg-[var(--text-secondary)]" />
                    <span>{participants?.length} People</span>
                </div>
            </div>

            <div className="w-full max-w-sm rounded-xl bg-white px-5 py-4 shadow-sm divide-x divide-gray-200 flex">

                <div className="flex flex-1 flex-col items-center">
                    <span className="text-xl font-medium leading-tight text-[var(--text-primary)]">
                        ₹{totalSplitAmount}
                    </span>
                    <span className="mt-1 text-xs text-[var(--text-secondary)]">
                        Total Bill
                    </span>
                </div>

                <div className="flex flex-1 flex-col items-center">
                    <span className="text-xl font-medium leading-tight text-[var(--text-primary)]">
                        ₹{remainingSplitBalance}
                    </span>
                    <span className="mt-1 text-xs text-[var(--text-secondary)]">
                        Remaining
                    </span>
                </div>
                
            </div>

            <button
                type="button"
                disabled={loggedUserSplitData?.paid}
                className={`w-full max-w-sm rounded-xl  px-10 py-3 font-medium text-white 
                shadow-sm transition active:scale-[0.98] cursor-pointer 
                ${loggedUserSplitData?.paid ? 'bg-green-400 cursor-not-allowed' : 'bg-[var(--primary)] cursor-pointer hover:bg-[var(--primary)]/90'}`}
            >
                {loggedUserSplitData?.paid ? 'Paid' : `Pay ₹${loggedUserSplitData?.amount ?? 0}`}
                
            </button>
        </div>
    )
}

export default DetailCard