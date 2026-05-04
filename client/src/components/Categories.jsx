import React, { useState } from 'react'
import { assets } from '../assets/assets'

const Categories = ({value, onChange}) => {

    const categoryItems = [
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

  return (
    <div className='grid grid-cols-2 gap-3'>
        {
            categoryItems.map((cat)=>(
                <button
                    onClick={()=>onChange(cat.title)}
                    type="button"
                    key={cat.title}
                    className={`flex items-center cursor-pointer gap-3 p-3 rounded-xl border text-sm transition 
                        ${
                            value === cat.title
                            ? "border-[var(--primary)] bg-[var(--primary)]/10"
                            : "border-[var(--border-color)] bg-[var(--bg-primary)]"
                        }`}
                >
                    {cat.icon && <img className="w-5" src={cat.icon} alt="" />}
                    <span>{cat.title}</span>
                </button>
            ))
        }
    </div>
  )
}

export default Categories