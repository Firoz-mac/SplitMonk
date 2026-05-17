import React from 'react'

const InputField = ({ label, type, name, value, placeholder = '', onChange, amountField = false, prefix = '' }) => {

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

            <div className='relative'>

                {prefix && (

                    <span className="absolute left-3 top-1/2 -translate-y-1/2  text-sm text-[var(--primary)]">
                        {prefix}
                    </span>

                )}

                <input
                    id={inputId}
                    placeholder={placeholder}
                    value={value}
                    type={type}
                    name={name}
                    onChange={onChange}
                    pattern={amountField ? '[0-9]*[.]?[0-9]*' : undefined}
                    inputMode={amountField ? 'decimal' : undefined}
                    className={`w-full ${prefix ? 'pl-8' : 'pl-3'} py-3 rounded-xl border border-[var(--border-color)] 
                    focus:outline-none focus:ring-2 focus:ring-primary text-sm`}
                />

            </div>

        </div>
    )
}

export default InputField