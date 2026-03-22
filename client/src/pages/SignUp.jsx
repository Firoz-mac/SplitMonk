import React, { useState } from 'react'
import { FiEye, FiEyeOff } from "react-icons/fi";
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const SignUp = () => {

    const [passShow, setPassShow] = useState(false);
    const [confPassShow, setConfPassShow] = useState(false);
    const [pageValue, setPageValue] = useState('Login');

    return (
        <div className='w-full flex flex-col h-screen bg-[var(--bg-primary)] text-[var(--text)] items-center justify-center px-5'>
            <div className='w-fit flex flex-col px-8 py-12 rounded-lg bg-[var(--bg-secondary)] gap-5'>
                <div>
                    <img className='h-10 md:h-10' src={assets.logo} alt="" />
                </div>
                <div>
                    <h3 className='text-2xl font-bold'>{pageValue === 'Login' ? "Welcome back" : "Create Account"}</h3>
                    <span className='text-sm'>{pageValue === 'Login' ? "Enter your credentials to access the ledger." : "Join the next generation of financial management."}</span>
                </div>
                <form className='flex flex-col gap-3'>
                    <div className="max-w-sm w-full">
                        <div>
                            <input
                                type='email'
                                placeholder="Email"
                                className="w-full py-2.5 sm:py-3 px-4 pr-10 rounded-lg 
                                    bg-[var(--bg-card)] border border-[var(--border)] 
                                    text-[var(--text)] placeholder:text-[var(--text-dull)] 
                                    focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            />
                        </div>
                    </div>

                    <div className="max-w-sm w-full">
                        <div className="relative">
                            <input
                                type={passShow ? "text" : "password"}
                                placeholder="Password"
                                className="w-full py-2.5 sm:py-3 px-4 pr-10 rounded-lg 
                                    bg-[var(--bg-card)] border border-[var(--border)] 
                                    text-[var(--text)] placeholder:text-[var(--text-dull)] 
                                    focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            />

                            <button
                                type="button"
                                onClick={() => setPassShow(!passShow)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-[var(--text-dull)] hover:text-[var(--text)] transition"
                            >
                                {passShow ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                            </button>
                        </div>
                    </div>
                    {pageValue === 'Signup' ?

                        <div className="max-w-sm w-full">
                            <div className="relative">
                                <input
                                    type={confPassShow ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    className="w-full py-2.5 sm:py-3 px-4 pr-10 rounded-lg 
                                        bg-[var(--bg-card)] border border-[var(--border)] 
                                        text-[var(--text)] placeholder:text-[var(--text-dull)] 
                                        focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                                />

                                <button
                                    type="button"
                                    onClick={() => setConfPassShow(!confPassShow)}
                                    className="absolute inset-y-0 right-0 flex items-center px-3 text-[var(--text-dull)] hover:text-[var(--text)] transition"
                                >
                                    {confPassShow ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </button>
                            </div>
                        </div>

                        : null

                    }

                    <button className='bg-linear-to-br rounded-lg from-blue-400 to-blue-600 py-2 text-black cursor-pointer hover:brightness-110 transition-all'>Login</button>
                </form>
                <div className='flex text-sm gap-1 justify-center'>
                    {pageValue === 'Login'?
                        <>
                            <span>New to the platform?</span>
                            <span onClick={()=>setPageValue('Signup')} className='text-[#3B82F6] cursor-pointer'>Create Account</span>
                        </>
                    :
                        <>
                            <span>Already have account?</span>
                            <span onClick={()=>setPageValue('Login')} className='text-[#3B82F6] cursor-pointer'>Login</span>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default SignUp