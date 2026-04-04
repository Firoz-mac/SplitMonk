import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { IoClose } from "react-icons/io5";
import { useAppContext } from '../../context/AppContext';
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useRef } from 'react';
import { useCallback } from 'react';

const ChoosePeoples = () => {

    const {navigate, newSplitData, setNewSplitData, axios} = useAppContext();
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);
    const timeoutRef = useRef(null);
    

    useEffect(()=>{

        if(timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }

        if (!query.trim() || query.trim().length < 2) {
            setSearchResults([]);
            setIsSearching(false);
            return;
        }

        setIsSearching(true);
        setError(null);

        timeoutRef.current = setTimeout(async ()=>{
            try {
                console.log('Searching for:', query);
                const {data} = await axios.get('/api/search/get', {
                    params:{query : query.trim()},
                    timeout: 10000,
                    withCredentials: true
                });
                // const response = await fetch(`/api/search/get?query=${encodeURIComponent(query.trim())}`, {
                //     method: 'GET',
                //     headers:{
                //         'Content-Type': 'application/json'
                //     }
                // });

                // if (!response.ok) {
                //     throw new Error(`HTTP ${response.status}`);
                // }
                // const data = await response.json();
                console.log('Search results:', data);
                setSearchResults(data.data || []);
            } catch (error) {
                console.error('Search error:', error);
                setError(error.message);
                setSearchResults([]);
                if (error.message !== 'canceled') {
                    toast.error('Search failed. Please check your connection.');
                }
            } finally{
                setIsSearching(false);
            }
        }, 800);

        return ()=> {  
            if (timeoutRef.current){
                clearTimeout(timeoutRef.current);
            }
        };

    },[query, axios]);

    const addParticipant = useCallback((user)=>{
        setNewSplitData(prev=>{
            if(prev.participants.some(p=> p.userId === user._id)){
                return prev;
            }

            return{
                ...prev,
                participants: 
                    [...prev.participants, 
                        {   
                            userId: user._id,
                            userName: user.userName,
                            profileImg: user.profileImg,
                            amount: 0
                        }
                    ]
            }
        });
        setSearchResults([]);
        setQuery('');
    }, [setNewSplitData]);

    const removeParticipant = useCallback((userId)=>{
        setNewSplitData(prev=>({
            ...prev,
            participants: prev.participants.filter(p=> p.userId !== userId)
        }));
    }, [setNewSplitData]);

    const handleClick= useCallback(()=>{
        if(newSplitData.participants.length > 0){
            navigate('/split-amount');
        }else{
            toast.error('Choose participants');
        }
    },  [newSplitData.participants.length, navigate]);

    const handleInputChange = useCallback((e)=>{
        const value = e.target.value;
        if(value.length<=50){
            setQuery(value);
        }
    },[]);

    return (
        <div className='w-full max-w-md flex flex-col gap-5'>
            <FaArrowLeft onClick={()=>navigate(-1)} className='text-xl text-[var(--text)] hover:text-[var(--text-dull)] cursor-pointer'/>
            <div className='flex items-center gap-2 text-xs'>
                <div className='
                    w-6 h-6 rounded-full 
                    bg-blue-500 text-white 
                    flex items-center justify-center
                    font-medium
                '>2</div>

                <span className='text-[var(--text-dull)]'>of</span>

                <div className='
                    w-6 h-6 rounded-full 
                    bg-[var(--bg-card-hover)] 
                    text-[var(--text)]
                    flex items-center justify-center
                '>3</div>
            </div>
            <div>
                <h3 className='text-2xl md:text-3xl font-semibold leading-snug'>
                    Choose people <br className='hidden sm:block' /> in this split.
                </h3>

                <p className='text-sm text-[var(--text-dull)] mt-1'>
                    Search for a name in your list
                </p>
            </div>

            <div className='flex flex-wrap gap-2 max-w-full'>
                {newSplitData.participants.map((p, index)=>(
                    <div key={index} className='flex flex-col w-fit items-center gap-1'>
                        <div className='relative'>
                            <div className='w-12 h-12 rounded-full overflow-hidden'>
                                <img className='w-full h-full object-cover' src={p.profileImg || assets.profileImg1} alt="" />
                            </div>
                            <div onClick={()=>removeParticipant(p.userId)} className='absolute top-0 right-0 w-5 h-5 rounded-full flex items-center justify-center
                        bg-gray-500 text-white text-xs cursor-pointer'>
                                <IoClose size={12} />
                            </div>
                        </div>
                        <span className='text-xs'>{p.userName}</span>
                    </div>
                ))}
            </div>

            <input
                type='text'
                placeholder="Username"
                onChange={handleInputChange}
                value={query}
                autoComplete="off"
                spellCheck="false"
                className="
                        w-full py-3 px-4 rounded-xl
                        bg-[var(--bg-card)] border border-[var(--border)]
                        text-[var(--text)] placeholder:text-[var(--text-dull)]
                        focus:outline-none focus:border-blue-500
                        focus:ring-2 focus:ring-blue-500/20
                        transition
                    "
            />
            {query && query.trim().length > 0 && (
                <div className="text-xs text-[var(--text-dull)] px-2 space-y-1">
                    <div>Searching for: "{query}" | Results: {searchResults.length}</div>
                    {isSearching && <div className="text-blue-500">⏳ Searching...</div>}
                    {error && <div className="text-red-500">⚠️ Error: {error}</div>}
                    {!isSearching && query.trim().length < 2 && query.trim().length > 0 && (
                        <div className="text-yellow-500">⚠️ Type at least 2 characters</div>
                    )}
                </div>
            )}
            {searchResults.length > 0 && (
                <div className='bg-[var(--bg-card)] h-42 flex flex-col gap-1 p-3 overflow-scroll no-scrollbar rounded-lg'>
                    {searchResults.map((item, index)=>(
                        <div key={index} onClick={()=>addParticipant(item)} className=' flex items-center gap-2 cursor-pointer py-1'>
                            <div className='w-10 h-10 rounded-full overflow-hidden'>
                                <img className='w-full h-full object-cover' src={item.profileImg? item.profileImg: assets.profileImg1} alt="" />
                            </div>
                            <span className='text-sm'>{item.userName}</span>
                        </div>
                    ))}
                </div>
            )}
            {!isSearching && query.trim().length >= 2 && searchResults.length === 0 && !error && (
                <div className='bg-[var(--bg-card)] p-4 rounded-lg text-center text-[var(--text-dull)]'>
                    No users found for "{query}"
                </div>
            )}
            <button onClick={handleClick} className='w-full py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600
                text-white font-medium hover:opacity-90 active:scale-95 transition-all duration-200
                shadow-[0_5px_15px_rgba(59,130,246,0.4)] cursor-pointer'>
                Continue
            </button>
        </div>
    )
}

export default ChoosePeoples