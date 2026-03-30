import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext';
import { LuTrash2 } from "react-icons/lu";
import { toast } from 'react-toastify';

const SplitCard = ({createdBy, title, amount, participants, id}) => {

  const {user, axios, getSplits} = useAppContext();
  
  const totalParticipantsCount = participants.length;
  const paidParticipantsCount  = participants.filter((p)=> p.paid === true).length;

  const progressBarValue = totalParticipantsCount > 0 ? (paidParticipantsCount / totalParticipantsCount) * 100 : 0;

  const currentLoggedUser = participants.find((p)=> p?.user?._id === user?._id);

  const currentLoggedUserAmount = currentLoggedUser?.amount || 0;

  const handleTrashBinClick = async (splitId)=>{

    const {data} = await axios.delete(`/api/split/remove/${splitId}`);

    if(data.success){
      toast.success(data.message);
      getSplits();
    }

  }

  return (
    <div className='
      w-full rounded-2xl p-5 text-white
      bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8]
      shadow-[0_10px_30px_rgba(0,0,0,0.4)]
      hover:scale-[1.02] transition-all duration-300
      relative overflow-hidden
    '>


      <div className='absolute inset-0 bg-white/5 pointer-events-none'></div>


      <div className='flex mb-3 relative z-10 justify-between'>
        <div className='flex items-center gap-2'>
          <div className='w-6 h-6 rounded-full overflow-hidden'>
            <img className='w-full h-full object-cover' src={createdBy.profileImg || assets.profileImg1} alt="" />
          </div>
          <span className='text-sm text-white/80 font-medium'>{createdBy.userName}</span>
        </div>
        {createdBy._id == user?._id?
          <LuTrash2 onClick={()=>handleTrashBinClick(id)} size={18} className='cursor-pointer'/> : null
        }
      </div>


      <h3 className='text-lg font-semibold relative z-10'>{title}</h3>

      <h1 className='text-3xl font-bold mt-1 tracking-tight relative z-10'>₹ {amount}</h1>
      {createdBy._id != user?._id ?
        <span>You Own : {currentLoggedUserAmount}</span> : null
      }
      

      <div className='w-full h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden relative z-10'>
        <div className='
          h-full rounded-full
          bg-gradient-to-r from-cyan-300 to-blue-400
          shadow-[0_0_10px_rgba(56,189,248,0.6)]
        ' style={{ width : `${progressBarValue}%`}}></div>
      </div>

      <div className='flex items-center justify-between mt-4 relative z-10'>

        <div className='flex -space-x-2'>
          {participants.map((item, index) => (
            <div
              key={index}
              className='w-7 h-7 rounded-full border-2 border-white overflow-hidden'
            >
              <img className='w-full h-full object-cover' src={item.user.profileImg || assets.profileImg1} alt="" />
            </div>
          ))}
        </div>

        <span className='text-sm text-white/80 font-medium'>
          {paidParticipantsCount}/{totalParticipantsCount} paid
        </span>
      </div>

      <button className='
        w-full mt-5 py-2.5 rounded-xl
        bg-white text-black font-medium
        hover:bg-gray-200 active:scale-95
        transition-all duration-200 cursor-pointer
      '>
        Pay
      </button>

    </div>
  )
}

export default SplitCard