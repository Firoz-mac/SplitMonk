import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-toastify';

const NewExpenses = () => {
    const {navigate, axios, expenses, setExpenses} = useAppContext();

    const [expense, setExpense] = useState({
        title:'',
        amount:''
    })

    const handleChange = (e)=>{
        setExpense({
            ...expense,
            [e.target.name]:e.target.value
        });
    }

    const handleClick= async ()=>{

        try {
            const {data} = await axios.post('/api/expense/add', {expense});
            if(data.success){
                setExpenses(prev => [data.data, ...prev]);
                toast.success(data.message);
            }
        } catch (error) {
            console.log(error);
        }finally{
            setExpense({
                title:'',
                amount:''
            });
        }
        
    }

  return (
    <div className='w-full max-w-md flex flex-col gap-5'>
        <h3 className='text-3xl font-medium'>Track a new <br /> spending record</h3>
        <div className='flex flex-col gap-2'>
            <input onChange={handleChange} type='text' placeholder="What was it for?"
                    className="w-full py-3 px-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]
                        text-[var(--text)] placeholder:text-[var(--text-dull)] focus:outline-none focus:border-blue-500
                        focus:ring-2 focus:ring-blue-500/20 transition" value={expense.title} name='title'/>
            <input onChange={handleChange} type='text' placeholder="How much?"
                    className="w-full py-3 px-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]
                        text-[var(--text)] placeholder:text-[var(--text-dull)] focus:outline-none focus:border-blue-500
                        focus:ring-2 focus:ring-blue-500/20 transition" value={expense.amount} name='amount'/>
        </div>
        <button onClick={handleClick} className='w-full py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600
                text-white font-medium hover:opacity-90 active:scale-95 transition-all duration-200
                shadow-[0_5px_15px_rgba(59,130,246,0.4)]'>
                Add
        </button>
        
        {expenses?.length > 0 && (
            <div className='flex flex-col w-full gap-2 max-h-75 overflow-scroll no-scrollbar'>

                <div className='flex items-center justify-between w-full'>
                    <span className='text-sm'>Recent</span>
                    <span onClick={()=>navigate('/expense-list')} className='text-sm cursor-pointer text-[var(--text)] hover:text-[var(--text-dull)]'>View all</span>
                </div>
                {expenses?.slice(0, 3).map((item, index)=>(
                    <div key={index} className='flex flex-col p-4 bg-[var(--bg-card)]/80 backdrop-blur-md border border-[var(--border)] rounded-lg'>
                        <span>{item.title}</span>
                        <span>₹{item.amount}</span>
                    </div>
                ))}
                    
            </div>
        )}

    </div>
  )
}

export default NewExpenses