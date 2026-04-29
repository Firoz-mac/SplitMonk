import React, { useState } from 'react'
import { IoChevronDown } from "react-icons/io5";

const People = () => {

    const [open, setOpen] = useState(false);
    const peopleLimit = 7;

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


    const visiblePeople = open ? people : people.slice(0, peopleLimit);

    const handleMore = () =>{
        setOpen((prev) => !prev);
    };

    return (
        <div className="w-full max-w-md mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                    People
                </h2>
            </div>
            {people.length !== 0 ? 
                (
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-4 text-[var(--text-secondary)]">

                        {visiblePeople.map((person, i) => (
                            <button 
                                key={i}
                                type="button"
                                aria-label={person.name}
                                className="flex flex-col items-center gap-1 cursor-pointer rounded-2xl py-1
                                transition group active:scale-95 focus-visible:outline-none 
                                focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                            >
                                <div className="w-14 h-14 rounded-full overflow-hidden border border-[var(--border-color)] 
                                shadow-sm transition group-hover:ring-2 group-hover:ring-[var(--primary)] group-hover:ring-offset-2"
                                >
                                    <img
                                        src={`https://i.pravatar.cc/150?img=${person.img}`}
                                        alt={person.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <span className="text-xs truncate w-14 text-center transition group-hover:text-[var(--primary)]">
                                    {person.name}
                                </span>
                            </button>
                        ))}

                        {people.length > peopleLimit && (
                            <button
                                type="button"
                                onClick={handleMore}
                                aria-expanded={open}
                                aria-label={open ? "Show fewer people" : "Show more people"}
                                className="flex flex-col items-center gap-1 cursor-pointer rounded-2xl py-1 transition 
                                group active:scale-95 focus-visible:outline-none focus-visible:ring-2 
                                focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                            >
                                <div className="w-14 h-14 rounded-full bg-[var(--bg-secondary)] flex items-center 
                                justify-center transition group-hover:bg-[#6366f1]/15 group-hover:text-[var(--primary)">
                                    <IoChevronDown className={`transition ${open ? "rotate-180" : ""}`}/>
                                </div>

                                <span className="text-xs text-center transition group-hover:text-[var(--primary)]">
                                    {open ? "Less" : "More"}
                                </span>
                            </button>
                        )}
                    </div>
                )
                :
                (
                    <div className='text-[var(--text-primary)]'>
                        <div className="flex flex-col items-center justify-center py-8 text-center">

                            <p className="text-sm font-medium">
                                No people yet
                            </p>

                            <p className="text-xs text-[var(--text-secondary)] mt-1">
                                Split Money to get started
                            </p>

                            <button
                                type="button" 
                                className="mt-4 px-4 py-2 text-sm bg-[var(--primary)] text-white 
                                rounded-full cursor-pointer transition hover:bg-[var(--primary-dark)] active:scale-95"
                            >
                                Split Money
                            </button>

                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default People