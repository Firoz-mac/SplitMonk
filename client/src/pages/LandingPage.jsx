import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { MdOutlineAddCard } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { GrSecure } from "react-icons/gr";
import { MdChecklist } from "react-icons/md";
import { MdOutlinePhoneAndroid } from "react-icons/md";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { RiBankLine } from "react-icons/ri";
import { LiaDiscord } from "react-icons/lia";
import { MdArrowOutward } from "react-icons/md";
import { LuSunMedium } from "react-icons/lu";
import { FiMoon } from "react-icons/fi";
import { useAppContext } from '../context/AppContext';

const LandingPage = () => {

    const [active, setActive] = useState('Home');

    const {theme, setTheme, navigate}=useAppContext();

    const menuValues = ["Home", "Services", "Features", "About"];

    const handleMenuValueClick = (value) => {
        setActive(value);
        const section = document.getElementById(value.toLowerCase());

        if(section){
            const yOffset = -80;
            const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    }

    const steps = [
        {
            title: "Add Bill",
            description: "Scan receipts or input manual costs. Our AI categorizes expenses instantly.",
            number: "01",
            icon: MdOutlineAddCard
        },
        {
            title: "Split Group",
            description: "Define custom shares or equal splits. Everyone gets notified in real-time.",
            number: "02",
            icon: AiOutlineUsergroupAdd
        },
        {
            title: "Get Secured",
            description: "Integrated bank transfers and mobile wallets. Settle balances with one tap.",
            number: "03",
            icon: GrSecure
        },

    ]

    useEffect(()=>{
        const handleScroll = ()=>{
            const sections = menuValues.map(v => v.toLowerCase());

            for(let sec of sections){
                const element = document.getElementById(sec);

                if(element){
                    const rect = element.getBoundingClientRect();

                    if(rect.top <= 100 && rect.bottom >= 100){
                        setActive(sec.charAt(0).toUpperCase() + sec.slice(1));
                    }
                }
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const features = [
        {
            title: "Smart Tracking",
            description: "Track income and expenses",
            icon: MdChecklist
        },
        {
            title: "All Devices",
            description: "Access your finances anytime",
            icon: MdOutlinePhoneAndroid
        },
        {
            title: "Fast Experience",
            description: "Manage Money Quick and smoothly",
            icon: AiOutlineThunderbolt
        },
        {
            title: "Less Financial Stess",
            description: "Get clear insights for better decisions",
            icon: RiBankLine
        },
    ]

    return (
        <div className='w-full relative flex flex-col bg-[var(--bg-primary)] text-[var(--text)] overflow-hidden'>
            <div className="absolute top-[-500px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[var(--primary)] rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute top-[200px] left-1 -translate-x-1/2 w-[100px] h-[300px] bg-[var(--primary)] rounded-full blur-[150px] pointer-events-none"></div>
            <nav className='flex px-10 py-5 md:px-18 md:py-5 justify-between items-center'>
                <div className='flex gap-2 items-center cursor-pointer'>
                    <img className='h-6 md:h-8' src={assets.logo} alt="Splizy Logo" />
                    <p className='text-lg md:text-2xl'>Splitzy</p>
                </div>
                <div className='hidden md:flex gap-1 px-1 py-1 bg-white/10 rounded-xl backdrop-blur-md border border-white/20 shadow-lg'>
                    {menuValues.map((value, index) => (
                        <button key={index}
                            onClick={() => handleMenuValueClick(value)}
                            className={`px-4 py-2 rounded-xl text-[var(--text)] text-sm hover:text-[var(--text)] cursor-pointer 
                                ${active === value ? "bg-white/10 text-[var(--text)] shadow-inner" :
                                    "text-[var(--text)] hover:text-[var(--text)] hover:bg-white/10"}`}>
                            {value}
                        </button>
                    ))}
                </div>

                <div className='flex gap-2'>

                    <div className='flex bg-white/10 backdrop-blur-md border border-[var(--border)] p-1 rounded-full gap-2 md:hidden'>
                        <button onClick={()=> setTheme('light')} className={`p-1 ${theme === 'light'? 'bg-white border border-[var(--border)]': ''}  rounded-full cursor-pointer`}><LuSunMedium /></button>
                        <button onClick={()=> setTheme('dark')} className={`p-1 ${theme === 'dark'? 'bg-white/10 border border-[var(--border)]': ''}  rounded-full cursor-pointer`}><FiMoon /></button>
                    </div>
                    
                    <button onClick={()=>navigate('/signup')}
                        className='px-4 py-1.5 text-sm md:text-base text-black rounded-lg bg-linear-to-br from-blue-400 to-blue-600 
                        cursor-pointer shadow-md hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] hover:brightness-110 transition-all 
                        duration-300'>
                        Sign Up
                    </button>

                </div>
            </nav>
            <div id='home' className='flex flex-col items-center gap-3 py-35 px-4 overflow-hidden'>
                
                <div className='flex items-center gap-2 px-4 py-1.5 rounded-full text-xs bg-white/10 backdrop-blur-md border border-[var(--border)] shadow-lg'>
                    <span className='w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse'></span>
                    Manage Your Finance Smarter
                </div>
                <h1 className='text-4xl sm:text-5xl md:text-7xl text-center leading-[1.1] md:leading-tight font-semibold'>Split smart, <br />Live easy.</h1>
                <p className='mx-auto text-center text-xs sm:text-sm md:text-base text-[var(--text-dull)] max-w-[42ch] leading-relaxed'>Experience next-generation finance with powerful insights, automation and real-time control.</p>
                <div className='flex flex-col md:flex-row gap-3 mt-2'>
                    <button onClick={()=>navigate('/signup')} className='flex items-center justify-center gap-2 px-5 py-2 bg-linear-to-br rounded-lg text-black from-blue-400 to-blue-600 cursor-pointer shadow-md hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] hover:brightness-110 transition-all 
                    duration-300'>
                        Start Free Trial
                        <MdArrowOutward />
                    </button>
                    <button className='flex items-center justify-center gap-2 px-5 py-2 bg-linear-to-br rounded-lg text-[var(--text)] bg-white/10 cursor-pointer 
                    backdrop-blur-md border border-[var(--border)] hover:bg-white/20 transition shadow-lg'>
                        Learn More
                        <MdArrowOutward />
                    </button>
                </div>
                <div className='hidden md:flex w-full justify-start px-10 py-5'>
                    <div className='flex bg-white/10 backdrop-blur-md border border-[var(--border)] p-1 rounded-full gap-2'>
                        <button onClick={()=> setTheme('light')} className={`p-1 ${theme === 'light'? 'bg-white border border-[var(--border)]': ''}  rounded-full cursor-pointer`}><LuSunMedium /></button>
                        <button onClick={()=> setTheme('dark')} className={`p-1 ${theme === 'dark'? 'bg-white/10 border border-[var(--border)]': ''}  rounded-full cursor-pointer`}><FiMoon /></button>
                    </div>
                </div>
            </div>
            <div id='services' className='bg-[var(--bg-secondary)] px-10 py-5 md:px-18 md:py-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 py-20 items-center'>
                    <h2 className='text-4xl md:text-5xl font-headline font-extrabold tracking-tight'>Simplify Your Ledger. <br /> <span className='text-[var(--text-dull)]'>Three Steps to Fluidity.</span></h2>
                    <p className='leading-relaxed max-w-md text-sm text-[var(--text-dull)] md:ml-auto'>We've distilled complex group finance into a streamlined workflow.
                        <br /> No more chasing IOUs or calculating complex conversions. It just flows.</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 py-10'>
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className='group p-8 rounded-3xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-all duration-300'>
                                <div className='w-14 h-14 bg-[var(--bg-icon)] flex items-center justify-center rounded-2xl transition group-hover:bg-[var(--bg-icon-hover)]'>
                                    <Icon className='text-3xl text-[var(--icon-color)] transition group-hover:scale-110 group-hover:text-[var(--icon-hover-color)]' />
                                </div>
                                <h3 className='text-xl font-headline font-medium mb-4 mt-4'>{step.title}</h3>
                                <p className='leading-relaxed text-[var(--text-dull)]'>{step.description}</p>
                                <div className='mt-8 text-6xl font-headline font-black text-[#232327] transition group-hover:text-[#2f3340] group-hover:scale-105'>{step.number}</div>
                            </div>
                        )
                    })}

                </div>
            </div>
            
            <div className='bg-[var(--bg-primary)] px-10 py-5 md:px-18 md:py-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 py-20 items-center'>
                    <h2 className='text-4xl md:text-5xl font-headline font-extrabold tracking-tight'>We Are<br /> <span className='text-[var(--text-dull)]'>Listerning From You.</span></h2>
                    <p className='leading-relaxed max-w-md text-sm text-[var(--text-dull)] md:ml-auto'>Currently We dont have that much users
                        <br />feedback but that we can build it together.</p>
                </div>
            </div>

            <div id='features' className='bg-[var(--bg-secondary)] px-10 py-5 md:px-18 md:py-5'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 py-20 items-center'>
                    <h2 className='text-4xl md:text-5xl font-headline font-extrabold tracking-tight'>Manage Your<br /> <span className='text-[var(--text-dull)]'>Finance Smarter</span></h2>
                    <p className='leading-relaxed max-w-md text-sm text-[var(--text-dull)] md:ml-auto'>Track spending, manage budget, nd gain real-time financial
                        <br />a insights in one powerfull platform.</p>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 py-10'>
                    {features.map((features, index)=>{
                        const Icon = features.icon;

                        return (
                            <div key={index} className='group p-8 rounded-3xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-all duration-300'>
                                <div className='w-14 h-14 bg-[var(--bg-icon)] flex items-center justify-center rounded-2xl transition group-hover:bg-[var(--bg-icon-hover)]'>
                                    <Icon className='text-3xl text-[var(--icon-color)] transition group-hover:scale-110 group-hover:text-[var(--icon-hover-color)]' />
                                </div>
                                <h3 className='text-xl font-headline font-medium mb-4 mt-4'>{features.title}</h3>
                                <p className='leading-relaxed text-[var(--text-dull)]'>{features.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div id='about' className='flex text-[#FFFFFF] flex-col px-10 py-30 md:px-18 text-center gap-5 bg-linear-to-br from-[#262C3E] to-black'>
                <h2 className='text-5xl md:text-7xl font-extrabold tracking-tighter'>Take Control of Your <br /> Finances</h2>
                <p className='text-[var(--text-dull)]'>Simplify how you track, split, and manage money — all in one seamless platform.</p>
                <p className='text-[var(--text-dull)] text-xs'>No Credit Card Required • Instant Setup</p>
            </div>
            <div className='bg-[var(--bg-primary)]'>
                <footer className="bg-[var(--bg-primary)] w-full max-w-337.5mx-auto text-[var(--text)] py-6 lg:pt-12 px-4 sm:px-8 md:px-16 lg:px-28 rounded-tl-3xl rounded-tr-3xl overflow-hidden">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
                        
                        <div className="lg:col-span-3 space-y-6">
                            <a href="" className="block">
                                <img className='h-6 md:h-8' src={assets.logo} alt="" />
                            </a>
                            <p className="text-sm/6 text-[var(--text)] max-w-96">Splitzy helps you track expenses, split bills, and settle payments effortlessly — all in one simple platform.</p>
                            <div className="flex gap-5 md:gap-6 order-1 md:order-2">
                                
                                {/* Discord */}
                                <a className="text-[var(--text)] hover:text-[var(--text-dull)]">
                                    <LiaDiscord className='w-5 h-5'/>
                                </a>
                                {/* Github */}
                                <a  className="text-[var(--text)] hover:text-[var(--text-dull)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-2 gap-8 md:gap-12 lg:gap-28 items-start">
                            {/* Splitzy */}
                            <div>
                                <h3 className="font-medium text-sm mb-4">Splitzy</h3>
                                <ul className="space-y-3 text-sm text-[var(--text)]">
                                    <li><a href="#" className="hover:text-[var(--text-dull)]">About</a></li>
                                    <li><a href="#" className="hover:text-[var(--text-dull)]">Privacy policy</a></li>
                                    <li><a href="#" className="hover:text-[var(--text-dull)]">Contact Us</a></li>
                                </ul>
                            </div>

                            {/* Account */}
                            <div>
                                <h3 className="font-medium text-sm mb-4">Account</h3>
                                <ul className="space-y-3 text-sm text-[var(--text)]">
                                    <li><a href="/signup" className="hover:text-[var(--text-dull)]">Login</a></li>
                                    <li><a href="/signup" className="hover:text-[var(--text-dull)]">Sign up</a></li>
                                    <li><a href="/forgotpassword" className="hover:text-[var(--text-dull)]">Reset password</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto mt-12 pt-4 border-t border-neutral-700 flex justify-between items-center">
                        <p className="text-neutral-400 text-sm">© {new Date().getFullYear()} Splitzy</p>
                        <p className='text-sm text-neutral-400'>All right reserved.</p>
                    </div>
                    <div className="relative h-40">
                        <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-3xl h-full max-h-64 bg-[var(--primary)] rounded-full blur-[170px] pointer-events-none"/>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default LandingPage