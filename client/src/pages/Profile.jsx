import React, { useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { MdLanguage } from "react-icons/md";
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { FaUser, FaBug, FaLock } from "react-icons/fa";
import { IoChevronDown, IoPersonAddSharp } from "react-icons/io5";


const Profile = () => {
    const profileInputRef= useRef(null);
    const [isProfileUploading, setIsProfileUploading] = useState(false);

    const {user, setUser, axios, handleLogout} = useAppContext();

    const handleFileChange= async (e)=>{
        try {
            const file = e.target.files[0];
            if(!file) return;

            const formData = new FormData();
            formData.append('profileImg', file);
            setIsProfileUploading(true);
            
            const {data} = await axios.put('/api/user/update-profile',
                formData,
            )

            if(data.success){
                setUser(data.user);
                toast.success(data.message);
                setIsProfileUploading(false);
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    const accountSecurity = [
        {
            title: "Personal Information",
            icon : <FaUser/>
        },
        {
            title: "Change Pin",
            icon : <FaLock />
        },
        {
            title: "Change Language",
            icon : <MdLanguage />
        }
    ];

    const moreInformation =[
        {
            title: "Invite Friends",
            icon : <IoPersonAddSharp />
        },
        {
            title: "Help Center",
            icon : <FaBug />
        },
    ]

    return (
        
        <div className='bg-[var(--primary)]'>

            <div className='w-full flex flex-col justify-center items-center py-8'>

                <div className="flex flex-col items-center w-fit">
                    <div className="relative w-25 h-25 md:w-30 md:h-30 overflow-visible">
                        <div
                            onClick={() => !isProfileUploading && profileInputRef.current?.click()}
                            className="relative w-full h-full overflow-hidden rounded-full border-4 border-white/30 
                            shadow-lg cursor-pointer"
                        >
                            <img
                                src={user?.profileImg || assets.profileImg1}
                                alt="profile"
                                className="w-full h-full object-cover"
                            />

                            {isProfileUploading && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                    <div className="w-8 h-8 border-4 border-white/40 border-t-white rounded-full animate-spin" />
                                </div>
                            )}
                        </div>

                        <input ref={profileInputRef} onChange={handleFileChange} type="file" className="hidden"/>

                    </div>
                </div>

            </div>
            <div className='bg-[var(--bg-primary)] rounded-t-2xl px-5 py-5 md:py-10 flex justify-center min-h-[65vh]'>

                <div className='max-w-md w-full flex flex-col gap-6'>

                    <div className='flex flex-col gap-3'>

                        <span className="text-sm font-semibold text-[var(--text-primary)]">Account & Security</span>

                        <div className="bg-[var(--bg-secondary)] rounded-2xl overflow-hidden 
                        divide-y divide-[var(--border-color)]">
                            {accountSecurity.map((option) => (
                                <button
                                    key={option.title}
                                    type="button"
                                    className="w-full p-4 flex justify-between items-center cursor-pointer 
                                    transition hover:bg-black/5 active:scale-[0.99]"
                                >
                                    <div className="flex gap-3 items-center text-[var(--text-primary)]">
                                        <span className="text-[var(--primary)]">
                                            {option.icon}
                                        </span>
                                        <span className="text-sm font-medium">{option.title}</span>
                                    </div>

                                    <IoChevronDown className="-rotate-90 text-[var(--text-muted)]" />
                                </button>
                            ))}
                        </div>

                    </div>

                    <div className='flex flex-col gap-3'>

                        <span className="text-sm font-semibold text-[var(--text-primary)]">More Information</span>

                        <div className="bg-[var(--bg-secondary)] rounded-2xl overflow-hidden 
                        divide-y divide-[var(--border-color)]">
                            {moreInformation.map((option) => (
                                <button
                                    key={option.title}
                                    type="button"
                                    className="w-full p-4 flex justify-between items-center cursor-pointer 
                                    transition hover:bg-black/5 active:scale-[0.99]"
                                >
                                    <div className="flex gap-3 items-center text-[var(--text-primary)]">
                                        <span className="text-[var(--primary)]">
                                            {option.icon}
                                        </span>
                                        <span className="text-sm font-medium">{option.title}</span>
                                    </div>

                                    <IoChevronDown className="-rotate-90 text-[var(--text-muted)]" />
                                </button>
                            ))}
                        </div>

                    </div>

                    <button
                        onClick={()=>handleLogout()}
                        type='button' 
                        className='rounded-xl bg-red-500 py-3 text-sm font-semibold hover:bg-red-600 active:scale-95 
                        transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md text-white'
                    >
                        Logout
                    </button>

                </div>
            </div>

            
        </div>
    )
}

export default Profile