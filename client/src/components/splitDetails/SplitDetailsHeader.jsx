import React from 'react'
import { IoArrowBackOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import { useAppContext } from '../../context/AppContext';

const SplitDetailsHeader = (createdUserId) => {

    const {navigate, user} = useAppContext();

    const loggedUserId = user?._id;

    return (
        <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={()=>navigate(-1)}
                    className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 
                    active:scale-95 transition"
                >
                    <IoArrowBackOutline className="text-xl" />
                </button>

                <span className="text-md font-medium text-[var(--text-primary)]">
                    Split Details
                </span>
            </div>

            {loggedUserId === createdUserId && (
                <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full text-red-500 
                hover:bg-red-50 active:scale-95 transition"
                >
                    <RiDeleteBinLine className="text-xl" />
                </button>
            )}

            
        </div>
    )
}

export default SplitDetailsHeader