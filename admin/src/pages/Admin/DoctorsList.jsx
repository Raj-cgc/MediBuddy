import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  return (
    <div className='w-full p-4 sm:p-8 text-left text-slate-800'>
      
      {/* Header */}
      <div className='flex flex-col items-start gap-1.5 mb-8'>
        <span className='px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-extrabold uppercase tracking-wider border border-emerald-200'>
          Practitioner Roster
        </span>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1'>
          Registered <span className='font-serif-accent italic font-normal text-teal-700'>Doctors</span>
        </h1>
        <p className='text-sm sm:text-base text-slate-600 font-medium'>
          Manage doctor availability and profiles across the platform.
        </p>
      </div>

      {/* Grid */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {doctors.map((item, index) => (
          <div 
            className='group bg-white rounded-3xl overflow-hidden border border-emerald-100/90 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 flex flex-col justify-between' 
            key={index}
          >
            <div className='relative w-full aspect-4/3 bg-gradient-to-b from-teal-500/10 via-emerald-100/30 to-emerald-50 overflow-hidden flex items-end justify-center'>
              <img className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
            </div>

            <div className='p-5 flex flex-col gap-2'>
              <span className='self-start px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-extrabold border border-teal-100'>
                {item.speciality}
              </span>
              <h3 className='text-lg font-extrabold text-slate-900 line-clamp-1 mt-1'>{item.name}</h3>
              
              <div className='mt-2 pt-3 border-t border-slate-100 flex items-center justify-between'>
                <span className='text-xs sm:text-sm font-extrabold text-slate-600'>Available</span>
                <label className='relative inline-flex items-center cursor-pointer'>
                  <input 
                    onChange={() => changeAvailability(item._id)} 
                    type="checkbox" 
                    checked={item.available} 
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5.5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default DoctorsList