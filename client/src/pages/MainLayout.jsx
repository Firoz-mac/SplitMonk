import React, { useEffect } from 'react'
import { MdOutlineAdd, MdTimeline } from "react-icons/md";
import { GoHome } from "react-icons/go";
import { LiaUserSolid } from "react-icons/lia";
import { RiLogoutCircleRLine, RiHomeSmile2Fill } from "react-icons/ri";
import { BsDatabaseAdd } from "react-icons/bs";
import { IoNotificationsOutline, IoMail } from "react-icons/io5";
import { assets } from '../assets/assets';
import MenuIcon from '../components/MenuIcon';
import { Outlet, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { UserRoundCog, UsersRound, Plus, SquareSplitHorizontal, ScanQrCode } from 'lucide-react';
import { IoIosWallet, IoIosSettings } from "react-icons/io";

const MainLayout = () => {

    const {navigate, user, handleLogout} = useAppContext();
    const location = useLocation();

    const menuItems = [
        
        { icon: <RiHomeSmile2Fill />, path: "/home" },
        { icon: <ScanQrCode />, path: "/split" },
        { icon: <IoIosSettings />, path: "/profile" },
    ];


    return (
        <div className='flex h-screen'>
            <div className='hidden md:flex flex-col w-20  bg-[var(--bg-secondary)] items-center justify-center'>
                <div className='flex flex-col gap-6 md:gap-8 items-center'>
                    {
                        menuItems.map((item, index) => (
                            <MenuIcon key={index} icon={item.icon} path={item.path} active={location.pathname === item.path}/>
                        ))
                    }

                </div>
            </div>

            <div className='flex-1 flex flex-col px-0 overflow-hidden'>
                <div className='flex-1 pb-15 bg-[var(--bg-primary)] text-[var(--text-primary)]'>
                    <Outlet/>
                </div>
            </div>

            <div className='md:hidden flex fixed bottom-0 left-0 w-full bg-[var(--bg-secondary)]
            justify-around items-center py-3 z-50'>
                {
                    menuItems.map((item, index) => (
                        <MenuIcon key={index} icon={item.icon} path={item.path} active={location.pathname === item.path} />
                    ))
                }
            </div>
        </div>
    )
}

export default MainLayout