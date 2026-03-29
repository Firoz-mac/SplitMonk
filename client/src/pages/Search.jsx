import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Search = () => {

    const {navigate, axios} = useAppContext();
    const [results, setResults] = useState([]);

    const handleChange = async (e)=>{
        const value = e.target.value;

        if (!value.trim()){
            setResults([]);
            return;
        }

        try {
            const {data} = await axios.get('/api/search/get', {params:{query:value}});
            setResults(data.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className='w-full h-full flex flex-col'>
            <div className="max-w-sm w-full flex flex-col h-full gap-1">
                <input onChange={handleChange} type="text" placeholder='Search...' className='w-full p-3 
                    rounded-lg border border-gray-500 focus:outline-none'/>
                <div className='flex-1 flex flex-col py-2 overflow-scroll no-scrollbar gap-1'>
                    {results.map((item, index)=>(
                        <div key={index} onClick={()=>console.log(item._id)} className='w-full flex gap-3 items-center p-3 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] rounded-lg cursor-pointer'>
                            <div className='w-12 h-12 rounded-full overflow-hidden'>
                                <img className='w-full h-full object-cover' src={item.profileImg} alt="" />
                            </div>
                            <span>{item.userName}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Search