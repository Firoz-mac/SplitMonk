import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext';

const TotalExpList = () => {

    const {expenses} = useAppContext();

    const groupedExpenses = expenses?.reduce((acc, item) => {
        const date = new Date(item.createdAt)
        .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        })
        .split("/").join("-");

        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
        
    },{});

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    }).split("/").join("-");

    return (
        <div className="w-full text-[var(--text)]">
            {Object.entries(groupedExpenses || {}).map(([date, items], index) => (
                <div key={index}>

                    {/* Date Heading */}
                    <div className='py-3'>
                        <h6 className="text-sm text-[var(--text-dull)] mb-2">
                            {formattedDate===date ? "Today": date}
                        </h6>

                        {/* Items */}
                        {items.map((item, i) => (
                            <div key={i} className="flex items-center py-2 border-b border-[var(--border)]">
                                <span className="text-sm truncate">
                                    {item.title}
                                </span>

                                <span className="text-sm font-medium whitespace-nowrap ml-auto">
                                    ₹ {item.amount}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    )
}

export default TotalExpList