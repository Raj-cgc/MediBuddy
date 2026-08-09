import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className='bg-gradient-to-b from-emerald-50/50 to-emerald-100/60 rounded-t-[3rem] mt-28 pt-16 pb-8 border-t border-emerald-100 px-6 lg:px-12 text-slate-700'>
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-emerald-200/60'>
                
                {/* Brand & Description */}
                <div className='md:col-span-2 flex flex-col items-start gap-4'>
                    <div onClick={() => navigate('/')} className='flex items-center gap-2.5 cursor-pointer group'>
                        <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20'>
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
                            </svg>
                        </div>
                        <span className='text-2xl font-bold tracking-tight text-slate-800'>
                            medi<span className='text-teal-600 font-extrabold'>Buddy</span>
                        </span>
                    </div>

                    <p className='text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-sm mt-1'>
                        Connecting patients with certified medical specialists instantly. Schedule appointments, consult top doctors, and manage health records seamlessly.
                    </p>

                    {/* Social Media Icons */}
                    <div className='flex items-center gap-3 pt-2'>
                        <span className='w-9 h-9 rounded-full bg-white border border-emerald-200 text-teal-700 flex items-center justify-center text-sm shadow-xs hover:bg-teal-600 hover:text-white transition-colors cursor-pointer'>
                            🌐
                        </span>
                        <span className='w-9 h-9 rounded-full bg-white border border-emerald-200 text-teal-700 flex items-center justify-center text-sm shadow-xs hover:bg-teal-600 hover:text-white transition-colors cursor-pointer'>
                            💬
                        </span>
                        <span className='w-9 h-9 rounded-full bg-white border border-emerald-200 text-teal-700 flex items-center justify-center text-sm shadow-xs hover:bg-teal-600 hover:text-white transition-colors cursor-pointer'>
                            📧
                        </span>
                    </div>
                </div>

                {/* Company Links */}
                <div className='flex flex-col items-start gap-3'>
                    <h4 className='text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-1'>
                        Company
                    </h4>
                    <ul className='flex flex-col gap-2.5 text-xs sm:text-sm font-medium text-slate-600'>
                        <li onClick={() => { navigate('/'); scrollTo(0, 0) }} className='hover:text-teal-700 cursor-pointer transition-colors'>Home</li>
                        <li onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='hover:text-teal-700 cursor-pointer transition-colors'>All Doctors</li>
                        <li onClick={() => { navigate('/about'); scrollTo(0, 0) }} className='hover:text-teal-700 cursor-pointer transition-colors'>About Us</li>
                        <li onClick={() => { navigate('/contact'); scrollTo(0, 0) }} className='hover:text-teal-700 cursor-pointer transition-colors'>Contact Us</li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div className='flex flex-col items-start gap-3'>
                    <h4 className='text-sm font-extrabold uppercase tracking-wider text-slate-900 mb-1'>
                        Get In Touch
                    </h4>
                    <ul className='flex flex-col gap-2.5 text-xs sm:text-sm font-medium text-slate-600'>
                        <li className='flex items-center gap-2'>
                            <span className='text-teal-600'>📞</span> +91-7004155718
                        </li>
                        <li className='flex items-center gap-2'>
                            <span className='text-teal-600'>✉️</span> rajkumarbxr78@gmail.com
                        </li>
                        <li className='flex items-center gap-2'>
                            <span className='text-teal-600'>📍</span> London & New Delhi
                        </li>
                    </ul>
                </div>

            </div>

            {/* Copyright */}
            <div className='max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-semibold text-slate-500 gap-3'>
                <p>© {new Date().getFullYear()} MediBuddy. All rights reserved.</p>
                <div className='flex items-center gap-6'>
                    <span className='hover:text-teal-700 cursor-pointer'>Privacy Policy</span>
                    <span className='hover:text-teal-700 cursor-pointer'>Terms of Service</span>
                </div>
            </div>

        </footer>
    )
}

export default Footer