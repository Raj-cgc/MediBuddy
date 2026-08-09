import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className='relative overflow-hidden bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-600 rounded-[2.5rem] px-6 sm:px-10 lg:px-16 my-20 shadow-xl shadow-teal-900/15 border border-teal-600/30'>
            {/* Ambient Lighting */}
            <div className='absolute -top-20 -left-20 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl pointer-events-none'></div>
            <div className='absolute -bottom-20 -right-20 w-80 h-80 bg-emerald-300/20 rounded-full blur-3xl pointer-events-none'></div>

            <div className='relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 py-10 md:py-14'>
                
                {/* Left Side Info */}
                <div className='w-full md:w-1/2 flex flex-col items-start gap-5 text-left'>
                    <span className='px-4 py-1 rounded-full bg-teal-500/20 text-emerald-200 text-xs font-extrabold uppercase tracking-wider border border-teal-400/30 backdrop-blur-md'>
                        Instant Consultation
                    </span>
                    <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight'>
                        Book Appointment <br />
                        <span className='font-serif-accent italic font-normal text-emerald-200'>With 100+ Trusted</span> Doctors
                    </h2>
                    <p className='text-teal-100 text-xs sm:text-sm font-normal max-w-md leading-relaxed'>
                        Join thousands of patients who get quick, reliable medical consultations and prescription guidance online.
                    </p>
                    <button 
                        onClick={() => { navigate('/login'); scrollTo(0, 0) }} 
                        className='inline-flex items-center gap-3 bg-white hover:bg-emerald-50 text-teal-900 font-extrabold text-sm px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mt-2 cursor-pointer'
                    >
                        <span>Create Account</span>
                        <span className='w-6 h-6 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-xs'>↗</span>
                    </button>
                </div>

                {/* Right Side Visual Image */}
                <div className='w-full md:w-1/2 relative flex justify-center md:justify-end items-end min-h-[260px] sm:min-h-[300px] mt-4 md:mt-0'>
                    <img 
                        className='w-full max-w-sm md:max-w-md h-auto object-contain drop-shadow-2xl' 
                        src={assets.appointment_img} 
                        alt="Appointment Doctor" 
                    />
                </div>

            </div>
        </div>
    )
}

export default Banner