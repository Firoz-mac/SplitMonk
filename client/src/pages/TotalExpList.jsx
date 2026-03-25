import React from 'react'

const TotalExpList = () => {

    const data = [
        {
            date: "25-03-26",
            items: [
                { title: "Birthday Party", amount: 1200 },
                { title: "Snacks", amount: 300 },
            ],
        },
        {
            date: "24-03-26",
            items: [
                { title: "Dinner", amount: 800 },
                { title: "Movie", amount: 500 },
            ],
        },
        {
            date: "24-03-26",
            items: [
                { title: "Dinner", amount: 800 },
                { title: "Movie", amount: 500 },
            ],
        },
        {
            date: "24-03-26",
            items: [
                { title: "Dinner", amount: 800 },
                { title: "Movie", amount: 500 },
            ],
        },
        {
            date: "24-03-26",
            items: [
                { title: "Dinner", amount: 800 },
                { title: "Movie", amount: 500 },
            ],
        },
        {
            date: "24-03-26",
            items: [
                { title: "Dinner", amount: 800 },
                { title: "Movie", amount: 500 },
            ],
        },
    ];

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    }).split("/").join("-");

    return (
        <div className="w-full text-[var(--text)]">
            {data.map((group, index) => (
                <div key={index}>

                    {/* Date Heading */}
                    <div className='py-3'>
                        <h6 className="text-sm text-[var(--text-dull)] mb-2">
                            {formattedDate===group.date ? "Today": group.date}
                        </h6>

                        {/* Items */}
                        {group.items.map((item, i) => (
                            <div key={i} className="flex items-center py-2 border-b border-[var(--border)]">
                                <span className="text-sm truncate">
                                    {item.title}
                                </span>

                                <span className="text-sm font-medium whitespace-nowrap ml-auto">
                                    ₹{item.amount}
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