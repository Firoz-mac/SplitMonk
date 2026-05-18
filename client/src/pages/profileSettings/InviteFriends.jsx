import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { useAppContext } from '../../context/AppContext';

const InviteFriends = () => {

    const {navigate} = useAppContext();

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='w-full flex gap-5 py-5 px-5 border-b border-[var(--border-color)]'>
                <button
                    type='button'
                    onClick={() => navigate(-1)}
                    className='cursor-pointer'
                >
                    <IoArrowBackOutline className="text-xl" />
                </button>
            </div>
            <div className='flex flex-1 justify-center p-5'>

                <div className='flex w-full h-full max-w-md flex-col justify-between md:justify-start gap-5'>

                    <div className='flex flex-col gap-6'>

                        <div className='space-y-2'>

                            <h6 
                                className='text-xl font-medium leading-tight'
                            >
                                Invite friends and earn rewards
                            </h6>

                            <p 
                                className='text-sm text-[var(--text-secondary)] leading-5'
                            >
                                After they register through your link and complete their first payment.
                            </p>

                        </div>

                        <div className='w-full rounded-xl flex border border-[var(--border-color)] overflow-hidden'>

                            <input 
                                className='min-w-0 flex-1 border-none bg-transparent px-4 py-3 outline-none' 
                                type="text" 
                                placeholder='Phone or Email' 
                            />

                            <button
                                type='button'
                                className='bg-[var(--primary)] shrink-0 text-white py-3 px-4 cursor-pointer'
                            >
                                <span className='text-sm'>Send invite</span>
                            </button>

                        </div>

                    </div>

                    <div className='flex gap-3'>

                        <button
                            type='button'
                            className='flex gap-2 px-4 py-2 rounded-lg bg-[var(--bg-secondary)] text-sm items-center cursor-pointer'
                        >
                            <IoIosLink/>
                            <span>Copy link</span>
                        </button>

                        <button
                            type='button'
                            className='flex gap-2 px-4 py-2 rounded-lg bg-[var(--bg-secondary)] text-sm items-center cursor-pointer'
                        >
                            <FaWhatsapp/>
                            <span>WhatsApp</span>
                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default InviteFriends