import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currencySymbol } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full p-4 sm:p-8 text-left text-slate-800'>
      
      {/* Header - Left Aligned */}
      <div className='flex flex-col items-start gap-1.5 mb-8'>
        <span className='px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-extrabold uppercase tracking-wider border border-emerald-200'>
          Central Register
        </span>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1'>
          All Patient <span className='font-serif-accent italic font-normal text-teal-700'>Appointments</span>
        </h1>
        <p className='text-sm sm:text-base text-slate-600 font-medium'>
          Overview of all patient bookings, consultation fees, and current statuses.
        </p>
      </div>

      {/* Table Card - Left Aligned Full Width */}
      <div className='w-full bg-white rounded-3xl border border-emerald-100/90 shadow-sm overflow-hidden'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2.5fr_1fr_3.5fr_2.5fr_1.5fr_1.5fr] py-4 px-6 bg-gradient-to-r from-emerald-50 to-teal-50/50 border-b border-emerald-100 text-sm font-extrabold tracking-wider text-slate-700 uppercase'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        <div className='divide-y divide-slate-100 text-sm sm:text-base font-medium'>
          {appointments.map((item, index) => {
            const ageVal = calculateAge(item.userData?.dob);
            return (
              <div className='flex flex-wrap justify-between sm:grid sm:grid-cols-[0.5fr_2.5fr_1fr_3.5fr_2.5fr_1.5fr_1.5fr] items-center p-4 sm:p-6 hover:bg-emerald-50/30 transition-colors gap-3' key={index}>
                <p className='max-sm:hidden text-slate-400 font-extrabold text-base'>{index + 1}</p>
                
                <div className='flex items-center gap-3.5'>
                  <img className='w-11 h-11 rounded-full object-cover border-2 border-emerald-100 bg-emerald-50' src={item.userData?.image} alt="" />
                  <p className='font-extrabold text-slate-900 text-base sm:text-lg'>{item.userData?.name || 'Patient'}</p>
                </div>

                <p className='max-sm:hidden text-slate-700 font-bold text-sm sm:text-base'>
                  {ageVal === 'N/A' ? 'N/A' : `${ageVal} yrs`}
                </p>
                
                <p className='text-slate-800 font-bold text-sm sm:text-base'>
                  {slotDateFormat(item.slotDate)} <span className='text-teal-700 font-extrabold'>| {item.slotTime}</span>
                </p>

                <div className='flex items-center gap-3.5'>
                  <img className='w-11 h-11 rounded-full object-cover border-2 border-emerald-100 bg-teal-50' src={item.docData?.image} alt="" />
                  <p className='font-extrabold text-slate-900 text-base sm:text-lg'>{item.docData?.name}</p>
                </div>

                <p className='font-extrabold text-teal-800 text-base sm:text-lg'>{currencySymbol}{item.amount}</p>

                <div>
                  {item.cancelled ? (
                    <span className='px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs sm:text-sm font-extrabold border border-red-200 inline-block'>
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className='px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-extrabold border border-emerald-200 inline-block'>
                      Completed
                    </span>
                  ) : (
                    <button 
                      onClick={() => cancelAppointment(item._id)} 
                      className='px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-xs sm:text-sm border border-slate-200 transition-colors'
                    >
                      Cancel ✕
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

export default AllAppointments