import React, { useState } from 'react'
import { Hamburger, Handbag, CarFront  } from 'lucide-react';

const Categories = ({value, onChange}) => {

    const categoryItems = [
        {
            title: "Food",
            icon: <Hamburger/>
        },
        {
            title: "Travel",
            icon: <Handbag/>
        },
        {
            title: "Shopping",
            icon: <CarFront/>
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
                    {cat.icon && cat.icon}
                    <span>{cat.title}</span>
                </button>
            ))
        }
    </div>
  )
}

export default Categories