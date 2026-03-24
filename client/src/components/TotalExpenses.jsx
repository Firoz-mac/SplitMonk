import React, { useState } from 'react'
import { IoChevronDown } from "react-icons/io5";

const TotalExpenses = () => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("This Month");

    const options = ["Today", "This Week", "This Month", "This Year"];
    return (
        <div className='bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] p-5 rounded-lg flex justify-between'>
            <div className='flex flex-col gap-2'>
                <div>
                    <h3 className='text-2xl'>Expenses</h3>
                    <span>Tuesday, 12, 2026</span>
                </div>
                <span className='text-5xl font-medium'>₹17850</span>
            </div>
            <div className="inline-block">

                {/* Button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-2 bg-[var(--bg-card)] px-3 py-2 rounded-xl text-[var(--text)] hover:bg-[var(--bg-card-hover)] transition cursor-pointer"
                >
                    <span className='text-xs'>{selected}</span>
                    <IoChevronDown className={`text-xs transition ${open ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown */}
                {open && (
                    <div className="right-0 mt-2 w-40 bg-[var(--bg-card)] rounded-xl shadow-lg border border-[var(--border)] overflow-hidden">

                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => {
                                    setSelected(option);
                                    setOpen(false);
                                }}
                                className="px-4 py-2 text-xs hover:bg-[var(--bg-card-hover)] cursor-pointer"
                            >
                                {option}
                            </div>
                        ))}

                    </div>
                )}
            </div>

        </div>
    )
}

export default TotalExpenses