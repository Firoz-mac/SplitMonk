import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { assets } from './../assets/assets';

const NewExpenses = () => {
    const { axios, setExpenses, getMonthlyLimit } = useAppContext();
    const [selected, setSelected] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [expense, setExpense] = useState({
        title: '',
        amount: '',
        category: ''
    });
    const isDisable = !expense.title || !expense.amount || !expense.category || !selected;
    const categories = [
        {
            title: "Food",
            icon: assets.foodIcon
        },
        {
            title: "Travel",
            icon: assets.travelIcon
        },
        {
            title: "Shopping",
            icon: assets.shoppingIcon
        },
        {
            title: "Other",
            icon: null
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense({
            ...expense,
            [name]: value
        });
    };

    const saveExpense = async () => {

        try {
            const { data } = await axios.post('/api/expense/add', { expense });
            if (data.success) {
                setExpenses(prev => [data.data, ...prev]);
                getMonthlyLimit();

                setExpense({
                    title: '',
                    amount: '',
                    category: ''
                });

                setSelected(null);

                return true;
            }

            toast.error('Failed to add expense');

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
            return false;
        }
    };

    const handleSubmit = async () => {
        if (isDisable || isSaving) return;

        setIsSaving(true);

        const success = await saveExpense();

        setIsSaving(false);

        if(success){
            toast.success('New Expense Added');
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter' && !isDisable && !isSaving) {
                handleSubmit();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isDisable, isSaving, expense, selected]);

    return (

        <div className='w-screen h-screen flex justify-center'
        >
            <div className='w-full max-w-md px-5 py-10 space-y-10 
                flex flex-col md:justify-center'
            >
                <div>
                    <h3 className='font-medium text-lg'>Add new expense</h3>
                    <p className='text-sm text-[var(--text-secondary)]'>
                        Enter the details of your expense to help you track your spending.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--text-secondary)]">
                            Enter Amount
                        </label>

                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-sm">
                                ₹
                            </span>

                            <input
                                onChange={handleChange}
                                type="number"
                                inputMode="decimal"
                                name='amount'
                                value={expense.amount}
                                pattern="[0-9]*"
                                placeholder="0.00"
                                className='w-full pl-8 pr-3 py-3 rounded-xl border 
                                border-[var(--border-color)] focus:outline-none 
                                focus:ring-2 focus:ring-primary text-sm'

                            />
                        </div>

                        <div className="flex gap-2 mt-1">
                            {[100, 500, 1000, 2000].map(amt => (
                                <button
                                    type="button"
                                    key={amt}
                                    onClick={() =>
                                        setExpense((prev) => ({
                                            ...prev,
                                            amount: amt.toString(),
                                        }))
                                    }
                                    className="px-3 py-1 text-sm hover:bg-[var(--bg-secondary)]
                                    rounded-full border border-[var(--border-color)] cursor-pointer"
                                >
                                    ₹{amt}
                                </button>
                            ))}
                        </div>

                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-[var(--text-secondary)]">
                            What was it for?
                        </label>

                        <div>
                            <input
                                type="text"
                                onChange={handleChange}
                                name='title'
                                value={expense.title}
                                placeholder="e.g. Coffee"
                                className="w-full pl-3 py-3 rounded-xl border border-[var(--border-color)] 
                                focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 relative">
                        <label className="text-sm font-medium text-[var(--text-secondary)]">
                            Category
                        </label>

                        <div className="grid grid-cols-2 gap-3">
                            {categories.map((cat) => (
                                <button
                                    type="button"
                                    key={cat.title}
                                    onClick={() => {
                                        setSelected(cat)
                                        setExpense((prev) => ({
                                            ...prev,
                                            category: cat.title,
                                        }));
                                    }}

                                    className={`flex items-center cursor-pointer gap-3 p-3 rounded-xl border text-sm transition
                                    ${selected?.title === cat.title
                                            ? "border-[var(--primary)] bg-[var(--primary)]/10"
                                            : "border-[var(--border-color)] bg-[var(--bg-primary)]"
                                        }`}
                                >
                                    {cat.icon && <img className="w-5" src={cat.icon} alt="" />}
                                    <span>{cat.title}</span>
                                </button>

                            ))}
                        </div>

                    </div>

                </div>
                <button 
                    onClick={handleSubmit}
                    disabled={isDisable || isSaving} 
                    className='w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] 
                    text-white p-2 rounded-lg cursor-pointer'
                >
                    {isSaving ? 'Saving...' : 'Add expense'}
                </button>
            </div>
        </div>
    )
}

export default NewExpenses