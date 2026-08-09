import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <aside className='w-full md:w-64 md:min-h-[calc(100vh-65px)] bg-white/80 backdrop-blur-md border-b md:border-b-0 md:border-r border-emerald-100/80 p-2.5 md:p-5 flex-shrink-0 sticky top-[61px] md:top-[65px] z-40 overflow-x-auto'>
      {aToken && (
        <ul className='flex flex-row md:flex-col gap-1.5 md:gap-2 font-bold text-slate-600 text-xs sm:text-sm min-w-max md:min-w-0'>
          <NavLink 
            className={({ isActive }) => `flex items-center gap-2 md:gap-3.5 py-2.5 px-3.5 md:py-3 md:px-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 font-bold' 
                : 'hover:bg-emerald-50 hover:text-teal-700 bg-emerald-50/40 md:bg-transparent'
            }`} 
            to={'/admin-dashboard'}
          >
            <img className='w-4.5 h-4.5 md:w-5 md:h-5 opacity-90' src={assets.home_icon} alt="" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-2 md:gap-3.5 py-2.5 px-3.5 md:py-3 md:px-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 font-bold' 
                : 'hover:bg-emerald-50 hover:text-teal-700 bg-emerald-50/40 md:bg-transparent'
            }`} 
            to={'/all-appointments'}
          >
            <img className='w-4.5 h-4.5 md:w-5 md:h-5 opacity-90' src={assets.appointment_icon} alt="" />
            <span>Appointments</span>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-2 md:gap-3.5 py-2.5 px-3.5 md:py-3 md:px-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 font-bold' 
                : 'hover:bg-emerald-50 hover:text-teal-700 bg-emerald-50/40 md:bg-transparent'
            }`} 
            to={'/add-doctor'}
          >
            <img className='w-4.5 h-4.5 md:w-5 md:h-5 opacity-90' src={assets.add_icon} alt="" />
            <span>Add Doctor</span>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-2 md:gap-3.5 py-2.5 px-3.5 md:py-3 md:px-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 font-bold' 
                : 'hover:bg-emerald-50 hover:text-teal-700 bg-emerald-50/40 md:bg-transparent'
            }`} 
            to={'/doctor-list'}
          >
            <img className='w-4.5 h-4.5 md:w-5 md:h-5 opacity-90' src={assets.people_icon} alt="" />
            <span>Doctors List</span>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className='flex flex-row md:flex-col gap-1.5 md:gap-2 font-bold text-slate-600 text-xs sm:text-sm min-w-max md:min-w-0'>
          <NavLink 
            className={({ isActive }) => `flex items-center gap-2 md:gap-3.5 py-2.5 px-3.5 md:py-3 md:px-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 font-bold' 
                : 'hover:bg-emerald-50 hover:text-teal-700 bg-emerald-50/40 md:bg-transparent'
            }`} 
            to={'/doctor-dashboard'}
          >
            <img className='w-4.5 h-4.5 md:w-5 md:h-5 opacity-90' src={assets.home_icon} alt="" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-2 md:gap-3.5 py-2.5 px-3.5 md:py-3 md:px-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 font-bold' 
                : 'hover:bg-emerald-50 hover:text-teal-700 bg-emerald-50/40 md:bg-transparent'
            }`} 
            to={'/doctor-appointments'}
          >
            <img className='w-4.5 h-4.5 md:w-5 md:h-5 opacity-90' src={assets.appointment_icon} alt="" />
            <span>Appointments</span>
          </NavLink>

          <NavLink 
            className={({ isActive }) => `flex items-center gap-2 md:gap-3.5 py-2.5 px-3.5 md:py-3 md:px-4 rounded-xl md:rounded-2xl transition-all duration-300 ${
              isActive 
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 font-bold' 
                : 'hover:bg-emerald-50 hover:text-teal-700 bg-emerald-50/40 md:bg-transparent'
            }`} 
            to={'/doctor-profile'}
          >
            <img className='w-4.5 h-4.5 md:w-5 md:h-5 opacity-90' src={assets.people_icon} alt="" />
            <span>Doctor Profile</span>
          </NavLink>
        </ul>
      )}
    </aside>
  )
}

export default Sidebar