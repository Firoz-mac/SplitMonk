import React from 'react'
import { useAppContext } from '../context/AppContext'

const SplitCard = ({data}) => {

    const {user} = useAppContext();

    const loggedUserId = user?._id

    const participants = data?.participants ?? [];

    const loggedUserSplitData = participants.find(
        (participants) => participants.user?._id === loggedUserId
    );

    const formattedDate = data?.updatedAt 
        ? new Date(data.updatedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
        })
        : '';

    return (
        <div className="w-full overflow-hidden rounded-xl border border-[var(--border-color)] cursor-pointer">
            <div className="flex items-center justify-between p-4">
                <div className="flex min-w-0 items-center gap-3">
                    {
                        data.createdBy?.profileImg ?
                            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
                                <img
                                    className="h-full w-full object-cover"
                                    src={data?.createdBy?.profileImg}
                                    alt={data?.createdBy?.userName || 'profile'}
                                />
                            </div>
                        :   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] 
                                text-sm font-medium text-white"
                            >
                                {data.createdBy.userName?.charAt(0)?.toUpperCase()}
                            </div>
                    }

                    <div className="flex min-w-0 flex-col">
                        <span className="truncate font-semibold tracking-normal">
                            {data?.title}
                        </span>
                        <span className="mt-0.5 text-xs font-medium text-[var(--text-secondary)]">
                            {formattedDate}
                        </span>
                    </div>
                </div>

                <span className="block text-base font-bold">
                    ₹{loggedUserSplitData?.amount ?? 0}
                </span>

            </div>

            <div className="flex items-center justify-between border-t border-[var(--border-color)] bg-[var(--bg-secondary)]
             px-4 py-3"
            >
                <div className="flex items-center">
                    <div className="flex -space-x-2">

                        {
                            participants.map((participant,i) => (

                                participant.user.profileImg 
                             
                                ?   <div
                                        key={i}
                                        className="h-7 w-7 overflow-hidden rounded-full border-2 border-[var(--border-color)] 
                                        shadow-sm"
                                    >
                                        <img
                                            className="h-full w-full object-cover"
                                            src={participant.user.profileImg}
                                            alt={participant.user.userName || "member"}
                                        />
                                    </div>

                                :   <div 
                                        key={i}
                                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full 
                                        bg-[var(--primary)] text-sm font-medium text-white"
                                    >
                                        {participant.user?.userName?.charAt(0)?.toUpperCase()}
                                    </div>
                            )
                        )}

                    </div>

                    <span className="ml-3 text-xs font-medium text-[var(--text-secondary)]">
                        {participants.length} people
                    </span>
                </div>

                <div className='flex items-center gap-1.5 rounded-full px-3 py-1.5 '>
                    <span 
                        className={`text-xs font-semibold 
                            ${loggedUserSplitData?.paid ? 'text-green-700 bg-green-50' : 'bg-amber-50 text-amber-700'} `}
                    >
                        
                        {loggedUserSplitData?.paid ? 'Paid' : 'Pending'}

                    </span>
                </div>
            </div>
        </div>
    )
}

export default SplitCard