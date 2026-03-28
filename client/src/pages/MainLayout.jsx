import React from 'react'
import { MdOutlineAdd } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { LiaUserSolid } from "react-icons/lia";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { BsDatabaseAdd } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { assets } from '../assets/assets';
import MenuIcon from '../components/MenuIcon';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import AppLoader from '../components/AppLoader';

const MainLayout = () => {

    const {navigate, user, handleLogout, loading} = useAppContext();
    const location = useLocation();

    const menuItems = [
        { icon: <MdOutlineAdd />, path: "/addExpense",},
        { icon: <GoHome />, path: "/home" },
        { icon: <BsDatabaseAdd />, path: "/split" },
        { icon: <LiaUserSolid />, path: "/profile" },
    ];

    if(loading){
        return <AppLoader/>
    }

    return (
        <div className='flex h-screen bg-[var(--bg-primary)] text-[var(--text)]'>
            <div className='hidden md:flex flex-col w-20  bg-[var(--bg-secondary)] items-center py-6 justify-between'>
                <div className='flex flex-col gap-6 items-center'>
                    <img onClick={()=>navigate('/home')} className='h-6' src={assets.logo} alt="Logo" />
                    {
                        menuItems.map((item, index) => (
                            <MenuIcon key={index} icon={item.icon} path={item.path} active={location.pathname === item.path}/>
                        ))
                    }

                </div>
                <MenuIcon icon={<RiLogoutCircleRLine />} onClick={()=>handleLogout()} />
            </div>

            <div className='flex-1 flex flex-col p-4 overflow-hidden'>
                <div className='w-full flex gap-2 justify-end pb-4'>
                    <button onClick={()=>navigate('/notifications')} className='text-2xl bg-[var(--bg-icon)] 
                    hover:bg-[var(--bg-hover)] p-2 rounded-lg cursor-pointer'>
                        <IoNotificationsOutline  className='text-[var(--icon-color)]'/>
                    </button>
                    <div onClick={()=>navigate('/profile')} className='bg-[var(--bg-icon)] rounded-full w-10 h-10 
                    cursor-pointer overflow-hidden'>
                        <img className='w-full h-full object-cover' src={user && user.profileImg? user.profileImg : assets.profileImg1} alt="" />
                    </div>
                </div>
                <div className='flex-1 overflow-y-scroll no-scrollbar pb-15'>
                    <Outlet/>
                </div>
            </div>

            <div className='md:hidden flex fixed bottom-0 left-0 w-full bg-[var(--bg-secondary)] 
            justify-around items-center py-3 border-t border-gray-800 z-50'>
                {
                    menuItems.map((item, index) => (
                        <MenuIcon key={index} icon={item.icon} path={item.path} />
                    ))
                }
            </div>
        </div>
    )
}

export default MainLayout