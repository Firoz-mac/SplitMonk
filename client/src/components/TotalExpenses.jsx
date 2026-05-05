import React, { useEffect, useMemo, useState } from 'react'
import { IoChevronDown, IoArrowForwardOutline, IoNotificationsOutline } from "react-icons/io5";
import { useAppContext } from '../context/AppContext';
import { assets } from '../assets/assets';


const TotalExpenses = () => {

    const { expenses, navigate, user, splits, axios } = useAppContext();
    const [selected, setSelected] = useState("This Month");
    const [youOwe, setYouOwe] = useState(0);
    const [youAreOwed, setYouAreOwed] = useState(0);

    const getGreeting =()=>{
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
    }


    const filteredExpenses = useMemo(() => {
        if (!expenses) return [];

        const now = new Date();

        return expenses.filter((item) => {
            const expenseDate = new Date(item.createdAt);

            switch (selected) {
                case 'Today': {
                    const startOfDay = new Date(now);
                    startOfDay.setHours(0, 0, 0, 0);
                    const endOfDay = new Date(now);
                    endOfDay.setHours(23, 59, 59, 999);
                    return expenseDate >= startOfDay && expenseDate <= endOfDay;
                }
                case 'This Week':{
                    const startOfWeek = new Date(now);
                    const day = now.getDay();
                    const diff = day === 0 ? 6 : day - 1;
                    startOfWeek.setDate(now.getDate() - diff);
                    startOfWeek.setHours(0, 0, 0, 0);

                    const endOfWeek = new Date(now);
                    endOfWeek.setHours(23, 59, 59, 999);
                    return expenseDate >= startOfWeek && expenseDate <= endOfWeek;
                }
                case 'This Month':
                    return (
                        expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear()
                    );
                case 'This Year':
                    return expenseDate.getFullYear() === now.getFullYear();
                default:
                    return true;
            }
        });
    }, [expenses, selected]);

    const totalExpensesAmount = useMemo(() => {
        return filteredExpenses.reduce(
            (sum, item) => sum + (item.amount || 0), 0
        );
    }, [filteredExpenses]);

    const options = ["This Month", "Today", "This Week","This Year"];

    const handleFilter = () =>{
       setSelected((prev)=> {
        const currentIndex = options.indexOf(prev);
        const nextIndex = (currentIndex +1) % options.length;
        return options[nextIndex];
       });
    };

    const getWeeklyComparison = (expenses = []) => {
        const now = new Date();
        const startOfThisWeek = new Date(now);
        startOfThisWeek.setDate(now.getDate() - now.getDay());

        const startOfLastWeek = new Date(startOfThisWeek);
        startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

        let thisWeekTotal = 0;
        let lastWeekTotal = 0;

        expenses.forEach(exp => {
            const date = new Date(exp.createdAt);

            if (date >= startOfThisWeek) {
                thisWeekTotal += exp.amount;
            } else if (date >= startOfLastWeek && date < startOfThisWeek) {
                lastWeekTotal += exp.amount;
            }
        });

        let percentage = 0;
        if (lastWeekTotal > 0) {
            percentage = ((thisWeekTotal - lastWeekTotal) / lastWeekTotal) * 100;
        }

        if (lastWeekTotal === 0) {
            return {
                percentage: thisWeekTotal > 0 ? 100 : 0,
                isIncrease: thisWeekTotal > 0
            };
        }

        return {
            percentage: percentage.toFixed(1),
            isIncrease: thisWeekTotal >= lastWeekTotal
        }
    }

    const { percentage, isIncrease } = useMemo(() =>
        getWeeklyComparison(expenses),
    [expenses]);

    const getBalance = async () => {
        const { data } = await axios.get('/api/balance/get');
        if (data.success) {
            setYouOwe(data.youOwe);
            setYouAreOwed(data.youAreOwed);
        }
    }

    useEffect(() => {
        getBalance();
    }, [user, splits]);

    return (

        <div className="bg-[var(--primary)] px-5 pt-6 pb-16 rounded-b-2xl relative overflow-visible">

            <div className="flex justify-between items-center">

                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/40 shadow-sm">
                        <img
                            src={user && user.profileImg? user.profileImg : assets.profileImg1}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs text-white/70">{getGreeting()}</span>
                        <span className="text-lg font-semibold text-white leading-tight">{user ? user.userName : "User"}</span>
                    </div>
                </div>

                <button 
                    type='button'
                    onClick={()=>navigate('/notifications')}
                    aria-label="Open notifications"
                    className='w-11 h-11 bg-[var(--primary-dark)]/80 backdrop-blur-md rounded-full flex items-center 
                    justify-center cursor-pointer transition hover:scale-105 active:scale-95'
                >
                    <div className="relative">
                        <IoNotificationsOutline className="text-white text-xl" />
                        <div className='bg-red-500 w-2.5 h-2.5 ring-2 ring-[var(--primary-dark)] 
                        rounded-full absolute -top-0.5 -right-0.5'
                        ></div>
                    </div>
                </button>
            </div>

            <div className="relative flex flex-col items-center mt-8 text-white gap-2">
                
                <button 
                    onClick={handleFilter} 
                    className="flex items-center gap-1.5 text-xs bg-white/20 px-3 py-1.5 
                    rounded-full backdrop-blur-sm cursor-pointer transition hover:bg-white/25"
                >
                    {selected}
                </button>

                <span className="text-5xl sm:text-6xl font-bold tracking-tight mt-2 tabular-nums">
                    ₹{totalExpensesAmount}
                </span>

                <span className={'text-xs text-white/70'}>
                    {isIncrease ? '+' : ''}{percentage}% from last week
                </span>
            </div>

            <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 w-[90%] max-w-sm">
                <div className="flex justify-between items-center bg-[var(--bg-primary)] 
                rounded-2xl px-5 py-4 shadow-xl border border-black/5"
                >

                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-[#6366f1]/30 rounded-full flex items-center 
                        justify-center text-[var(--primary)] shrink-0"
                        >
                            <IoArrowForwardOutline className='rotate-310 text-2xl'/>
                        </div>

                        <div className="flex flex-col text-[var(--text-primary)] min-w-0">
                            <span className="text-xs text-[var(--text-secondary)]">You Owe</span>
                            <span className="font-semibold tabular-nums">{youOwe}</span>
                        </div>
                    </div>

                    <div className="w-px h-10 bg-gray-200 mx-4"></div>

                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-[#6366f1]/30 rounded-full flex items-center 
                        justify-center text-[var(--primary)] shrink-0">
                            <IoArrowForwardOutline className='rotate-120 text-2xl'/>
                        </div>
                        <div className="flex flex-col text-[var(--text-primary)] min-w-0">
                            <span className="text-xs text-[var(--text-secondary)]">You Get</span>
                            <span className="font-medium tabular-nums">{youAreOwed}</span>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default TotalExpenses