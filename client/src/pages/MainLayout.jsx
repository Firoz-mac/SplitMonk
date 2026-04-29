import React, { useEffect, useState } from 'react'
import { RiHomeSmile2Fill } from "react-icons/ri";
import MenuIcon from '../components/MenuIcon';
import { Outlet, useLocation } from 'react-router-dom';
import { ScanQrCode } from 'lucide-react';
import { IoIosSettings } from "react-icons/io";
import CameraScanner from '../components/CameraScanner';

const MainLayout = () => {

    const location = useLocation();
    const [openCamera, setOpenCamera] = useState(false);

    const menuItems = [
        
        { icon: <RiHomeSmile2Fill />, path: "/home", label: "Home", },
        { icon: <ScanQrCode />, label: "Scan", onClick: () => setOpenCamera(true) },
        { icon: <IoIosSettings />, path: "/profile", label: "settings", },
    ];

    return (
        <div className='flex h-screen bg-[var(--bg-primary)]'>
            <aside className="hidden md:flex flex-col w-20 shrink-0 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] items-center justify-center">
                <nav aria-label="Desktop navigation" className="flex flex-col gap-6 md:gap-8 items-center">
                    {menuItems.map((item) => (
                        <MenuIcon
                            key={item.label}
                            icon={item.icon}
                            path={item.path}
                            label={item.label}
                            onClick={item.onClick}
                            active={location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)}
                        />
                    ))}
                </nav>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="flex-1 pb-20 md:pb-0 overflow-y-auto bg-[var(--bg-primary)] text-[var(--text-primary)]">
                    <Outlet />
                </div>
            </main>

            <nav
                aria-label="Mobile navigation"
                className="md:hidden flex fixed bottom-0 left-0 w-full bg-[var(--bg-secondary)]/95 
                backdrop-blur-md border-t border-[var(--border-color)] justify-around items-center 
                py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] z-50"
            >
                {menuItems.map((item) => (
                    <MenuIcon
                        key={item.label}
                        icon={item.icon}
                        path={item.path}
                        label={item.label}
                        onClick={item.onClick}
                        active={location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)}
                    />
                ))}
            </nav>

            {openCamera && (
                <CameraScanner 
                    onClose={() => setOpenCamera(false)}
                    onCapture={(imageData)=>{
                        console.log(imageData);
                    }}
                />
            )}

        </div>
    )
}

export default MainLayout