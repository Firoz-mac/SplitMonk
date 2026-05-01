import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';

const CreateSplit = () => {

    const { navigate, newSplitData, setNewSplitData } = useAppContext();
    const [selected, setSelected] = useState(null);

    const isDisable = !newSplitData.title || !newSplitData.amount || !newSplitData.category;

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

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setNewSplitData((prev)=>({
            ...prev,
            [name]: value
        }))
    }

    const handleCategorySelect = (cat) =>{
        setSelected(cat);

        setNewSplitData((prev)=>({
            ...prev,
            category: cat.title
        }))
    };

    const handleSubmit = () =>{
        if (isDisable) return;
        console.log(newSplitData);
    }

  return (
    <div className='w-full h-full flex justify-center'>
        <div className='w-full max-w-md px-5 py-5 space-y-5 flex flex-col md:justify-center'>
            <div className='space-y-5'>
                <div className='flex justify-center'>
                    <h2 className="text-md font-medium">Create Split</h2>
                </div>

                <div className='flex flex-col gap-4'>

                    <div className='flex flex-col gap-2'>
                        <label className='text-sm font-medium text-[var(--text-secondary)]'>Split Title</label>
                        <div>
                            <input
                                onChange={handleChange}
                                type="text"
                                name='title'
                                value={newSplitData.title}
                                placeholder="Blis Cafe"
                                className='w-full pl-3 py-3 rounded-xl border border-[var(--border-color)] 
                                focus:outline-none focus:ring-2 focus:ring-primary text-sm'
                            />
                        </div>
                    </div>
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
                                value={newSplitData.amount}
                                pattern="[0-9]*"
                                placeholder="0.00"
                                className='w-full pl-8 pr-3 py-3 rounded-xl border 
                                border-[var(--border-color)] focus:outline-none 
                                focus:ring-2 focus:ring-primary text-sm'
                            />
                            </div>
                    </div>

                    <div className="flex flex-col gap-2 relative">
                        <label className="text-sm font-medium text-[var(--text-secondary)]">
                            Category
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                            {categories.map((cat) => (
                                <button
                                    type="button"
                                    key={cat.title}
                                    onClick={() => handleCategorySelect(cat)}
                                    className={`flex items-center cursor-pointer gap-3 p-3 rounded-xl border text-sm transition
                                        ${selected?.title === cat.title
                                            ? "border-[var(--primary)] bg-[var(--primary)]/10"
                                            : "border-[var(--border-color)] bg-[var(--bg-primary)]"
                                        }`}
                                >
                                    {cat.icon && <img className="w-5" src={cat.icon} alt="" />}
                                    <span>{cat.title}</span>
                                </button>

                            ))}
                        </div>

                    </div>

                </div>
            </div>

            <button 
                onClick={handleSubmit} 
                disabled={isDisable} 
                className='w-full bg-[var(--primary)] 
                hover:bg-[var(--primary-dark)] text-white p-2 rounded-lg cursor-pointer'
            >
                Continue
            </button>

        </div>
    </div>
  )
}

export default CreateSplit