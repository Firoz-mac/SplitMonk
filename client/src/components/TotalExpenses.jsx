import React, { useEffect, useMemo, useState } from 'react'
import { IoChevronDown } from "react-icons/io5";
import { MdOutlineAdd } from "react-icons/md";
import { useAppContext } from '../context/AppContext';

const TotalExpenses = () => {

    const { expenses, navigate } = useAppContext();
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("This Month");

    const filteredExpenses = useMemo(() => {
        if (!expenses) return [];

        const now = new Date();

        return expenses.filter((item) => {
            const expenseDate = new Date(item.createdAt);

            switch (selected) {
                case 'Today':
                    const startOfDay = new Date(now);
                    startOfDay.setHours(0, 0, 0, 0);
                    const endOfDay = new Date(now);
                    endOfDay.setHours(23, 59, 59, 999);
                    return expenseDate >= startOfDay && expenseDate <= endOfDay;

                case 'This Week':
                    const startOfWeek = new Date(now);
                    const day = now.getDay();
                    const diff = day === 0 ? 6 : day - 1;
                    startOfWeek.setDate(now.getDate() - diff);
                    startOfWeek.setHours(0, 0, 0, 0);

                    const endOfWeek = new Date(now);
                    endOfWeek.setHours(23, 59, 59, 999);
                    return expenseDate >= startOfWeek && expenseDate <= endOfWeek;

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

    const options = ["Today", "This Week", "This Month", "This Year"];

    const getWeeklyComparison = (expenses) => {
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
                percentage: 100,
                isIncrease: true
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

    return (

        <div className='flex flex-col gap-5 bg-[var(--bg-card)]/80 backdrop-blur-md p-6 rounded-2xl border 
            border-[var(--border)] shadow-sm w-full h-full'>

            <div className='flex justify-between items-center'>
                <span className='text-xs text-[var(--text-dull)] font-medium'>
                    Total Expenses
                </span>

                <div className='relative'>
                    <button onClick={() => setOpen(!open)}
                        className='flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs bg-[var(--bg-card-hover)] 
                        hover:bg-[var(--border)] transition-all duration-200'>
                        {selected}
                        <IoChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
                    </button>

                    {open && (
                        <div className='absolute right-0 mt-2 w-40 bg-[var(--bg-card)] rounded-xl shadow-xl border 
                            border-[var(--border)] overflow-hidden z-50'>
                            {options.map((option) => (
                                <div key={option} onClick={() => { setSelected(option); setOpen(false); }}
                                    className="px-4 py-2 text-xs hover:bg-[var(--bg-card-hover)] transition cursor-pointer">
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <span className='text-4xl font-semibold tracking-tight'>
                    ₹{totalExpensesAmount}
                </span>
                <span className={`text-xs ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
                    {isIncrease ? '+' : ''}{percentage}% from last week
                </span>
            </div>

            <button onClick={() => navigate('/addExpense')} className='flex items-center justify-center gap-2 bg-[var(--primary)] hover:opacity-90 
                py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95 cursor-pointer'>
                <MdOutlineAdd />
                New Expense
            </button>
        </div>
    )
}

export default TotalExpenses