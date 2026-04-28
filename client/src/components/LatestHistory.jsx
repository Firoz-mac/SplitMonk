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
        <div className='w-full max-w-md mt-8 rounded-2xl '>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-medium">
                    Transactions
                </h2>

                <button className="text-xs text-primary font-medium flex items-center gap-1 cursor-pointer">
                    See all
                    <IoChevronDown className='rotate-270'/>
                </button>
            </div>

            <div className='flex flex-col'>
                {transactions.map((tran, i) => (
                    <div key={i} className='flex items-center justify-between py-3 last:border-none rounded-lg px-2 transition'>

                        <div className='flex gap-3 items-center'>
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border-color)]">
                                <img
                                    src={`https://i.pravatar.cc/150?img=${tran.img}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className='flex flex-col'>
                                <span className="text-sm font-medium text-[var(--text-primary)] capitalize">
                                    {tran.name}
                                </span>
                                <span className="text-xs text-[var(--text-muted)]">
                                    {tran.date}
                                </span>
                            </div>
                        </div>

                        <span
                            className={`text-sm font-medium ${
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