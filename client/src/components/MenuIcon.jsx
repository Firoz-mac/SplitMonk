import React from 'react'
import { useAppContext } from '../context/AppContext'

const MenuIcon = ({icon, active, path, onClick}) => {

  const {navigate} = useAppContext()

  const handleClick = ()=>{
    if(onClick) return onClick();
    navigate(path);
  }
  
  return (
    <button onClick={handleClick} className={`text-2xl p-1 rounded-xl transition-all duration-200 cursor-pointer
        ${active ? "text-[var(--icon-hover-color)]" : "text-[var(--icon-color)] hover:text-[var(--icon-hover-color)]"}`}>
            {icon}
    </button>
  )
}

export default MenuIcon