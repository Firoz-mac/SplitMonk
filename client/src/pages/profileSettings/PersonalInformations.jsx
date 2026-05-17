import React, { useState } from 'react'
import { MdEdit, MdEmail } from "react-icons/md";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";
import { useAppContext } from '../../context/AppContext';
import { FaPhoneFlip } from "react-icons/fa6";

const PersonalInformations = () => {

    const { navigate, setPersonalInformationPageValue } = useAppContext();

    const options = [
        {
            title: 'Username',
            icon: <FaUser />,
            value: 'Mac'
        },
        {
            title: 'Email',
            icon: <MdEmail />,
            value: 'firozmhd23@gmail.com'
        },
        {
            title: 'Phone',
            icon: <FaPhoneFlip />,
            value: '8086105789'
        },

    ]

    const handleClick =(value) =>{
        switch (value) {
            case 'Username':
                navigate('/personal-informations-form');
                setPersonalInformationPageValue('Username');
                break;
            case 'Email':
                navigate('/personal-informations-form');
                setPersonalInformationPageValue('Email');
                break;
            case 'Phone':
                navigate('/personal-informations-form');
                setPersonalInformationPageValue('Phone');
                break;
            default:
                break;
        }
    }

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
                <span className='font-medium text-[var(--text-primary)]'>Personal Informations</span>
            </div>

            <div className='flex-1'>

                <div className='rounded-2xl overflow-hidden divide-y divide-[var(--border-color)]'>

                    {options.map((option) => (

                        <button
                            key={option.title}
                            onClick={()=>handleClick(option.title)}
                            className='w-full grid grid-cols-[1fr_auto_auto] gap-4 p-5 items-center cursor-pointer'>

                            <div className='flex gap-3 items-center text-[var(--text-primary)]'>

                                <span className='text-[var(--primary)]'>
                                    {option.icon}
                                </span>

                                <span>
                                    {option.title}
                                </span>

                            </div>

                            <span className="text-sm text-[var(--text-muted)]">
                                {option.value}
                            </span>

                            <span className='text-[var(--primary)] hover:text-[var(--primary)]/80 cursor-pointer'>
                                <IoChevronDown className="-rotate-90" />
                            </span>

                        </button>

                    ))}

                </div>

            </div>
        </div>
    )
}

export default PersonalInformations