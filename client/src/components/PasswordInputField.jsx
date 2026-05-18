import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaLock } from "react-icons/fa";

const PasswordInputField = ({label, placeholder, inpId}) => {

    const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='w-full flex flex-col gap-2'>
        <label 
            htmlFor={inpId} 
            className="text-sm font-medium text-[var(--text-secondary)]"
        >
            {label}
        </label>

        <div className='relative'>

            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--primary)]">
                <FaLock/>
            </span>

            <input
                type={showPassword ? 'text' : 'password'}
                className='w-full py-3 pl-10 pr-10 rounded-xl border border-[var(--border-color)] 
                focus:outline-none focus:ring-2 focus:ring-primary '
                placeholder={placeholder}
            />

            <span
                onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]"
            >
                {showPassword ? <FiEye/> : <FiEyeOff/>}
                
            </span>

        </div>
    </div>
  )
}

export default PasswordInputField