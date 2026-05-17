import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import { IoArrowBackOutline } from "react-icons/io5";
import InputField from '../../components/InputField';
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";

const PersonalInformationsForm = () => {

    const { navigate, personalInformationPageValue } = useAppContext();

    const [payload, setPayload] = useState({
        userName: '',
        email: '',
        phone: '',
    })

    const fieldConfig = {
        Username: {
            name: 'userName',
            type: 'text',
            prefix: <FaUser />,
            helperText: 'You’ll be able to change your username again after 14 days.',
        },
        Email: {
            name: 'email',
            type: 'email',
            prefix: <MdEmail />,
            helperText: '',
        },
        Phone: {
            name: 'phone',
            type: 'tel',
            prefix: <FaPhoneFlip />,
            helperText: '',
        }
    }

    const activeField = fieldConfig[personalInformationPageValue];

    const isDisabled = !activeField || !payload[activeField.name]?.trim()

    const handleInputChange = (e) => {
        setPayload((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!activeField) return
        console.log(payload);
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
            </div>

            <div className='flex flex-1 justify-center'>
                <form
                    onSubmit={handleSubmit}
                    className='w-full md:max-w-md h-full flex flex-col justify-between md:justify-start md:gap-5 p-5'
                >

                    {activeField && (

                        <div>

                            <InputField
                                label={personalInformationPageValue}
                                type={activeField.type}
                                name={activeField.name}
                                value={payload[activeField.name]}
                                onChange={handleInputChange}
                                prefix={activeField.prefix}
                            />


                            {activeField.helperText && (
                                <span
                                    className='text-xs text-[var(--text-secondary)]'
                                >
                                    {activeField.helperText}
                                </span>
                            )}

                        </div>

                    )}

                    <button
                        type='submit'
                        disabled={isDisabled}
                        className='w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white p-2 
                        rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        Save
                    </button>

                </form>

            </div>
        </div>
    )
}

export default PersonalInformationsForm