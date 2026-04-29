import React from 'react'
import { IoChevronDown} from "react-icons/io5";

const LatestHistory = () => {
    const transactions = [
        { name: "Aman", img: 1, amount: 40, date: "26 Apr", type: "paid" },
        { name: "mac", img: 2, amount: 60, date: "24 Apr", type: "received" },
        { name: "afsar", img: 3, amount: 30, date: "21 Apr", type: "paid" },
        { name: "shamwil", img: 4, amount: 300, date: "21 Apr", type: "received" },
    ]

    return (
        <div className='w-full max-w-md mt-8'>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                    Transactions
                </h2>

                <button
                    type='button'
                    aria-label="See all transactions"
                    className="text-xs text-primary font-medium flex items-center gap-1 cursor-pointer 
                    rounded-full px-2 py-1 transition hover:bg-[#6366f1]/10 active:scale-95"
                >
                    See all
                    <IoChevronDown className='-rotate-90 text-sm'/>
                </button>
            </div>

            <div className='flex flex-col divide-y divide-[var(--border-color)]'>
                {transactions.map((tran, i) => (
                    <div 
                        key={i} 
                        className='flex items-center justify-between py-3 rounded-lg px-2 transition hover:bg-[var(--bg-secondary)]'
                    >

                        <div className='flex gap-3 items-center min-w-0'>
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border-color)] shadow-sm shrink-0">
                                <img
                                    src={`https://i.pravatar.cc/150?img=${tran.img}`}
                                    alt={`${tran.name} profile`}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className='flex flex-col min-w-0'>

                                <span className="text-sm font-medium text-[var(--text-primary)] capitalize truncate">
                                    {tran.name}
                                </span>

                                <span className="text-xs text-[var(--text-muted)]">
                                    {tran.date}
                                </span>

                            </div>
                            
                        </div>

                        <span
                            className={`text-sm font-medium tabular-nums shrink-0 ${
                                tran.type === "received"
                                    ? "text-[var(--success)]"
                                    : "text-[var(--text-primary)]"
                            }`}
                        >
                            {tran.type === "received" ? "+" : ""}₹{tran.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LatestHistory