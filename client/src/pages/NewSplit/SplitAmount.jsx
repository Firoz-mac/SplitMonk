import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const SplitAmount = () => {
    const {navigate, newSplitData, setNewSplitData, axios}=useAppContext();

    const [splitValue, setSplitValue] = useState('equal');
    const [splitAmounts, setSplitAmounts] = useState([]);
    const [balance, setBalance] = useState(newSplitData.amount);

    useEffect(()=>{
        if(splitValue === 'equal'){
            const participants = newSplitData.participants.length + 1;
            const perHead=newSplitData.amount/participants;

            const amounts = newSplitData.participants.map(()=>perHead);
            setSplitAmounts(amounts);
        }else{
            const amounts = newSplitData.participants.map(()=> 0);
            setSplitAmounts(amounts);
            setBalance(newSplitData.amount);
        }
    },[splitValue, newSplitData]);

    const handleCustomAmountChange = (index, value)=>{
        const updated = [...splitAmounts];
        updated[index] = Number(value) || 0 ;
        setSplitAmounts(updated);

        const total = updated.reduce((acc, curr)=> acc+curr, 0);
        setBalance(newSplitData.amount - total);
    }

    const handleSubmit=async ()=>{
        const updatedParticipants = newSplitData.participants.map((user, index)=>(
            {
                ...user,
                amount: splitAmounts[index] || 0
            }
        ));

        const finalData = {
            ...newSplitData,
            amount: Number(newSplitData.amount),
            participants: updatedParticipants
        }

        try {
            const {data} = await axios.post('/api/split/add', finalData);

            if(data.success){
                toast.success('Split Created');
                setNewSplitData(
                    {
                        title: '',
                        amount: '',
                        splitType: 'equal',
                        participants: []
                    }
                )
                navigate('/home');
            }

        } catch (error) {
            console.log(error.message);
            toast.error('Failed to create split');
        }

    }

    return (
        <div className='w-full max-w-md flex flex-col gap-5'>
            <FaArrowLeft onClick={() => navigate(-1)} className='text-xl text-[var(--text)] hover:text-[var(--text-dull)] cursor-pointer' />
            <div className='flex items-center gap-2 text-xs'>
                <div className='
                            w-6 h-6 rounded-full 
                            bg-blue-500 text-white 
                            flex items-center justify-center
                            font-medium
                        '>3</div>

                <span className='text-[var(--text-dull)]'>of</span>

                <div className='
                            w-6 h-6 rounded-full 
                            bg-[var(--bg-card-hover)] 
                            text-[var(--text)]
                            flex items-center justify-center
                        '>3</div>
            </div>
            <div>
                <h3 className='text-2xl md:text-3xl font-semibold leading-snug'>
                    How do you <br className='hidden sm:block' /> want to split.
                </h3>

                {splitValue === 'equal'?
                    <p className='text-sm text-[var(--text-dull)] mt-1'>
                        Split equally between all members
                    </p> :
                    <p className='text-sm text-[var(--text-dull)] mt-1'>
                        Split custom between all members
                    </p>
                }

            </div>
            <div className='flex gap-1'>
                <button onClick={()=>setSplitValue('equal')} className={`px-5 py-1 ${splitValue === 'equal' ? "bg-[var(--primary)]" : "bg-[var(--text-dull)] text-black"} rounded-lg cursor-pointer`}>Equal</button>
                <button onClick={()=>setSplitValue('custom')} className={`px-5 py-1 ${splitValue === 'custom' ? "bg-[var(--primary)]" : "bg-[var(--text-dull)] text-black"} rounded-lg cursor-pointer`}>Custom</button>
            </div>

            {splitValue === 'custom' ?
                <span>Balance: ₹ {balance}</span> : null
            }

            <div className='bg-[var(--bg-card)] max-h-59 flex flex-col gap-1 p-3 overflow-scroll no-scrollbar rounded-lg'>

                {newSplitData.participants.map((item, index)=>(
                    <div key={index} className='flex items-center gap-3 p-1 cursor-pointer'>

                        <div className='w-11 h-11 rounded-full overflow-hidden flex-shrink-0'>
                            <img className='w-full h-full object-cover' src={item.profileImg || assets.profileImg1} alt="" />
                        </div>

                        <div className='flex justify-between items-center w-full'>
                            <span className='text-sm truncate'>{item.userName}</span>
                            { splitValue === 'equal' ?
                                <span className='text-sm font-medium whitespace-nowrap'>₹ {splitAmounts[index]?.toFixed(2)}</span>
                                :
                                <input onChange={(e)=>handleCustomAmountChange(index, e.target.value)} className='focus:outline-none' type="text" placeholder='Amount' />
                            }
                        </div>

                    </div>
                ))}

            </div>
            <button onClick={handleSubmit} className='w-full py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600
                            text-white font-medium hover:opacity-90 active:scale-95 transition-all duration-200
                            shadow-[0_5px_15px_rgba(59,130,246,0.4)] cursor-pointer'>
                Send Request
            </button>
        </div>
    )
}

export default SplitAmount