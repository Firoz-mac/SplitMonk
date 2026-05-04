import React from 'react'

const RemainigSplitAmountCard = ({title, total, remaining, splitEqually}) => {
  return (
    <div className='rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/10 p-4'>
        <span className="text-sm text-[var(--text-secondary)]">
            Remaining Bill of {title}
        </span>
        <div className="mt-1 flex items-end gap-1">
            <span className="text-xl font-semibold text-[var(--text-primary)]">
                ₹{remaining}
            </span>
            <span className="pb-1 text-sm text-[var(--text-secondary)]">
                from
            </span>
            <span className="text-xl font-semibold text-[var(--text-primary)]">
                ₹{total}
            </span>
        </div>
    </div>
  )
}

export default RemainigSplitAmountCard