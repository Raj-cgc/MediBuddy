import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const NavBar = () => {
    const { aToken, setAToken } = useContext(AdminContext)
    const { dToken, setDToken } = useContext(DoctorContext)

    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        aToken && setAToken('');
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

    return (
        <header className='sticky top-0 z-50 backdrop-blur-md bg-white/85 border-b border-emerald-100/80 px-4 sm:px-8 py-3.5 shadow-xs'>
            <div className='max-w-7xl mx-auto flex justify-between items-center'>
                
                {/* Brand Logo & Role Tag */}
                <div className='flex items-center gap-2 sm:gap-3 cursor-pointer' onClick={() => navigate('/')}>
                    <div className='w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20 flex-shrink-0'>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z"/>
                        </svg>
                    </div>
                    <span className='text-lg sm:text-xl font-bold tracking-tight text-slate-800'>
                        medi<span className='text-teal-600 font-extrabold'>Buddy</span>
                    </span>
                    <span className='px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[10px] sm:text-[11px] font-extrabold border border-emerald-200/80 uppercase tracking-wider ml-0.5 sm:ml-1'>
                        {aToken ? 'Admin' : 'Doctor'}
                    </span>
                </div>

                {/* Logout Button */}
                <button 
                    onClick={logout} 
                    className='bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-extrabold text-xs px-4 sm:px-7 py-2 sm:py-2.5 rounded-full shadow-md shadow-teal-600/20 hover:shadow-lg transition-all duration-300 cursor-pointer'
                >
                    Logout
                </button>

            </div>
        </header>
    )
}

export default NavBar