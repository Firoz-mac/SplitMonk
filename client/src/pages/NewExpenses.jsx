import React, { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { assets } from './../assets/assets';
import { IoChevronDown } from "react-icons/io5";

const NewExpenses = () => {
    const { navigate, axios, expenses, setExpenses, getMonthlyLimit } = useAppContext();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [expense, setExpense] = useState({
        title: '',
        amount: '',
        category:''
    });
    const isDisable = !expense.title || !expense.amount || !expense.category || !selected;
    const categories = [
        {
            title: "Food",
            icon: assets.foodIcon
        },
        {
            title: "Travel",
            icon: assets.travelIcon
        },
        {
            title: "Shopping",
            icon: assets.shoppingIcon
        },
        {
            title: "Other",
            icon: null
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({
            ...expense,
            [name]: value
        });
    };

    const saveExpense = async () => {

        try {
            const { data } = await axios.post('/api/expense/add', { expense });
            if (data.success) {
                setExpenses(prev => [data.data, ...prev]);
                getMonthlyLimit();
            }
        } catch (error) {
            console.log(error);
        } finally {
            setExpense({
                title: '',
                amount: '',
                category:''
            });
            setSelected(null)
        }

    };

    const handleSubmit = async () => {
        setIsSaving(true);
        await saveExpense();
        setIsSaving(false);
        toast.success('New Expense Added');

        console.log(expense);
    };

    useEffect(()=>{
        const handleKeyDown = (e) =>{
            if(e.key === 'Enter' && !isDisable) {
                handleSubmit();
            }
            if(e.key === 'Escape' && open){
                setOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    },[open]);

    return (

        <div onClick={()=>{ 
                if(open){
                    setOpen(false)
                }}
            } className='w-screen h-screen flex justify-center'
        >
            <div onClick={(e) => e.stopPropagation()} className='w-full max-w-md px-5 py-10 space-y-10 
                flex flex-col md:justify-center'
            >
                <div>
                    <h3 className='font-medium text-lg'>Add new expense</h3>
                    <p className='text-sm text-[var(--text-secondary)]'>
                        Enter the details of your expense to help you track your spending.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--text-secondary)]">
                            Enter Amount
                        </label>

                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-sm">
                                ₹
                            </span>

                            <input
                                onChange={handleChange}
                                type="number"
                                inputMode="decimal"
                                name='amount'
                                value={expense.amount}
                                pattern="[0-9]*"
                                placeholder="0.00"
                                className='w-full pl-8 pr-3 py-3 rounded-xl border 
                                border-[var(--border-color)] focus:outline-none 
                                focus:ring-2 focus:ring-primary text-sm'
                                
                            />
                        </div>

                        <div className="flex gap-2 mt-1">
                            {[100, 500, 1000, 2000].map(amt => (
                                <button
                                    key={amt}
                                    onClick={() => 
                                        setExpense((prev) => ({
                                        ...prev,
                                        amount:amt.toString(),
                                        }))
                                    }
                                    className="px-3 py-1 text-sm hover:bg-[var(--bg-secondary)]
                                    rounded-full border border-[var(--border-color)] cursor-pointer"
                                >
                                    ₹{amt}
                                </button>
                            ))}
                        </div>

                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--text-secondary)]">
                            What was it for?
                        </label>

                        <div>
                            <input
                                type="text"
                                onChange={handleChange}
                                name='title'
                                value={expense.title}
                                placeholder="e.g. Coffee"
                                className="w-full pl-3 py-3 rounded-xl border border-[var(--border-color)] 
                                focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 relative">
                        <label className="text-sm font-medium text-[var(--text-secondary)]">
                            Category
                        </label>

                        {/* Selected box */}
                        <div
                            onClick={() => setOpen(!open)}
                            className="w-full px-3 py-3 rounded-xl border border-[var(--border-color)] 
                            flex items-center justify-between cursor-pointer"
                        >
                            {selected ? (
                                <div className="flex gap-3 items-center">
                                    {selected.icon && (
                                            <img className="w-5" src={selected.icon} alt="" />
                                    )}
                                    <p className="text-sm">{selected.title}</p>
                                </div>
                            ) : (
                                <span className="text-[var(--text-secondary)] text-sm">Select category</span>
                            )}

                            <IoChevronDown
                                className={`transition-transform duration-200 ${open ? "rotate-180" : ""
                                    }`}
                            />
                        </div>

                        {/* Dropdown */}
                        {open && (
                            <div className="absolute top-full mt-2 w-full bg-[var(--bg-primary)] p-1 rounded-xl border 
                            border-[var(--border-color)] shadow-md z-10 form-slide-in">
                                {categories.map((cat, i) => (
                                    <div key={i}
                                        onClick={() => {
                                            setSelected(cat);
                                            setOpen(false);
                                            setExpense((prev)=> ({
                                                ...prev,
                                                category:cat.title
                                            }))
                                        }}
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg 
                                        hover:bg-[var(--bg-secondary)] cursor-pointer"
                                        style={{ animationDelay: `${i * 0.02}s` }}
                                    >   
                                        {cat.icon && (
                                            <img className="w-5" src={cat.icon} alt="" />
                                        )}
                                        <span className="text-sm">{cat.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </div>
                <button onClick={handleSubmit} disabled={isDisable} className='w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)]
                    text-white p-2 rounded-lg cursor-pointer'
                >
                    {isSaving ? 'Saving...' : 'Add expense'}
                </button>
            </div>
        </div>
    )
}

export default NewExpenses