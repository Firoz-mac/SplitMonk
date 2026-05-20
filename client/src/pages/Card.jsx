import React, { useEffect, useRef, useState } from 'react'
import { assets, splitCardBenefits, splitCardDetails } from './../assets/assets';

const Card = () => {

  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const mainButtonRef = useRef(null);
  const rightPanelRef = useRef(null);

  useEffect(()=>{

    if (!mainButtonRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowFloatingButton(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(mainButtonRef.current);

    return () => observer.disconnect();

  },[]);

  const handlePageWheel =(e)=>{

    const rightPanel = rightPanelRef.current;

    if (!rightPanel) return;
    if (window.innerWidth < 1024) return;
    
    e.preventDefault()

    rightPanel.scrollTop += e.deltaY * 0.7;
  }

  return (

    <div
      
      className='w-full lg:h-full bg-gradient-to-r from-gray-900 via-indigo-900 to-indigo-900 animate-gradient 
      flex flex-col lg:grid lg:grid-cols-2'
    >

      <div onWheel={handlePageWheel} className='flex justify-center items-center py-15 '>

        <div className='flex flex-col items-center gap-10'>

          <h4 className='text-center text-3xl  lg:text-4xl font-bold  text-white'>

            Spend. Split. <br />

            <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>
              Simplified.
            </span>

          </h4>

          <div className='relative flex items-center justify-center'>

            <div className='absolute h-52 w-52 rounded-full bg-violet-500/20 blur-3xl' />

            <img
              className='relative z-10 w-[250px] transition-all duration-500 ease-out hover:-translate-y-4
              hover:scale-105 hover:rotate-2'
              src={assets.card}
              alt='Digital split card'
            />

          </div>

          <button
            ref={mainButtonRef}
            className='group relative w-[240px] overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500
            px-5 py-3.5 font-semibold text-white cursor-pointer'
          >
            <span className='relative z-10'>
              Get Started
            </span>

            <div className='absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

          </button>

        </div>

      </div>

      <div ref={rightPanelRef} className='w-full bg-[#eeecff] p-10 flex flex-col items-center lg:overflow-y-scroll gap-5 lg:gap-2 no-scrollbar'>

        <div className="grid w-full max-w-sm grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">

          {splitCardBenefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.label}
                className="flex flex-col items-center gap-2 rounded-xl p-3 text-center transition"
              >
                <div 
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d4d4ff] text-2xl 
                  text-indigo-700 sm:h-20 sm:w-20"
                >
                  <Icon/>
                </div>

                <span className="text-xs font-medium leading-snug text-slate-700">
                  {benefit.label}
                </span>
              </div>
            )
          })}
          
        </div>

        <div className='w-full max-w-sm flex flex-col gap-8 md:p-8'>

          {splitCardDetails.map((detail)=>(

            <div 
              key={detail.title} 
              className={`w-full ${detail.bg} overflow-hidden rounded-2xl`}
            >

              <div className='space-y-2 p-8'>
                <h6 className='text-lg font-semibold leading-snug text-neutral-950'>{detail.title}</h6>
                <p className='text-sm leading-relaxed text-neutral-700'>{detail.description}</p>
              </div>
              <div className='w-full h-[200px] overflow-hidden'>
                <img src={detail.image} alt="" />
              </div>

            </div>

          ))}

        </div>

        {showFloatingButton && (

          <button
            className='lg:hidden group fixed bottom-20 left-1/2 z-50 w-[calc(100%-40px)] max-w-sm -translate-x-1/2 overflow-hidden 
            rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-5 py-4 font-semibold text-white shadow-2xl 
            shadow-fuchsia-900/30 transition'
          >
            <span className='relative z-10'>
              Get Started
            </span>

            <div className='absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100' />

          </button>

        )}

      </div>

    </div>
  )
}

export default Card