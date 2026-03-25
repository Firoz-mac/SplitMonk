import React from 'react'
import { assets } from '../assets/assets'
import { MdOutlineModeEdit } from "react-icons/md";
import { LiaUserSolid } from "react-icons/lia";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";

const Profile = () => {
    return (
        <div className='w-full flex justify-center items-center'>
            <div className='w-md flex flex-col gap-3'>
                <div className='flex justify-center'>
                    <div className='relative w-fit'>
                        <div className='w-30 h-30 overflow-hidden rounded-full'>
                            <img className='w-full h-full object-cover' src={assets.p1} alt="" />
                        </div>

                        <div className='absolute bottom-0 right-0 w-6 h-6 rounded-full bg-blue-500 text-white 
                                flex items-center justify-center text-sm cursor-pointer'>
                            <MdOutlineModeEdit />
                        </div>
                    </div>
                </div>
                <span>Account Settings</span>
                <div className='flex flex-col bg-[var(--bg-card)] gap-5 p-5 rounded-lg'>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <div className='bg-linear-to-br rounded-lg from-blue-400 to-blue-600 py-2 flex items-center justify-center p-2'>
                            <LiaUserSolid className='w-5 h-5'/>
                        </div>
                        <span>Personal Information</span>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <div className='bg-linear-to-br rounded-lg from-blue-400 to-blue-600 py-2 flex items-center justify-center p-2'>
                            <MdLockOutline className='w-5 h-5'/>
                        </div>
                        <span>Security & Privacy</span>
                    </div>
                    <div className='flex items-center gap-2 cursor-pointer'>
                        <div className='bg-linear-to-br rounded-lg from-blue-400 to-blue-600 py-2 flex items-center justify-center p-2'>
                            <AiOutlineQuestionCircle className='w-5 h-5'/>
                        </div>
                        <span>Help Center</span>
                    </div>
                </div>
                <button className=' rounded-lg bg-red-500 py-2 hover:bg-red-600 active:scale-95 transition-all duration-200 
                    cursor-pointer hover:brightness-110 shadow-sm hover:shadow-md'>
                            Logout
                </button>
            </div>
        </div>
    )
}

export default Profile