import React from 'react'
import { UserRoundCog, UsersRound, Plus, SquareSplitHorizontal, AudioLines, ScanQrCode, IndianRupee, CircleGauge, History, Trophy, Handshake } from 'lucide-react';
import { useAppContext } from '../context/AppContext';


const QuickActions = () => {
    const {navigate} = useAppContext();
    const icons = [
        { icon: <Plus />, label: "Expense", path: "/addExpense" },
        { icon: <SquareSplitHorizontal />, label: "Split", path: "/split" },
        { icon: <ScanQrCode />, label: "Scan", path: "/scan" },
        { icon: <IndianRupee />, label: "Pay", path: "/settilement" },
    ]
    return (
        <div className="w-full max-w-md">

            <div className="flex justify-between mt-3">

                {icons.map((item, i) => (
                    <button onClick={()=>navigate(item.path)} key={i} className="flex flex-col items-center gap-2 group cursor-pointer">

                        <div className="w-14 h-14 rounded-full bg-[#6366f1]/30 flex items-center justify-center 
                         transition active:scale-95 text-[var(--primary)]">
                            {item.icon}
                        </div>

                        <span className="text-xs text-[var(--text-primary)]">{item.label}</span>

                    </button>
                ))}

            </div>

        </div>
    )
}

export default QuickActions