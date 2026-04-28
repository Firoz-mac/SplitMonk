import React, { useState } from 'react'
import { IoChevronDown, IoArrowForwardOutline } from "react-icons/io5";

const People = () => {

    const [open, setOpen] = useState(false);
    const [limit, setLimit] = useState(7)

    const people = [
        { name: "Aman", img: 1 },
        { name: "Riya", img: 2 },
        { name: "John", img: 3 },
        { name: "Sara", img: 4 },
        { name: "Ali", img: 5 },
        { name: "Neo", img: 6 },
        { name: "Max", img: 7 },
        { name: "Max", img: 8 },
        { name: "Max", img: 9 },
        { name: "Max", img: 10 },
        { name: "Max", img: 11 },
        { name: "Max", img: 12 },
        { name: "Max", img: 13 },
        { name: "Max", img: 14 },
        { name: "Max", img: 15 },
        { name: "Max", img: 16 },
        { name: "Max", img: 17 },
        { name: "Max", img: 18 },
    ];


    const visiblePeople = people.slice(0, limit);

    const handleMore = () =>{
        const nextOpen = !open;
        setOpen(nextOpen);

        if(nextOpen){
            setLimit(people.length)
        }
        else{
            setLimit(7)
        }
    };

    return (
        <div className="w-full max-w-md mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-medium">
                    People
                </h2>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 text-[var(--text-secondary)]">

                {visiblePeople.map((person, i) => (
                    <button key={i} className="flex flex-col items-center gap-1 cursor-pointer">
                        <div className="w-14 h-14 rounded-full overflow-hidden border border-[var(--border-color)]">
                            <img
                                src={`https://i.pravatar.cc/150?img=${person.img}`}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <span className="text-xs truncate w-14 text-center">
                            {person.name}
                        </span>
                    </button>
                ))}
                <button onClick={handleMore} className="flex flex-col items-center gap-1 cursor-pointer">
                    <div className="w-14 h-14 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center transition">
                        <IoChevronDown className={`transition ${open ? "rotate-180" : ""}`}/>
                    </div>

                    <span className="text-xs text-center">
                        More
                    </span>
                </button>
            </div>
            {/* <div className='text-[var(--text-primary)]'>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-sm font-medium">
                        No people yet
                    </p>
                    <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Split Money to get started
                    </p>
                    <button className="mt-4 px-4 py-2 text-sm bg-[var(--primary)] text-white rounded-full cursor-pointer">
                        Split Money
                    </button>
                </div>
            </div> */}
        </div>
    )
}

export default People