import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { assets, features, Faqs, mainFeatures } from '../assets/assets'
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { LiaDiscord } from "react-icons/lia";
import FeatureBlock from '../components/FeatureBlock';
import { useAppContext } from '../context/AppContext';

const menuValues = ["Home", "Services", "Features", "About"];

const getTheme = (hours) => {
    if (hours < 12) return "morning";
    if (hours < 17) return "afternoon";
    if (hours < 20) return "evening";
    return "night";
};

const getColor = (theme) => {
    switch (theme) {
        case "morning":
            return {
                bg: "from-yellow-200 via-pink-200 to-blue-200",
                text: "text-gray-900",
                subText: "text-gray-600"
            }
        case "afternoon":
            return {
                bg: "from-blue-300 via-sky-200 to-indigo-300",
                text: "text-gray-900",
                subText: "text-gray-600"
            };
        case "evening":
            return {
                bg: "from-orange-300 via-pink-300 to-purple-400",
                text: "text-gray-900",
                subText: "text-gray-600"
            };
        case "night":
            return {
                bg: "from-gray-900 via-indigo-900 to-black",
                text: "text-white",
                subText: "text-gray-400"
            };
        default:
            return {
                bg: "from-blue-200 to-purple-200",
                text: "text-gray-900",
                subText: "text-gray-600"
            };
    }
};

const LandingNew = () => {

    const [timeTheme, setTimeTheme] = useState("night");
    const [openFAQIndex, setOpenFaqIndex] = useState(0);

    const {navigate} = useAppContext();

    useEffect(() => {
        const updateTheme = () => {
            const hours = new Date().getHours();
            setTimeTheme(getTheme(hours));
        };

        updateTheme();
        const interval = setInterval(updateTheme, 60000);

        return () => clearInterval(interval);

    }, []);

    const handleMenuClick = useCallback((value) => {
        const section = document.getElementById(value.toLowerCase());

        if (section) {
            const yOffset = -80;
            const y = section.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    },[]);

    const toggleFaq = useCallback((index) => {
        setOpenFaqIndex(prev => (prev === index ? null : index));
    }, []);

    const themeStyles = useMemo(() => getColor(timeTheme), [timeTheme]);

    return (
        <div className='w-full'>
            <div className='fixed top-0 left-0 z-50 w-full px-6 pt-4'>
                <nav className='max-w-6xl px-6 mx-auto  flex items-center justify-between py-3 border rounded-full 
                shadow-lg md:px-10 bg-white/70 backdrop-blur-xl border-white/40'>
                    <button onClick={() => handleMenuClick('home')} className='flex items-center gap-2 cursor-pointer'>
                        <img className='h-6 md:h-8' src={assets.logo} alt="SplitMonk Logo" />
                        <span className='text-lg font-semibold md:text-xl'>SplitMonk</span>
                    </button>
                    <div className='hidden gap-6 text-sm font-medium text-gray-700 md:flex'>
                        {menuValues.map((value, index) => (
                            <button onClick={() => handleMenuClick(value)} key={index} className='relative transition 
                            cursor-pointer hover:text-black group'>
                                {value}
                                <span className='absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-500 transition-all 
                                duration-300 group-hover:w-full'></span>
                            </button>
                        ))}
                    </div>
                    <button onClick={()=>navigate('/signup')} className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 
                    text-white px-3 py-1.5 rounded-full shadow-md cursor-pointer hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] 
                    transition-all duration-300'>
                        <span className='text-sm md:text-base'>Get Started</span>
                        <div className='p-1 rounded-full bg-white/20'>
                            <ArrowUpRight className='w-4 h-4' />
                        </div>
                    </button>
                </nav>
            </div>

            <div id='home' className={`bg-gradient-to-br ${themeStyles.bg} animate-gradient pt-24`}>
                <div className="relative z-10 max-w-6xl px-6 mx-auto overflow-hidden text-center">
                    <div className="flex flex-col-reverse items-center justify-between md:flex-row">
                        <div className="flex justify-center w-full md:w-1/2">
                            <div className="relative">
                                <img src={assets.vector} alt="SplitMonk app dashboard preview" loading="lazy" className="w-80 md:w-[550px] drop-shadow-2xl 
                                transition-transform duration-500 hover:scale-105"/>
                            </div>
                        </div>
                        <div className="w-full mt-10 text-center md:mt-0 md:w-1/2 md:text-left">
                            <div className="inline-block px-4 py-1 mb-6 text-sm rounded-full shadow bg-white/70 backdrop-blur">
                                Version V1.01
                            </div>
                            <h1 className={`text-4xl font-bold leading-tight tracking-tight ${themeStyles.text} opacity-0 
                            animate-fadeIn md:text-5xl`}>
                                Split expenses <br />
                                <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text">
                                    effortlessly with SplitMonk
                                </span>
                            </h1>
                            <p className={`max-w-md mx-auto mt-3 ${themeStyles.subText} md:mx-0`}>
                                Manage shared expenses, track balances, and settle up easily with friends.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div id='services' className='px-6 py-20'>
                    <div className='flex flex-col gap-1 text-center'>
                        <h2 className='text-2xl font-medium md:text-4xl'>Reach new height with SplitMonk</h2>
                        <span className='text-sm text-gray-500'>Manage, split, and track expenses effortlessly.</span>
                    </div>
                    <div className='grid max-w-6xl gap-8 mx-auto mt-6 md:grid-cols-3'>
                        {features.map((feature, index) => (
                            <div key={index} className={`flex flex-col items-center p-8 text-center bg-gradient-to-br ${feature.bg} rounded-2xl gap-1`}>
                                <img className='transition-transform duration-300 h-18 w-18 hover:rotate-12' src={feature.icon} alt={feature.title} />
                                <h4 className="text-lg font-semibold">{feature.title}</h4>
                                <p className="mt-2 text-sm leading-relaxed text-gray-700">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div id='features' className={`bg-gradient-to-br ${themeStyles.bg} ${themeStyles.text} animate-gradient 
                px-6 py-20 flex flex-col`}>
                    <div className='flex flex-col gap-1 text-center'>
                        <h2 className='text-2xl font-medium md:text-4xl'>Packed with powerful feature</h2>
                        <span className={`text-sm ${themeStyles.subText} `}>Simplify your shared expenses with SplitMonk’s smart and intuitive tools.</span>
                    </div>
                    {mainFeatures.map((f, i) => {
                        return (
                            <FeatureBlock 
                                key={i} 
                                title={f.title} 
                                subTitle={f.subTitle} 
                                img={f.img} 
                                features={f.features} 
                                reverse={i % 2 !== 0} 
                            />
                        )
                    })}
                </div>
                <div id='about' className='grid grid-cols-1 px-10 py-32 md:grid-cols-2 gap-10 md:px-32'>
                    <div className='flex flex-col gap-3 items-center text-center md:text-start md:items-start'>
                        <span className='text-xs bg-purple-200 py-1 px-3 rounded-xl w-fit'>FAQs</span>
                        <h4 className='text-2xl font-medium md:text-3xl'>Frequently Asked Questions</h4>
                        <p className='text-sm text-gray-500'>Find answers to the most frequently asked questions about SplitMonk</p>
                    </div>
                    <div className='space-y-2'>
                        {Faqs.map((faq, index) => {
                            const isOpen = openFAQIndex === index;
                            return (
                                <div key={index} className='border border-gray-200 py-4 px-5 rounded-xl transition'>
                                    <div className='flex items-center justify-between'>
                                        <h5 className="font-medium">{faq.question}</h5>
                                        <button onClick={() => toggleFaq(index)} aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} className='cursor-pointer'>
                                            <ChevronDown className={`w-5 h-5 transition-transform 
                                                duration-300 ${isOpen ? "rotate-180" : ""}`} />
                                        </button>
                                    </div>
                                    <div className={`overflow-hidden transition-all 
                                        duration-300 ${isOpen ? "max-h-96 mt-3" : "max-h-0"}`}>
                                        <p className='text-sm text-gray-600'>{faq.answer}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <footer className={`px-6 md:px-16 lg:px-24 xl:px-32 w-full 
                    bg-gradient-to-br ${themeStyles.bg} ${themeStyles.text} animate-gradient`}>
                    <div className="flex flex-col md:flex-row items-start 
                    justify-center gap-10 py-10 border-b border-gray-500/30">

                        <div className="max-w-96">
                            <img className='w-10' src={assets.logo} alt="SplitMonk" />
                            <p className={`mt-6 text-sm ${themeStyles.subText}`}>
                                SplitMonk helps you track expenses, split bills, and settle payments effortlessly — all in one simple platform.
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                                <a href='https://discord.gg/KnHfQp4k' aria-label="Join our Discord">
                                    <LiaDiscord className={`w-6 h-6 ${themeStyles.subText}`} />
                                </a>
                            </div>
                        </div>

                        <div className="w-1/2 flex flex-wrap md:flex-nowrap justify-between gap-2">
                            <div>
                                <h3 className={`font-semibold ${themeStyles.text} mb-5`}>SplitMonk</h3>
                                <ul className={`text-sm ${themeStyles.subText} space-y-2 list-none`}>
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Privacy policy</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className={`font-semibold ${themeStyles.text} mb-5`}>Account</h3>
                                <ul className={`text-sm ${themeStyles.subText} space-y-2 list-none`}>
                                    <li><a href="#">Login</a></li>
                                    <li><a href="#">Sign up</a></li>
                                    <li><a href="#">Reset password</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                    <p className="py-4 text-center text-xs md:text-sm text-gray-500">
                        Copyright {new Date().getFullYear()} © SplitMonk. All Rights Reserved.
                    </p>
                </footer>
            </div>
        </div>
    )
}

export default LandingNew