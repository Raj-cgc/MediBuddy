import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <aside className='min-h-[calc(100vh-65px)] bg-white/70 backdrop-blur-md border-r border-emerald-100/80 p-3 md:p-5 flex-shrink-0'>
      {aToken && (
        <ul className='flex flex-col gap-2 font-bold text-slate-600 text-xs sm:text-sm'>
          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30' 
                : 'hover:bg-emerald-50 hover:text-teal-700'
            }`} 
            to={'/admin-dashboard'}
          >
            <img className='w-5 h-5 opacity-90' src={assets.home_icon} alt="" />
            <span className='hidden md:block'>Dashboard</span>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30' 
                : 'hover:bg-emerald-50 hover:text-teal-700'
            }`} 
            to={'/all-appointments'}
          >
            <img className='w-5 h-5 opacity-90' src={assets.appointment_icon} alt="" />
            <span className='hidden md:block'>Appointments</span>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30' 
                : 'hover:bg-emerald-50 hover:text-teal-700'
            }`} 
            to={'/add-doctor'}
          >
            <img className='w-5 h-5 opacity-90' src={assets.add_icon} alt="" />
            <span className='hidden md:block'>Add Doctor</span>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30' 
                : 'hover:bg-emerald-50 hover:text-teal-700'
            }`} 
            to={'/doctor-list'}
          >
            <img className='w-5 h-5 opacity-90' src={assets.people_icon} alt="" />
            <span className='hidden md:block'>Doctors List</span>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className='flex flex-col gap-2 font-bold text-slate-600 text-xs sm:text-sm'>
          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30' 
                : 'hover:bg-emerald-50 hover:text-teal-700'
            }`} 
            to={'/doctor-dashboard'}
          >
            <img className='w-5 h-5 opacity-90' src={assets.home_icon} alt="" />
            <span className='hidden md:block'>Dashboard</span>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30' 
                : 'hover:bg-emerald-50 hover:text-teal-700'
            }`} 
            to={'/doctor-appointments'}
          >
            <img className='w-5 h-5 opacity-90' src={assets.appointment_icon} alt="" />
            <span className='hidden md:block'>Appointments</span>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-3.5 py-3 px-4 rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30' 
                : 'hover:bg-emerald-50 hover:text-teal-700'
            }`} 
            to={'/doctor-profile'}
          >
            <img className='w-5 h-5 opacity-90' src={assets.people_icon} alt="" />
            <span className='hidden md:block'>Doctor Profile</span>
          </NavLink>
        </ul>
      )}
    </aside>
  )
}

export default Sidebar