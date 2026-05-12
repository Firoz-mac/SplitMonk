import React from 'react'
import { useAppContext } from '../context/AppContext'
import SplitDetailsHeader from '../components/splitDetails/SplitDetailsHeader';
import DetailCard from '../components/splitDetails/DetailCard';
import SplitDetailsParticipantsCard from '../components/splitDetails/SplitDetailsParticipantsCard';

const SplitDetails = () => {

    const { selectedSplit } = useAppContext();

    const participants = selectedSplit?.participants ?? [];

    return (

        <div className='w-full flex flex-col h-full'>

            <SplitDetailsHeader createdUserId={selectedSplit?.createdBy?._id}/>

            <div className='flex flex-col flex-1 overflow-y-scroll no-scrollbar'>

                <DetailCard/>

                <div className="flex-1 flex flex-col items-center">

                    <div className='flex md:max-w-4xl w-full border-x border-gray-200 flex-1 
                    flex-col divide-y divide-gray-200'
                    >

                        {
                            participants.length > 0 ? (

                                participants.map((participant, i)=> (
                                    <SplitDetailsParticipantsCard 
                                        key={participant?.user?._id || i} 
                                        participant={participant}
                                    />
                                ))

                            ): (

                                <div className="p-6 text-center text-sm text-gray-500">
                                    No participants yet.
                                </div>

                            )
                        }

                    </div>

                </div>

            </div>

        </div>
    )
}

export default SplitDetails