import React from 'react'
import { Plus, SquareSplitHorizontal, ScanQrCode, IndianRupee } from 'lucide-react';
import { useAppContext } from '../context/AppContext';


const QuickActions = () => {

    const {navigate} = useAppContext();

    const icons = [
        { icon: <Plus />, label: "Expense", path: "/addExpense" },
        { icon: <SquareSplitHorizontal />, label: "Split", path: "/split" },
        { icon: <ScanQrCode />, label: "Scan", path: "/scan" },
        { icon: <IndianRupee />, label: "Pay", path: "/settlement" },
    ];

    return (
        <div className="w-full max-w-md">

            <div className="grid grid-cols-4 gap-3 mt-3">

                {icons.map((item, i) => (
                    <button
                        type="button"
                        onClick={()=>navigate(item.path)} 
                        key={item.path || i}
                        aria-label={item.label}
                        className="flex flex-col items-center gap-2 group cursor-pointer rounded-2xl py-2 
                        transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 
                        focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                    >

                        <div className="w-14 h-14 rounded-full bg-[#6366f1]/15 flex items-center justify-center 
                         text-[var(--primary)] shadow-sm ring-1 ring-[#6366f1]/10 transition  group-hover:bg-[#6366f1]/25
                         group-hover:-translate-y-0.5 group-active:scale-95">
                            {item.icon}
                        </div>

                        <span className="text-xs font-medium text-[var(--text-primary)] 
                        transition group-hover:text-[var(--primary)]"
                        >
                            {item.label}
                        </span>

                    </button>
                ))}

            </div>

        </div>
    )
}

export default QuickActions