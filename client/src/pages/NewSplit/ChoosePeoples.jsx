import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useCallback } from 'react';
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";

const ChoosePeoples = () => {

    const { navigate, newSplitData, setNewSplitData, axios } = useAppContext();
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {

        if (!query.trim() || query.trim().length < 2) {
            setSearchResults([]);
            return;
        }

        const searchUsers = async () => {
            try {
                const { data } = await axios.get('/api/search/get', {
                    params: { query }
                });
                if (data.success) {
                    setSearchResults(data.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        searchUsers();

    }, [query]);

    
    const addParticipant = useCallback((users) => {
        console.log(selectedUsers.length);
        if(selectedUsers.length > 0){
            setNewSplitData(prev => ({
                ...prev,
                participants:
                    [...prev.participants,
                        ...users
                    ]
            }));
            setSearchResults([]);
            setQuery('');
        }else{
            toast.warning('Select Anyone!')
        }
        
    }, [setNewSplitData, selectedUsers]);


    const handleInputChange = useCallback((e) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setQuery(value);
        }
    }, []);

    const handleUserSelection = (user) =>{
        setSelectedUsers((prev)=> {
            const alreadySelected = prev.some((selectedUser)=> selectedUser._id === user._id);

            if(alreadySelected){
                return prev;
            }
            return [...prev, user];
        })
    }

    const handleRemoveSelectedUser = (user)=>{
        setSelectedUsers((prev)=> {
            return prev.filter((selectedUser)=> selectedUser._id !== user._id)
        })
    }

    return (
        <div className="flex h-full w-full justify-center bg-[var(--bg-primary)] px-4">
            <div className="flex w-full max-w-md flex-col py-5 md:justify-center">
                <div className="flex-col space-y-5">
                    <div className="text-center">
                        <h2 className="text-base font-semibold text-[var(--text-primary)]">
                            Choose People
                        </h2>
                    </div>

                    <div className="relative">
                        <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base text-[var(--text-secondary)]" />

                        <input
                            type="text"
                            name="userName"
                            onChange={handleInputChange}
                            autoComplete="off"
                            spellCheck="false"
                            value={query}
                            placeholder="Search people"
                            className="w-full rounded-xl border border-[var(--border-color)] bg-transparent py-3 pl-9 pr-3 
                            text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none 
                            focus:ring-2 focus:ring-[var(--primary)]"
                        />
                    </div>

                    <div className="space-y-2">
                        <h6 className="text-sm font-medium text-[var(--text-secondary)]">
                            Split With
                        </h6>

                        {selectedUsers.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {selectedUsers.map((user) => (
                                    <div
                                        key={user._id || user.id}
                                        className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 
                                        bg-[var(--primary)]/10 px-3 py-2"
                                    >
                                        {user.profileImg?
                                            <div className='flex h-6 w-6 shrink-0 rounded-full overflow-hidden'>
                                                <img className='w-full h-full object-cover' src={user.profileImg} alt="profile" />
                                            </div>
                                            :
                                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full 
                                            bg-[var(--primary)] text-xs font-medium text-white"
                                            >
                                                {user.userName?.charAt(0)?.toUpperCase()}
                                            </div>
                                        }

                                        <span className="max-w-28 truncate text-sm font-medium text-[var(--text-primary)]">
                                            {user.userName}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={()=>handleRemoveSelectedUser(user)}
                                            aria-label={`Remove ${user.userName}`}
                                            className="rounded-full p-1 text-[var(--text-secondary)] transition 
                                            hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                                        >
                                            <IoMdClose className="text-sm" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="rounded-xl border border-dashed border-[var(--border-color)] px-4 py-3 text-sm 
                            text-[var(--text-secondary)]"
                            >
                                No people selected
                            </p>
                        )}
                    </div>

                    <div className="min-h-62 max-h-62 space-y-1 overflow-y-auto no-scrollbar pr-1">
                        {searchResults.length > 0 && (

                            searchResults.map((user) => {

                                const isSelected = selectedUsers.some((val) => val._id === user._id);

                                return (
                                    <button
                                        key={user._id}
                                        onClick={()=>handleUserSelection(user)}
                                        type="button"
                                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition 
                                        hover:bg-[var(--bg-secondary)] active:scale-[0.99]"
                                    >

                                        {user.profileImg ?
                                            <div className='flex h-10 w-10 shrink-0 rounded-full overflow-hidden'>
                                                <img className='w-full h-full object-cover' src={user.profileImg} alt="profile" />
                                            </div>
                                            :
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full 
                                            bg-[var(--primary)] text-sm font-medium text-white"
                                            >
                                                {user.userName?.charAt(0)?.toUpperCase()}
                                                
                                            </div>
                                        }

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                                                {user.userName}
                                            </p>
                                            <p className="truncate text-xs text-[var(--text-secondary)]">
                                                {isSelected? "Selected" : "Tap to select"}
                                            </p>
                                        </div>

                                        {isSelected? 
                                            <span className='flex justify-center text-white items-center w-6 h-6 
                                            bg-[var(--primary)] rounded-full'
                                            >
                                                <IoIosCheckmark size={20}/>
                                            </span>
                                            : 
                                            null
                                        }
                                        
                                    </button>
                                )
                            })

                        )}

                    </div>
                </div>

                <button
                    type="button"
                    onClick={()=>addParticipant(selectedUsers)}
                    className="mt-6 w-full rounded-xl bg-[var(--primary)] p-3 text-sm font-medium text-white transition 
                    hover:bg-[var(--primary-dark)]"
                >
                    Continue
                </button>
            </div>
        </div>

    )
}

export default ChoosePeoples