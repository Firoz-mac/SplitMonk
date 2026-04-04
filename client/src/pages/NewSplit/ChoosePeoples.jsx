// import React, { useEffect, useState } from 'react'
// import { assets } from '../../assets/assets'
// import { IoClose } from "react-icons/io5";
// import { useAppContext } from '../../context/AppContext';
// import { FaArrowLeft } from "react-icons/fa6";
// import { toast } from 'react-toastify';
// import { useRef } from 'react';
// import { useCallback } from 'react';

// const ChoosePeoples = () => {

//     const {navigate, newSplitData, setNewSplitData, axios} = useAppContext();
//     const [searchResults, setSearchResults] = useState([]);
//     const [query, setQuery] = useState('');
//     const [isSearching, setIsSearching] = useState(false);
//     const [error, setError] = useState(null);
//     const timeoutRef = useRef(null);
//     const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
//     const [baseUrl, setBaseUrl] = useState(window.location.origin);

    

//     useEffect(()=>{

//         if(timeoutRef.current){
//             clearTimeout(timeoutRef.current);
//         }

//         if (!query.trim() || query.trim().length < 2) {
//             setSearchResults([]);
//             setIsSearching(false);
//             return;
//         }

//         setIsSearching(true);
//         setError(null);

//         timeoutRef.current = setTimeout(async ()=>{
//             try {
//                 console.log('Searching for:', query);
//                 console.log('Is iOS device:', isIOS);

//                 const config = {
//                     params: { query: query.trim() },
//                     timeout: 10000,
//                     withCredentials: true,
//                     headers: {
//                         'Cache-Control': 'no-cache',
//                         'Pragma': 'no-cache',
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json'
//                     }
//                 };

//                 if (isIOS) {
                    
//                     const response = await fetch(`${baseUrl}/api/search/get?query=${encodeURIComponent(query.trim())}`,{
//                         method: 'GET',
//                         headers: {
//                             'Accept': 'application/json',
//                             'Content-Type': 'application/json',
//                             'Cache-Control': 'no-cache',
//                             'Pragma': 'no-cache'
//                         },
//                         credentials: 'include',
//                         cache: 'no-store',
//                         mode: 'cors'
//                     });

//                     console.log('Response status:', response.status);
//                     console.log('Response ok:', response.ok);

//                     if (!response.ok) {
//                         const errorText = await response.text();
//                         console.error('Error response:', errorText);
//                         throw new Error(`HTTP ${response.status}`);
//                     }

//                     const data = await response.json();
//                     console.log('Search results data:', data);
//                     setSearchResults(data.data || []);

//                     if (data.data && data.data.length === 0){
//                         console.log('No users found for query:', query);
//                     }

//                 }else{
//                     const {data} = await axios.get('/api/search/get', config);
//                     console.log('Search results:', data);
//                     setSearchResults(data.data || []);
//                 }
  
//             } catch (error) {
//                 console.error('Search error:', error);
//                 console.error('Error name:', error.name);
//                 console.error('Error message:', error.message);
//                 setError(error.message);
//                 setSearchResults([]);

//                 if (isIOS) {
//                     if (error.message.includes('Failed to fetch')) {
//                         toast.error('iOS: Network request failed. Check your internet connection.');
//                     }else if (error.message.includes('CORS')){
//                         toast.error('iOS: CORS error. Please contact support.');
//                     }
//                 } else {
//                     toast.error('Search failed. Please check your connection.');
//                 }
//             } finally{
//                 setIsSearching(false);
//             }
//         }, 800);

//         return ()=> {  
//             if (timeoutRef.current){
//                 clearTimeout(timeoutRef.current);
//             }
//         };

//     },[query, axios, isIOS, baseUrl]);

//     const addParticipant = useCallback((user)=>{
//         setNewSplitData(prev=>{
//             if(prev.participants.some(p=> p.userId === user._id)){
//                 return prev;
//             }

//             return{
//                 ...prev,
//                 participants: 
//                     [...prev.participants, 
//                         {   
//                             userId: user._id,
//                             userName: user.userName,
//                             profileImg: user.profileImg,
//                             amount: 0
//                         }
//                     ]
//             }
//         });
//         setSearchResults([]);
//         setQuery('');
//     }, [setNewSplitData]);

//     const removeParticipant = useCallback((userId)=>{
//         setNewSplitData(prev=>({
//             ...prev,
//             participants: prev.participants.filter(p=> p.userId !== userId)
//         }));
//     }, [setNewSplitData]);

//     const handleClick= useCallback(()=>{
//         if(newSplitData.participants.length > 0){
//             navigate('/split-amount');
//         }else{
//             toast.error('Choose participants');
//         }
//     },  [newSplitData.participants.length, navigate]);

//     const handleInputChange = useCallback((e)=>{
//         const value = e.target.value;
//         if(value.length<=50){
//             setQuery(value);
//         }
//     },[]);

//     return (
//         <div className='w-full max-w-md flex flex-col gap-5'>
//             <FaArrowLeft onClick={()=>navigate(-1)} className='text-xl text-[var(--text)] hover:text-[var(--text-dull)] cursor-pointer'/>
//             <div className='flex items-center gap-2 text-xs'>
//                 <div className='
//                     w-6 h-6 rounded-full 
//                     bg-blue-500 text-white 
//                     flex items-center justify-center
//                     font-medium
//                 '>2</div>

//                 <span className='text-[var(--text-dull)]'>of</span>

//                 <div className='
//                     w-6 h-6 rounded-full 
//                     bg-[var(--bg-card-hover)] 
//                     text-[var(--text)]
//                     flex items-center justify-center
//                 '>3</div>
//             </div>
//             <div>
//                 <h3 className='text-2xl md:text-3xl font-semibold leading-snug'>
//                     Choose people <br className='hidden sm:block' /> in this split.
//                 </h3>

//                 <p className='text-sm text-[var(--text-dull)] mt-1'>
//                     Search for a name in your list
//                 </p>
//                 <p>base url :{baseUrl}</p>
//             </div>

//             <div className='flex flex-wrap gap-2 max-w-full'>
//                 {newSplitData.participants.map((p, index)=>(
//                     <div key={index} className='flex flex-col w-fit items-center gap-1'>
//                         <div className='relative'>
//                             <div className='w-12 h-12 rounded-full overflow-hidden'>
//                                 <img className='w-full h-full object-cover' src={p.profileImg || assets.profileImg1} alt="" />
//                             </div>
//                             <div onClick={()=>removeParticipant(p.userId)} className='absolute top-0 right-0 w-5 h-5 rounded-full flex items-center justify-center
//                         bg-gray-500 text-white text-xs cursor-pointer'>
//                                 <IoClose size={12} />
//                             </div>
//                         </div>
//                         <span className='text-xs'>{p.userName}</span>
//                     </div>
//                 ))}
//             </div>

//             <input
//                 type='text'
//                 placeholder="Username"
//                 onChange={handleInputChange}
//                 value={query}
//                 autoComplete="off"
//                 spellCheck="false"
//                 className="
//                         w-full py-3 px-4 rounded-xl
//                         bg-[var(--bg-card)] border border-[var(--border)]
//                         text-[var(--text)] placeholder:text-[var(--text-dull)]
//                         focus:outline-none focus:border-blue-500
//                         focus:ring-2 focus:ring-blue-500/20
//                         transition
//                     "
//             />
//             {query && query.trim().length > 0 && (
//                 <div className="text-xs text-[var(--text-dull)] px-2 space-y-1">
//                     <div>Searching for: "{query}" | Results: {searchResults.length}</div>
//                     {isSearching && <div className="text-blue-500">⏳ Searching...</div>}
//                     {error && <div className="text-red-500">⚠️ Error: {error}</div>}
//                     {isIOS && (
//                         <div className="text-orange-500 text-xs">📱 iOS Error Details: {error}</div>
//                     )}
//                     {!isSearching && query.trim().length < 2 && query.trim().length > 0 && (
//                         <div className="text-yellow-500">⚠️ Type at least 2 characters</div>
//                     )}
//                 </div>
//             )}
//             {searchResults.length > 0 && (
//                 <div className='bg-[var(--bg-card)] h-42 flex flex-col gap-1 p-3 overflow-scroll no-scrollbar rounded-lg'>
//                     {searchResults.map((item, index)=>(
//                         <div key={index} onClick={()=>addParticipant(item)} className=' flex items-center gap-2 cursor-pointer py-1'>
//                             <div className='w-10 h-10 rounded-full overflow-hidden'>
//                                 <img className='w-full h-full object-cover' src={item.profileImg? item.profileImg: assets.profileImg1} alt="" />
//                             </div>
//                             <span className='text-sm'>{item.userName}</span>
//                         </div>
//                     ))}
//                 </div>
//             )}
//             {!isSearching && query.trim().length >= 2 && searchResults.length === 0 && !error && (
//                 <div className='bg-[var(--bg-card)] p-4 rounded-lg text-center text-[var(--text-dull)]'>
//                     No users found for "{query}"
//                 </div>
//             )} 
//             <button onClick={handleClick} className='w-full py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600
//                 text-white font-medium hover:opacity-90 active:scale-95 transition-all duration-200
//                 shadow-[0_5px_15px_rgba(59,130,246,0.4)] cursor-pointer'>
//                 Continue
//             </button>
//         </div>
//     )
// }

// export default ChoosePeoples

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { assets } from '../../assets/assets'
import { IoClose } from "react-icons/io5";
import { useAppContext } from '../../context/AppContext';
import { FaArrowLeft } from "react-icons/fa6";
import { toast } from 'react-toastify';

const ChoosePeoples = () => {

    const {navigate, newSplitData, setNewSplitData, axios} = useAppContext();
    const [searchResults, setSearchResults] = useState([]);
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState(null);
    const timeoutRef = useRef(null);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const baseUrl = window.location.origin;

    useEffect(() => {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        if (!query.trim() || query.trim().length < 2) {
            setSearchResults([]);
            setIsSearching(false);
            setError(null);
            setDebugInfo(null);
            return;
        }

        setIsSearching(true);
        setError(null);

        timeoutRef.current = setTimeout(async () => {
            try {
                console.log('Searching for:', query);
                console.log('Is iOS device:', isIOS);
                console.log('Base URL:', baseUrl);

                if (isIOS) {
                    // Try multiple approaches for iOS
                    
                    // Approach 1: Use axios (same as Android/Web)
                    try {
                        console.log('Approach 1: Using axios for iOS');
                        const config = {
                            params: { query: query.trim() },
                            timeout: 10000,
                            headers: {
                                'Cache-Control': 'no-cache',
                                'Pragma': 'no-cache',
                                'Accept': 'application/json',
                            }
                        };
                        
                        const {data} = await axios.get('/api/search/get', config);
                        console.log('Axios success on iOS:', data);
                        setSearchResults(data.data || []);
                        setDebugInfo('✅ Using axios - Success');
                        return;
                    } catch (axiosError) {
                        console.log('Axios failed on iOS:', axiosError.message);
                        setDebugInfo(`❌ Axios failed: ${axiosError.message}`);
                        
                        // Approach 2: Use fetch with absolute URL
                        try {
                            console.log('Approach 2: Using fetch with absolute URL');
                            const absoluteUrl = `${baseUrl}/api/search/get?query=${encodeURIComponent(query.trim())}`;
                            console.log('Fetching URL:', absoluteUrl);
                            
                            const response = await fetch(absoluteUrl, {
                                method: 'GET',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include'
                            });

                            console.log('Response status:', response.status);
                            
                            if (!response.ok) {
                                throw new Error(`HTTP ${response.status}`);
                            }

                            const text = await response.text();
                            console.log('Response text:', text);
                            
                            let data;
                            try {
                                data = JSON.parse(text);
                            } catch (parseError) {
                                throw new Error(`Invalid JSON: ${text.substring(0, 100)}`);
                            }
                            
                            setSearchResults(data.data || []);
                            setDebugInfo(`✅ Fetch with absolute URL - Success`);
                            return;
                        } catch (fetchError) {
                            console.log('Fetch with absolute URL failed:', fetchError.message);
                            setDebugInfo(`❌ Fetch absolute failed: ${fetchError.message}`);
                            
                            // Approach 3: Use fetch with relative URL
                            try {
                                console.log('Approach 3: Using fetch with relative URL');
                                const relativeUrl = `/api/search/get?query=${encodeURIComponent(query.trim())}`;
                                
                                const response = await fetch(relativeUrl, {
                                    method: 'GET',
                                    headers: {
                                        'Accept': 'application/json',
                                    }
                                });

                                if (!response.ok) {
                                    throw new Error(`HTTP ${response.status}`);
                                }

                                const data = await response.json();
                                setSearchResults(data.data || []);
                                setDebugInfo(`✅ Fetch relative - Success`);
                                return;
                            } catch (relativeError) {
                                console.log('All approaches failed:', relativeError.message);
                                throw new Error(`All iOS requests failed: ${relativeError.message}`);
                            }
                        }
                    }
                } else {
                    // Android/Web - use axios
                    const config = {
                        params: { query: query.trim() },
                        timeout: 10000,
                        withCredentials: true,
                        headers: {
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    };
                    
                    const {data} = await axios.get('/api/search/get', config);
                    console.log('Search results:', data);
                    setSearchResults(data.data || []);
                }
  
            } catch (error) {
                console.error('Search error:', error);
                console.error('Error name:', error.name);
                console.error('Error message:', error.message);
                console.error('Error stack:', error.stack);
                
                setError(error.message);
                setSearchResults([]);

                // Show specific error message
                let errorMsg = 'Search failed';
                if (error.message.includes('string did not match')) {
                    errorMsg = 'URL pattern mismatch. Please refresh the page.';
                } else if (error.message.includes('Failed to fetch')) {
                    errorMsg = 'Network error. Please check your connection.';
                } else if (error.message.includes('CORS')) {
                    errorMsg = 'CORS error. Please contact support.';
                } else {
                    errorMsg = error.message;
                }
                
                toast.error(errorMsg);
            } finally {
                setIsSearching(false);
            }
        }, 800);

        return () => {  
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [query, axios, isIOS, baseUrl]);

    const addParticipant = useCallback((user) => {
        setNewSplitData(prev => {
            if(prev.participants.some(p => p.userId === user._id)) {
                return prev;
            }
            return {
                ...prev,
                participants: [...prev.participants, {
                    userId: user._id,
                    userName: user.userName,
                    profileImg: user.profileImg,
                    amount: 0
                }]
            }
        });
        setSearchResults([]);
        setQuery('');
        setError(null);
        setDebugInfo(null);
    }, [setNewSplitData]);

    const removeParticipant = useCallback((userId) => {
        setNewSplitData(prev => ({
            ...prev,
            participants: prev.participants.filter(p => p.userId !== userId)
        }));
    }, [setNewSplitData]);

    const handleClick = useCallback(() => {
        if(newSplitData.participants.length > 0) {
            navigate('/split-amount');
        } else {
            toast.error('Choose participants');
        }
    }, [newSplitData.participants.length, navigate]);

    const handleInputChange = useCallback((e) => {
        const value = e.target.value;
        if(value.length <= 50) {
            setQuery(value);
        }
    }, []);

    return (
        <div className='w-full max-w-md flex flex-col gap-5 pb-4'>
            <FaArrowLeft onClick={() => navigate(-1)} className='text-xl text-[var(--text)] hover:text-[var(--text-dull)] cursor-pointer'/>
            
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
                
                {/* Debug information */}
                <div className='text-xs space-y-1 mt-2 p-2 bg-[var(--bg-card)] rounded-lg'>
                    <p className='text-blue-500'>🌐 Base URL: {baseUrl}</p>
                    {isIOS && <p className='text-green-500'>📱 iOS Mode Active</p>}
                    {debugInfo && (
                        <p className={`${debugInfo.includes('✅') ? 'text-green-500' : 'text-red-500'}`}>
                            🔍 {debugInfo}
                        </p>
                    )}
                </div>
            </div>

            <div className='flex flex-wrap gap-2 max-w-full min-h-[72px]'>
                {newSplitData.participants.map((p, index) => (
                    <div key={p.userId || index} className='flex flex-col w-fit items-center gap-1'>
                        <div className='relative'>
                            <div className='w-12 h-12 rounded-full overflow-hidden bg-gray-200'>
                                <img 
                                    className='w-full h-full object-cover' 
                                    src={p.profileImg || assets.profileImg1} 
                                    alt={p.userName}
                                    loading="lazy"
                                />
                            </div>
                            <button 
                                onClick={() => removeParticipant(p.userId)} 
                                className='absolute top-0 right-0 w-5 h-5 rounded-full flex items-center justify-center
                                    bg-gray-500 text-white text-xs cursor-pointer hover:bg-gray-600'
                                aria-label={`Remove ${p.userName}`}
                            >
                                <IoClose size={12} />
                            </button>
                        </div>
                        <span className='text-xs truncate max-w-[60px]'>{p.userName}</span>
                    </div>
                ))}
            </div>

            <input
                type='text'
                placeholder="Username (min. 2 characters)"
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
                    <div>🔍 "{query}" | Results: {searchResults.length}</div>
                    {isSearching && <div className="text-blue-500">⏳ Searching... Trying multiple approaches...</div>}
                    
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2 mt-1">
                            <div className="text-red-500 font-medium">⚠️ Error: {error}</div>
                            {isIOS && (
                                <div className="text-orange-500 text-xs mt-1">
                                    📱 iOS: The app is trying different methods. Check debug info above.
                                </div>
                            )}
                        </div>
                    )}
                    
                    {!isSearching && query.trim().length < 2 && query.trim().length > 0 && (
                        <div className="text-yellow-500">⚠️ Type at least 2 characters</div>
                    )}
                </div>
            )}
            
            {searchResults.length > 0 && (
                <div className='bg-[var(--bg-card)] max-h-48 flex flex-col gap-1 p-3 overflow-y-auto no-scrollbar rounded-lg'>
                    {searchResults.map((item, index) => (
                        <button
                            key={item._id || index} 
                            onClick={() => addParticipant(item)} 
                            className='flex items-center gap-2 cursor-pointer py-1 hover:bg-[var(--bg-card-hover)] px-2 rounded-lg transition-colors w-full text-left'
                        >
                            <div className='w-10 h-10 rounded-full overflow-hidden bg-gray-200'>
                                <img 
                                    className='w-full h-full object-cover' 
                                    src={item.profileImg || assets.profileImg1} 
                                    alt={item.userName}
                                    loading="lazy"
                                />
                            </div>
                            <span className='text-sm'>{item.userName}</span>
                        </button>
                    ))}
                </div>
            )}
            
            {!isSearching && query.trim().length >= 2 && searchResults.length === 0 && !error && (
                <div className='bg-[var(--bg-card)] p-4 rounded-lg text-center text-[var(--text-dull)]'>
                    No users found for "{query}"
                </div>
            )}
            
            <button 
                onClick={handleClick} 
                className='w-full py-3 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600
                    text-white font-medium hover:opacity-90 active:scale-95 transition-all duration-200
                    shadow-[0_5px_15px_rgba(59,130,246,0.4)] cursor-pointer'
            >
                Continue ({newSplitData.participants.length} participants)
            </button>
        </div>
    )
}

export default ChoosePeoples