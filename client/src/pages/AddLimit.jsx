import React, { useEffect, useRef, useState } from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { UtensilsCrossed, CarTaxiFront, Handbag, ReceiptText, Clapperboard, Dices, Trash2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
const AddLimit = () => {

  const {axios, monthlyLimit, getMonthlyLimit, categoryIcons} = useAppContext();

  const dropDownRef = useRef();

  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({
    limit:'',
    category:'',
  });

  const categories = [
    {
      title: "Food",
      icon: UtensilsCrossed
    },
    {
      title: "Travel",
      icon: CarTaxiFront
    },
    {
      title: "Shopping",
      icon: Handbag
    },
    {
      title: "Bills",
      icon: ReceiptText
    },
    {
      title: "Entertainment",
      icon: Clapperboard
    },
    {
      title: "Other",
      icon: Dices
    },

  ]

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);

  }, []);

  const handleInput = (e)=>{
    setPayload((prev)=>({
      ...prev,
      [e.target.name] : e.target.value
    }));
  };

  const handleClick = async () => {
    const inputData = {
      ...payload,
      category: selected?.title
    }
    if(inputData.limit !== null && inputData.category !== ''){
      try {
        const {data} = await axios.post('/api/limit/add', inputData);
        if(data.success){
          toast.success('New Limit Added');
          setPayload({
            limit:'',
            category:'',
          });
          setSelected('');
          getMonthlyLimit();
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  const handleTrash = async (id)=>{
    try {
      const {data} = await axios.delete(`/api/limit/remove/${id}`);
      if(data.success){
        toast.success(data.message);
        getMonthlyLimit();
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='w-full max-w-md flex flex-col gap-5'>
      <div>
        <h3 className='text-2xl md:text-3xl font-semibold leading-snug'>
          Set Your<br className='hidden sm:block' /> Monthly Limit.
        </h3>
      </div>

      <div className="flex flex-col gap-3">

        <input onChange={handleInput} type='text' placeholder="What's your Limit?" name='limit' value={payload.limit}
          className="w-full py-3 px-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] 
            placeholder:text-[var(--text-dull)] focus:outline-none focus:border-blue-500 focus:ring-2
          focus:ring-blue-500/20 transition "
        />

        <div ref={dropDownRef} className="relative w-full">
          <div onClick={() => setOpen(!open)} className="w-full py-3 px-4 rounded-xl bg-[var(--bg-card)] border 
            border-[var(--border)] text-[var(--text)] cursor-pointer flex justify-between items-center">

            <span className={selected ? "flex gap-3 items-center" : "text-[var(--text-dull)]"}>
              {selected && <selected.icon size={18} />}
              {selected?.title || "Category"}
            </span>
            <span className={`transition-transform ${open ? "rotate-180" : ""}`}><IoIosArrowDropdownCircle className='text-[var(--text-dull)]'/></span>
          </div>

          {open && (
            <ul className="absolute z-10 w-full mt-2 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl 
              shadow-lg overflow-hidden">
              {categories.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} onClick={() => {
                    setSelected(item);
                    setOpen(false);
                  }} className="px-4 py-4 cursor-pointer hover:bg-blue-500/10 flex gap-3">
                    <Icon size={22} />
                    <span>{item.title}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>


      </div>

      <button onClick={handleClick} className='w-full py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white
        font-medium hover:opacity-90 active:scale-95 transition-all duration-200'>
        Set Limit
      </button>

      <div className='flex flex-col h-65 gap-2 overflow-scroll no-scrollbar'>
        {monthlyLimit.map((item, index) => {
          const Icon = categoryIcons[item.category] || Dices;

          return(
          
            <div key={index} className='w-full p-5 rounded-xl bg-gradient-to-br from-white/5 via-white/5 to-white/10
            backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
            >
              <div className='flex items-center justify-between'>

                <div className='flex items-center gap-3'>
                  <div className='bg-gradient-to-br from-rose-400/30 to-rose-500/20 p-3 rounded-xl border border-white/10'>
                    <Icon className='text-rose-300' size={18} />
                  </div>
                  <span className='text-white/90 font-medium'>{item.category}</span>
                </div>

                <span className='text-right flex gap-6 items-center'>
                  <span className='text-[var(--text)]'>₹{item.limit}</span>
                  <Trash2 onClick={()=>handleTrash(item._id)} size={16} className='cursor-pointer text-[var(--text-dull)]  hover:text-[var(--text)]' />
                </span>
              </div>
            </div>
          ) 
        })}
      </div>

    </div>
  )
}

export default AddLimit