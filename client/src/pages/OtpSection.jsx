import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from './../context/AppContext';

const OtpSection = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const inputRef = useRef([]);
    const [time, setTime]= useState(54);

    const {navigate} = useAppContext();

    const handleChange = (value, index)=>{
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);

        if(value && index < 3){
            inputRef.current[index+1].focus();
        }
    };

    const handleKeyDown =(e, index)=>{
        if(e.key === "Backspace" && !otp[index] && index >0){
            inputRef.current[index-1].focus();
        }
    }

    useEffect(()=>{

        if(time <= 0) return;

        const timer = setInterval(()=>{
            setTime((prev)=> prev-1);
        }, 1000);
        return ()=> clearInterval(timer);

    },[time]);

    // format mm:ss
    const formatTime = (t) => {
        const minutes = String(Math.floor(t / 60)).padStart(2, "0");
        const seconds = String(t % 60).padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const handleSubmit=()=>{
        console.log(otp);
        navigate('/home');

    }

    const handleResend = ()=>{
        setTime(54);
    };
    
  return (
    <div className='w-full flex flex-col h-screen bg-[var(--bg-primary)] text-[var(--text)] items-center justify-center px-5'>
        <div className='w-fit flex flex-col px-8 py-12 rounded-lg bg-[var(--bg-secondary)] gap-5'>
            <div>
                <h3 className='text-2xl font-bold'>Verify Account</h3>
                <span className='text-sm'>We've sent a 4 digit code to your email.</span>
            </div>
            <div className='flex gap-3 justify-center'>
                {otp.map((value, index)=>(
                    <input
                        className='w-12 h-12 p-4 text-center text-lg bg-[var(--bg-card)] border border-[var(--border)] 
                        text-[var(--text)] placeholder:text-[var(--text-dull)] 
                        focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded-lg' 
                        ref={(el) => (inputRef.current[index] = el)}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        type="text"
                        key={index}
                        value={value}
                        maxLength='1'
                    />
                ))}
            </div>
            <button onClick={handleSubmit} className='bg-linear-to-br rounded-lg
                     from-blue-400 to-blue-600 py-2 text-black cursor-pointer
                      hover:brightness-110 transition-all'>
                        Verify
            </button>
            <div className='flex flex-col items-center gap-2'>
                <p className='text-xs'>Didn't receive the code? <span onClick={handleResend} className={`${time > 0 ? "text-[#1c3b6e]" : "text-[#3B82F6]"} cursor-pointer`}>Resend Code</span></p>
                <p className='text-[#3B82F6] text-xs'>{time>0 && formatTime(time)}</p>
            </div>
        </div>
    </div>
  )
}

export default OtpSection