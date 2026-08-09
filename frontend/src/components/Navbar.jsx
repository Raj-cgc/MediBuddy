import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <header className='sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-emerald-100/60 transition-all shadow-xs'>
            <div className='max-w-7xl mx-auto flex items-center justify-between py-3.5 px-4 sm:px-6 lg:px-8'>
                
                {/* Brand Logo */}
                <div onClick={() => navigate('/')} className='flex items-center gap-2.5 cursor-pointer group'>
                    <div className='w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform'>
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
                        </svg>
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-xl font-bold tracking-tight text-slate-800 flex items-center gap-0.5'>
                            medi<span className='text-teal-600 font-extrabold'>Buddy</span>
                        </span>
                    </div>
                </div>

                {/* Nav Links */}
                <ul className='hidden md:flex items-center gap-1 bg-emerald-50/70 p-1.5 rounded-full border border-emerald-100/80 text-xs font-semibold text-slate-600'>
                    <NavLink to='/' className={({ isActive }) => `px-5 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30' : 'hover:text-teal-700 hover:bg-emerald-100/50'}`}>
                        Home
                    </NavLink>
                    <NavLink to='/doctors' className={({ isActive }) => `px-5 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30' : 'hover:text-teal-700 hover:bg-emerald-100/50'}`}>
                        All Doctors
                    </NavLink>
                    <NavLink to='/about' className={({ isActive }) => `px-5 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30' : 'hover:text-teal-700 hover:bg-emerald-100/50'}`}>
                        About
                    </NavLink>
                    <NavLink to='/contact' className={({ isActive }) => `px-5 py-2 rounded-full transition-all duration-300 ${isActive ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/30' : 'hover:text-teal-700 hover:bg-emerald-100/50'}`}>
                        Contact
                    </NavLink>
                </ul>

                {/* Right Action / Profile */}
                <div className='flex items-center gap-3'>
                    {token && userData ? (
                        <div className='flex items-center gap-2.5 cursor-pointer group relative bg-emerald-50/80 hover:bg-emerald-100/70 py-1.5 px-3 rounded-full border border-emerald-100 transition-all'>
                            <img className='w-8 h-8 rounded-full object-cover border border-teal-500/30' src={userData.image || assets.profile_pic} alt="User Avatar" />
                            <span className='text-xs font-semibold text-slate-700 max-w-[100px] truncate hidden sm:inline-block'>{userData.name}</span>
                            <img className='w-2.5 opacity-60 group-hover:rotate-180 transition-transform' src={assets.dropdown_icon} alt="" />
                            
                            <div className='absolute top-full right-0 pt-3 text-sm font-medium text-slate-700 z-30 hidden group-hover:block w-52 animate-fadeIn'>
                                <div className='bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-emerald-100 flex flex-col gap-1'>
                                    <button onClick={() => navigate('/my-profile')} className='flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-teal-700 text-left transition-colors'>
                                        <span>👤</span> My Profile
                                    </button>
                                    <button onClick={() => navigate('/my-appointments')} className='flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-teal-700 text-left transition-colors'>
                                        <span>📅</span> My Appointments
                                    </button>
                                    <div className='h-px bg-slate-100 my-1'></div>
                                    <button onClick={logout} className='flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 text-left transition-colors'>
                                        <span>🚪</span> Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button 
                            onClick={() => navigate('/login')} 
                            className='bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full shadow-md shadow-teal-600/25 hover:shadow-lg hover:shadow-teal-600/35 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer hidden sm:block'
                        >
                            Get Started
                        </button>
                    )}

                    {/* Mobile menu trigger */}
                    <button onClick={() => setShowMenu(true)} className='p-2 rounded-xl bg-emerald-50 text-slate-700 md:hidden hover:bg-emerald-100 transition-colors'>
                        <img className='w-5' src={assets.menu_icon} alt="Menu" />
                    </button>

                    {/* Mobile Slide-out Menu */}
                    <div className={`${showMenu ? 'fixed inset-0 w-full h-full z-50 opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} md:hidden bg-slate-900/40 backdrop-blur-sm transition-all duration-300`}>
                        <div className={`fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl transition-transform duration-300 flex flex-col justify-between ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
                            <div>
                                <div className='flex items-center justify-between pb-5 border-b border-slate-100'>
                                    <div className='flex items-center gap-2'>
                                        <div className='w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white'>
                                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/></svg>
                                        </div>
                                        <span className='font-bold text-slate-800 text-lg'>medi<span className='text-teal-600'>Buddy</span></span>
                                    </div>
                                    <button onClick={() => setShowMenu(false)} className='p-2 rounded-full hover:bg-slate-100 text-slate-500'>
                                        <img className='w-5' src={assets.cross_icon} alt="Close" />
                                    </button>
                                </div>
                                <ul className='flex flex-col gap-2 mt-6 font-semibold text-slate-700'>
                                    <NavLink onClick={() => setShowMenu(false)} to='/' className={({ isActive }) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-teal-50 text-teal-700 font-bold' : 'hover:bg-slate-50'}`}>Home</NavLink>
                                    <NavLink onClick={() => setShowMenu(false)} to='/doctors' className={({ isActive }) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-teal-50 text-teal-700 font-bold' : 'hover:bg-slate-50'}`}>All Doctors</NavLink>
                                    <NavLink onClick={() => setShowMenu(false)} to='/about' className={({ isActive }) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-teal-50 text-teal-700 font-bold' : 'hover:bg-slate-50'}`}>About</NavLink>
                                    <NavLink onClick={() => setShowMenu(false)} to='/contact' className={({ isActive }) => `px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-teal-50 text-teal-700 font-bold' : 'hover:bg-slate-50'}`}>Contact</NavLink>
                                </ul>
                            </div>
                            {!token && (
                                <button 
                                    onClick={() => { setShowMenu(false); navigate('/login'); }} 
                                    className='w-full bg-teal-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-teal-600/30 text-center'
                                >
                                    Get Started
                                </button>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </header>
    )
}

export default Navbar