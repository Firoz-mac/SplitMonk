import React from 'react'

const ActivePageIndicator = ({activePage}) => {

    const pageValues = ['Create Split', 'Choose Peoples', 'Split'];
    
    return (
        <div className="flex items-center justify-center gap-2">
            {pageValues.map((step) => (
                <div
                    key={step}
                    className={`h-1 rounded-full transition-all duration-300 ${activePage === step
                        ? "w-14 bg-[var(--primary)]"
                        : "w-10 bg-[var(--primary)]/30"
                        }`}
                />
            ))}
        </div>
    )
}

export default ActivePageIndicator