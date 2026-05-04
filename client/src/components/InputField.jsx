import React from 'react'

const InputField = ({ label, type, name, value, placeholder = '', onChange, amountField = false }) => {

    const inputId = name;

    return (
        <div className="w-full">
            {label && (
                <label 
                    htmlFor={inputId} 
                    className="mb-2 block text-sm font-medium text-[var(--text-primary)]"
                >
                    {label}
                </label>
            )}

            {amountField ? (

                <div className='relative'>

                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] text-sm">
                        ₹
                    </span>

                    <input
                        id={inputId}
                        placeholder="0.00"
                        value={value}
                        type='text'
                        name={name}
                        onChange={onChange}
                        pattern="[0-9]*"
                        inputMode='decimal'
                        className='w-full pl-8 py-3 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 
                        focus:ring-primary text-sm'
                    />

                </div>
            ) :

                <input
                    id={inputId}
                    placeholder={placeholder}
                    value={value}
                    type={type}
                    name={name}
                    onChange={onChange}
                    className='w-full pl-3 py-3 rounded-xl border border-[var(--border-color)] focus:outline-none focus:ring-2 
                    focus:ring-primary text-sm'
                />

            }
        </div>
    )
}

export default InputField