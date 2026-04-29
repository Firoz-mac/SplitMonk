import React from 'react'
import { useAppContext } from '../context/AppContext'

const MenuIcon = ({icon, active, path, label, onClick}) => {

  const {navigate} = useAppContext()

  const handleClick = ()=>{

    if(onClick) {
      onClick();
      return
    }

    if (path) {
      navigate(path);
    }

  };
  
  return (
    <button
      type='button'
      aria-label={label}
      aria-current={active ? "page" : undefined}
      onClick={handleClick}
      className={`text-2xl w-11 h-11 rounded-2xl flex items-center justify-center 
        transition-all duration-200 cursor-pointer active:scale-95 focus-visible:outline-none 
        focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2
        ${active 
            ? "text-[var(--primary)] bg-[#6366f1]/15"
            : 
            "text-gray-500 hover:text-[var(--primary)] hover:bg-[#6366f1]/10"}`}
      >
        
        <span className="[&>svg]:w-6 [&>svg]:h-6">
          {icon}
        </span>
    </button>
  )
}

export default MenuIcon