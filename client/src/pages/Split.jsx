import React, { useEffect, useState, useCallback } from 'react'
import ActivePageIndicator from '../components/ActivePageIndicator'
import Categories from '../components/Categories'
import { useAppContext } from '../context/AppContext'
import InputField from '../components/InputField'
import { toast } from 'react-toastify'
import { CiSearch } from "react-icons/ci";
import SelectedUserChip from '../components/SelectedUserChip'
import SelectableUserRow from '../components/SelectableUserRow'
import RemainigSplitAmountCard from '../components/RemainigSplitAmountCard'
import SplitParticipants from '../components/SplitParticipants'

const Split = () => {

    const {navigate, newSplitData, setNewSplitData, axios} = useAppContext();
    const [pageValue, setPageValue] = useState('Create Split');

    //create split

    const handleInputChange = (e) =>{
        const {name, value} = e.target;

        if (name === "amount" && !/^\d*\.?\d*$/.test(value)) {
            return;
        }
        
        setNewSplitData((prev)=>({
            ...prev,
            [name]:value
        }))
    };

    const handleCategoryChange = (category) =>{
        setNewSplitData((prev)=>({
            ...prev,
            category,
        }))
    };

    //choose people

    const [query, setQuery] = useState('');
    const [searchResult, setSearchResult]=useState([]);
    const [selectedUsers, setSelectedUsers]=useState([]);

    const handleSearchQueryChange = (e)=>{
        const value = e.target.value;
        if(value.length <= 50){
            setQuery(value);
        }
    };

    useEffect(()=>{
        if(pageValue !== 'Choose Peoples') return;

        if(!query.trim() || query.trim().length < 2){
            setSearchResult([]);
            return;
        }

        const search =async ()=>{

            try {
                const {data} = await axios.get('/api/search/get',{
                    params: { query }
                });

                if(data.success){
                    setSearchResult(data.data)
                }
            } catch (error) {
                console.log(error.message);
            }
        }

        search();


    },[query, axios, pageValue]);

    const handleSelectUser = (user)=>{
        setSelectedUsers((prev)=>{

            const isAlreadySelected = prev.some((selectedUser) => selectedUser._id === user._id);
            if(isAlreadySelected) return prev;

            return [...prev, user];
        });
    };

    const handleRemoveSelectedUser = (user)=>{
        setSelectedUsers((prev)=>
            prev.filter((selectedUser) => selectedUser._id != user._id)
        );
    };


    //split

    const [splitEqually, setSplitEqually] = useState(true);
    const [remainingBalance, setRemainingBalance] = useState(0);

    const handleSplitAmountCalculation = () =>{
        if(!splitEqually) return;
       
        const totalAmount = Number(newSplitData.amount || 0);
        const numberOfParticipants = newSplitData.participants.length + 1;
        const equalSplitAmount = totalAmount/numberOfParticipants;

        const participants = newSplitData.participants.map((participant) =>({
            ...participant,
            amount: equalSplitAmount,
        }));

        
        setNewSplitData((prev)=>({
            ...prev,
            participants
        }));

        setRemainingBalance(equalSplitAmount);

    };

    const handleCustomAmount = (e, user)=>{

        if(splitEqually) return;

        const userId = user._id;
        const value = e.target.value;
        
        setNewSplitData((prev)=>({
            ...prev,
            participants: prev.participants.map((participant)=>
                participant._id === userId
                    ? { ...participant, amount: value === "" ? "" : Number(value) }
                    : participant
            )
        }));

    }

    const handleSplitTypeChange = (checked) =>{
        setSplitEqually(checked);

        setNewSplitData((prev)=>({
            ...prev,
            splitType: checked ? "equal" : "custom",
            participants: checked 
                ? prev.participants
                :prev.participants.map((participant) => ({
                    ...participant,
                    amount: "",
                })),
        }));

        if(!checked){
            setRemainingBalance(Number(newSplitData.amount || 0));
        }
    };

    useEffect(()=>{

        if(splitEqually) return;

        const totalAmount = Number(newSplitData.amount || 0);

        const usedAmount = newSplitData.participants.reduce(
            (sum, participant) => sum + Number(participant.amount || 0), 0
        );
        

        setRemainingBalance(totalAmount - usedAmount);

    },[splitEqually, newSplitData.amount, newSplitData.participants])


    useEffect(()=>{

        if(pageValue !== 'Split') return;
        if (!splitEqually) return;

        handleSplitAmountCalculation()

    },[pageValue, newSplitData.amount, newSplitData.participants.length, splitEqually])


    
    //final button

    const handleCreateSplit =async (payLoad)=>{
        try {
            const {data} = await axios.post('/api/split/add', payLoad);

            if(data.success){
                toast.success('Split Created');
                setNewSplitData(
                    {
                        title: '',
                        category:'',
                        amount: '',
                        creatorAmount:'',
                        splitType: 'equal',
                        participants: []
                    }
                )

                navigate('/home');
            }
        } catch (error) {
            console.log(error.message);
            toast.error('Failed to create split');
        }
    }

    const handleSubmit = () =>{

        if(pageValue === 'Create Split'){
            const isFormValid = newSplitData.amount && newSplitData.title && newSplitData.category;

            if(!isFormValid){
                toast.warning("You missed something!");
                return;
            }
            setPageValue('Choose Peoples');
        }

        if(pageValue === 'Choose Peoples'){
            const isFormValid = selectedUsers?.length > 0;

            if(!isFormValid){
                toast.warning("You missed something!");
                return;
            }
            setNewSplitData((prev)=>({
                ...prev,
                participants: selectedUsers
            }));
            setPageValue('Split');

        }

        if(pageValue === 'Split'){
            const hasEmptyAmount = newSplitData.participants.some(
                (participant) => String(participant.amount ?? "").trim() === ""
            );

            if(hasEmptyAmount){ 
                toast.warning("you missed something!");
                return;
            }

            if(!splitEqually && remainingBalance < 0){
                toast.warning("Split amount is greater than total amount!");
                return;
            }

            const payLoad = {
                ...newSplitData,
                creatorAmount: remainingBalance,
            }

            handleCreateSplit(payLoad)

        }
    };

    return (
        <div className='w-full h-full flex md:justify-center'>
            <div className='w-full h-full max-w-md flex flex-col px-5 md:py-10'>

                <div className='flex flex-col items-center gap-5 p-5'>

                    <ActivePageIndicator activePage={pageValue} />
                    <h2 className="text-md font-medium">{pageValue}</h2>

                </div>

                <div className='flex-1 min-h-0'>

                    {
                        pageValue === 'Create Split'? (
                            <form className='space-y-5'>

                                <InputField
                                    label='Split Title'
                                    type='text'
                                    name='title'
                                    value={newSplitData.title}
                                    placeholder="eg. Blis Cafe"
                                    onChange={handleInputChange}
                                />
                                
                                <InputField 
                                    label='Amount'
                                    name='amount'
                                    value={newSplitData.amount}
                                    amountField={true}
                                    onChange={handleInputChange}
                                />

                                <div className='flex flex-col gap-2'>
                                    <span className="text-sm font-medium text-[var(--text-primary)]">
                                        Category
                                    </span>
                                    <Categories value={newSplitData.category} onChange={handleCategoryChange}/>
                                </div>

                            </form>
                        )

                        :

                        pageValue === 'Choose Peoples'? (

                            <div className='flex flex-col w-full h-full min-h-0 gap-2 pb-2'>
                                
                                <div className='relative shrink-0'>

                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]">
                                        <CiSearch className='text-lg'/>
                                    </span>

                                    <input 
                                        type="text"
                                        onChange={handleSearchQueryChange}
                                        placeholder='Search eg. Mac'
                                        className='w-full pl-10 py-3 rounded-xl border border-[var(--border-color)] 
                                        focus:outline-none focus:ring-2 focus:ring-primary text-sm'
                                    />
                                </div>

                                <div className='flex flex-col shrink-0 gap-2'>

                                    <span className="text-sm font-medium text-[var(--text-secondary)] pt-2">Split With</span>

                                    {
                                        selectedUsers?.length > 0 ? (

                                            <div className='flex flex-wrap gap-2 py-3'>

                                                {selectedUsers.map((user)=>(
                                                    <SelectedUserChip 
                                                        user={user} 
                                                        onRemove={handleRemoveSelectedUser} 
                                                        key={user._id}
                                                    />
                                                ))}

                                            </div>

                                        )

                                        :
                                
                                        <span className='rounded-xl border border-dashed border-[var(--border-color)] px-4 py-3
                                        text-sm text-[var(--text-secondary)] text-center'
                                        >
                                            No people selected
                                        </span>

                                    }

                                </div>

                                <div className='flex-1 min-h-0 overflow-y-scroll no-scrollbar'>
                                    
                                    {searchResult.map((user)=>(
                                        <SelectableUserRow  
                                            user={user} 
                                            onClick={handleSelectUser} 
                                            key={user._id} 
                                            alreadySelected={
                                                selectedUsers?.some((selectedUser) => selectedUser._id === user._id) || false
                                            }
                                        />
                                    ))}

                                </div>

                            </div>
                        )

                        :

                        pageValue === 'Split'? (

                            <div className='flex flex-col w-full h-full min-h-0 gap-2 pb-2'>

                                <RemainigSplitAmountCard 
                                    title={newSplitData.title} 
                                    total={newSplitData.amount} 
                                    remaining={remainingBalance}
                                    splitEqually={splitEqually}
                                />

                                <div className="flex items-center justify-between py-3">

                                    <span className='text-sm font-medium text-[var(--text-primary)]'>
                                        Split Equally
                                    </span>

                                    <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">

                                        <input 
                                            type="checkbox"
                                            className="peer sr-only"
                                            checked={splitEqually}
                                            onChange={(e)=>handleSplitTypeChange(e.target.checked)}
                                        />

                                        <span className='h-6 w-11 rounded-full bg-slate-300 transition-colors 
                                        duration-200 peer-checked:bg-[var(--primary)] peer-focus:ring-2
                                        peer-focus:ring-[var(--primary)]/30'></span>

                                        <span className='absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm
                                        transition-transform duration-200 peer-checked:translate-x-5'></span>

                                    </label>

                                </div>

                                <div className='flex-1 overflow-y-scroll no-scrollbar'>

                                    {newSplitData.participants.map((user)=>(
                                        <SplitParticipants 
                                            user={user} 
                                            splitEqually={splitEqually} 
                                            key={user._id} 
                                            onChange={handleCustomAmount}
                                        />
                                    ))}

                                    
                                </div>

                            </div>

                        )

                        : null
                    }

                </div>

                <button
                    onClick={handleSubmit}
                    type='button'
                    className='w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white p-2 
                    rounded-lg cursor-pointer'
                >

                    {pageValue === 'Split'? 'Create Split' : 'Continue'}
                    
                </button>

            </div>
        </div>
    )
}

export default Split