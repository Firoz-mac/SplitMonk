import React, { useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAppContext } from '../context/AppContext';

const ForgotPassword = () => {

    const [email, setEmail] = useState();
    const [account, setAccount] = useState(null);
    const [passShow, setPassShow] = useState(false);
    const [confPassShow, setConfPassShow] = useState(false);
    const {navigate} = useAppContext();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = () => {
        if(!account){
            console.log(email);
        }else{
            console.log(email);
            navigate('/signup');
        }
        
    };

    return (
        <div className='w-full flex flex-col h-screen bg-[var(--bg-primary)] text-[var(--text)] items-center justify-center px-5'>
            <div className='w-fit flex flex-col px-8 py-12 rounded-lg bg-[var(--bg-secondary)] gap-5'>
                <h3 className='text-2xl font-bold'>Forgot <br /> Password ?</h3>

                {!account ?
                    <div className="max-w-sm w-full">
                        <div>
                            <input
                                type='email'
                                name='email'
                                placeholder="Email"
                                required
                                onChange={handleChange}
                                className="w-full py-2.5 sm:py-3 px-4 pr-10 rounded-lg 
                                    bg-[var(--bg-card)] border border-[var(--border)] 
                                    text-[var(--text)] placeholder:text-[var(--text-dull)] 
                                    focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                            />
                        </div>
                    </div> :
                    <>
                    <div className="max-w-sm w-full">
                        <div className="relative">
                            <input
                                type={passShow ? "text" : "password"}
                                placeholder="New Password"
                                name='confirmPassword'
                                required
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
                    <div className="max-w-sm w-full">
                        <div className="relative">
                            <input
                                type={confPassShow ? "text" : "password"}
                                placeholder="Confirm Password"
                                name='confirmPassword'
                                required
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
                    </>
                }
                <button onClick={handleSubmit} className='bg-linear-to-br rounded-lg
                    from-blue-400 to-blue-600 py-2 text-black cursor-pointer
                    hover:brightness-110 transition-all'>
                    {account ?
                        "Reset" : "Find Account"
                    }
                </button>
                <div className='flex text-xs justify-center items-center gap-1 text-[var(--text-dull)]'>
                    <IoIosArrowRoundBack />
                    <Link to="/signup">Return to Login</Link>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword