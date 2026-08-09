import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className='relative overflow-hidden bg-gradient-to-br from-[#eaf6f0] via-[#e2f3ec] to-[#f4faf7] rounded-[2.5rem] p-6 sm:p-10 lg:p-14 my-6 shadow-sm border border-emerald-100/60'>
            {/* Ambient Lighting Accents */}
            <div className='absolute -top-24 -left-24 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl pointer-events-none'></div>
            <div className='absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none'></div>

            <div className='relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12'>
                
                {/* Left Content Column */}
                <div className='w-full lg:w-1/2 flex flex-col items-start gap-6 text-left'>
                    
                    {/* Category Pill Tags */}
                    <div className='flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold'>
                        <span className='inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#cff4fc]/80 text-[#055160] border border-[#b6effb] shadow-xs hover:scale-105 transition-transform cursor-pointer'>
                            <svg className="w-3.5 h-3.5 fill-current text-teal-600" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                            Global Health
                        </span>
                        <span className='inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ffe5ec]/80 text-[#d63384] border border-[#fcc2d7] shadow-xs hover:scale-105 transition-transform cursor-pointer'>
                            Heart
                        </span>
                        <span className='inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#e2f0d9]/80 text-[#2b580c] border border-[#c5e0b4] shadow-xs hover:scale-105 transition-transform cursor-pointer'>
                            Nutrition
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl text-slate-800 font-extrabold leading-[1.15] tracking-tight'>
                        Book <span className='font-serif-accent italic font-normal text-teal-700 underline decoration-teal-300/60 decoration-wavy decoration-2'>Doctor's</span> <br />
                        Appointment
                    </h1>

                    {/* Subtitle */}
                    <p className='text-slate-600 text-sm sm:text-base max-w-md font-normal leading-relaxed'>
                        Follow this simple guide to sign up and start enjoying all the features we offer. Browse top specialists and schedule hassle-free.
                    </p>

                    {/* CTA Actions */}
                    <div className='flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto'>
                        <a 
                            href="#speciality" 
                            className='inline-flex items-center justify-center gap-3 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-semibold text-sm px-8 py-4 rounded-full shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all duration-300 group'
                        >
                            <span>Book Appointment</span>
                            <span className='w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform'>
                                ↗
                            </span>
                        </a>

                        <button 
                            onClick={() => navigate('/doctors')} 
                            className='inline-flex items-center justify-center px-6 py-4 rounded-full bg-white/80 hover:bg-white text-slate-700 text-sm font-semibold border border-emerald-100 shadow-sm hover:shadow transition-all'
                        >
                            View All Doctors
                        </button>
                    </div>

                    {/* Social / Social Proof Stats */}
                    <div className='flex items-center gap-3 pt-4 text-xs font-semibold text-slate-500'>
                        <img className='w-24' src={assets.group_profiles} alt="Trusted Users" />
                        <span>Joined by <strong className='text-slate-800 font-bold'>10,000+</strong> satisfied patients</span>
                    </div>

                </div>

                {/* Right Image Column with Floating Glass Cards */}
                <div className='w-full lg:w-1/2 relative flex justify-center items-center mt-6 lg:mt-0 min-h-[360px] sm:min-h-[500px] overflow-hidden sm:overflow-visible'>
                    
                    {/* Main Image Container */}
                    <div className='relative z-10 w-full max-w-xs sm:max-w-md rounded-3xl overflow-hidden bg-gradient-to-b from-teal-500/10 to-emerald-500/20 p-2 shadow-2xl shadow-emerald-900/10 border border-white/80'>
                        <img 
                            className='w-full h-auto max-h-[380px] sm:max-h-[460px] object-cover object-top rounded-2xl' 
                            src={assets.header_img} 
                            alt="Professional Doctor" 
                        />
                    </div>

                    {/* Floating Badge 1: Specialists */}
                    <div className='absolute top-4 left-2 sm:left-4 z-20 glass-pill px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl flex items-center gap-2 sm:gap-3 animate-float-slow shadow-lg'>
                        <div className='w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-teal-600/10 text-teal-700 flex items-center justify-center text-sm sm:text-lg font-bold'>
                            🩺
                        </div>
                        <div className='flex flex-col text-left'>
                            <span className='text-[9px] sm:text-[10px] uppercase tracking-wider text-slate-400 font-bold'>Specialists</span>
                            <span className='text-xs sm:text-sm font-extrabold text-slate-800'>+120 <span className='text-[10px] sm:text-xs font-semibold text-slate-500'>Drs</span></span>
                        </div>
                    </div>

                    {/* Floating Badge 2: Counseling (Hidden on mobile for clean layout) */}
                    <div className='hidden sm:flex absolute bottom-28 left-8 z-20 glass-pill px-4 py-2.5 rounded-2xl items-center gap-3 animate-float-medium shadow-lg'>
                        <div className='w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-lg font-bold'>
                            💊
                        </div>
                        <div className='flex flex-col text-left'>
                            <span className='text-[10px] uppercase tracking-wider text-slate-400 font-bold'>Counseling</span>
                            <span className='text-sm font-extrabold text-slate-800'>1:45 <span className='text-xs font-semibold text-slate-500'>Hours</span></span>
                        </div>
                    </div>

                    {/* Floating Badge 3: Lab Tests (Hidden on small mobile) */}
                    <div className='hidden sm:flex absolute top-20 right-2 z-20 glass-pill px-4 py-2.5 rounded-2xl items-center gap-3 animate-float-slow shadow-lg'>
                        <div className='w-9 h-9 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-lg font-bold'>
                            🔮
                        </div>
                        <div className='flex flex-col text-left'>
                            <span className='text-[10px] uppercase tracking-wider text-slate-400 font-bold'>Lab Tests</span>
                            <span className='text-sm font-extrabold text-slate-800'>14/25 <span className='text-xs font-semibold text-slate-500'>Results</span></span>
                        </div>
                    </div>

                    {/* Floating Badge 4: Rating & Reviews Card */}
                    <div className='absolute bottom-2 right-2 sm:right-6 sm:-bottom-4 z-30 glass-card p-2.5 sm:p-3.5 rounded-2xl flex items-center gap-2.5 sm:gap-3.5 shadow-xl border border-white/90 animate-float-medium'>
                        <img className='w-9 h-9 sm:w-11 sm:h-11 rounded-xl object-cover border-2 border-teal-500/40 shadow-xs' src={assets.doc1 || assets.profile_pic} alt="Doctor" />
                        <div className='flex flex-col text-left'>
                            <div className='flex items-center gap-1 text-amber-500 text-[11px] sm:text-xs font-extrabold'>
                                <span>★ 4.9</span>
                            </div>
                            <span className='text-[11px] sm:text-xs font-bold text-slate-800'>2,568 reviews</span>
                        </div>
                        <button 
                            onClick={() => navigate('/doctors')} 
                            className='w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer ml-1 text-xs sm:text-sm font-bold'
                        >
                            ↗
                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Header