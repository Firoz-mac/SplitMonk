import React from 'react'

const SplitDetailsParticipantsCard = ({participant}) => {

    return (
        <div className="w-full">

            <div className="flex items-center justify-between px-5 py-4">
                <div className="flex min-w-0 items-center gap-4 py-1">

                    {
                        participant?.user?.profileImg ?
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-amber-950">
                                <img
                                    className="h-full w-full object-cover"
                                    src={participant?.user?.profileImg}
                                    alt="profile"
                                />
                            </div>
                        :
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center 
                            rounded-full bg-[var(--primary)] text-sm font-medium text-white"
                            >
                                {participant?.user?.userName?.charAt(0)?.toUpperCase() || '!'}
                            </div>
                    }
                    

                    <div className="flex min-w-0 flex-col gap-1">
                        <span className="truncate font-medium text-[var(--text-primary)]">
                            {participant?.user?.userName || 'Unknown user'}
                        </span>

                        <span className={`w-fit rounded-full px-2 py-0.5 text-xs
                        ${participant?.paid ? 'text-green-700 bg-green-50' : 'bg-amber-50 text-amber-700'}`}
                        >
                            {participant?.paid ? 'Paid' : 'Pending'}
                        </span>
                    </div>
                </div>

                <span className="shrink-0 text-lg font-medium text-[var(--text-primary)]">
                    ₹{participant?.amount ?? 0}
                </span>
            </div>

        </div>
    )
}

export default SplitDetailsParticipantsCard