import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
    const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext)
    const { currencySymbol, slotDateFormat } = useContext(AppContext)

    useEffect(() => {
        if (dToken) {
            getDashData()
        }
    }, [dToken])

    return dashData && (
        <div className='w-full p-4 sm:p-8 text-left text-slate-800'>
            
            {/* Header */}
            <div className='flex flex-col items-start gap-1.5 mb-8'>
                <span className='px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-extrabold uppercase tracking-wider border border-emerald-200'>
                    Doctor Overview
                </span>
                <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1'>
                    Doctor <span className='font-serif-accent italic font-normal text-teal-700'>Dashboard</span>
                </h1>
                <p className='text-sm sm:text-base text-slate-600 font-medium'>
                    Real-time breakdown of earnings, active appointments, and patient consultations.
                </p>
            </div>

            {/* Metrics Row */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8'>
                
                {/* Earnings Card */}
                <div className='bg-white p-6 rounded-3xl border border-emerald-100/90 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 cursor-pointer'>
                    <div className='w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-3xl font-bold shadow-xs'>
                        💰
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-3xl sm:text-4xl font-extrabold text-slate-900'>{currencySymbol}{dashData.earnings}</span>
                        <span className='text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 mt-0.5'>Total Earnings</span>
                    </div>
                </div>

                {/* Appointments Card */}
                <div className='bg-white p-6 rounded-3xl border border-emerald-100/90 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 cursor-pointer'>
                    <div className='w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-3xl font-bold shadow-xs'>
                        📅
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-3xl sm:text-4xl font-extrabold text-slate-900'>{dashData.appointments}</span>
                        <span className='text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 mt-0.5'>Appointments</span>
                    </div>
                </div>

                {/* Patients Card */}
                <div className='bg-white p-6 rounded-3xl border border-emerald-100/90 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5 cursor-pointer'>
                    <div className='w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center text-3xl font-bold shadow-xs'>
                        👥
                    </div>
                    <div className='flex flex-col'>
                        <span className='text-3xl sm:text-4xl font-extrabold text-slate-900'>{dashData.patients}</span>
                        <span className='text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-400 mt-0.5'>Unique Patients</span>
                    </div>
                </div>

            </div>

            {/* Latest Appointments Card */}
            <div className='w-full bg-white rounded-3xl border border-emerald-100/90 shadow-sm overflow-hidden'>
                <div className='flex items-center gap-3 px-6 py-5 bg-gradient-to-r from-emerald-50 to-teal-50/40 border-b border-emerald-100'>
                    <span className='text-xl'>📋</span>
                    <h2 className='font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight'>Recent Patient Consultations</h2>
                </div>

                <div className='divide-y divide-slate-100'>
                    {dashData.latestAppointments.map((item, index) => (
                        <div className='flex items-center justify-between px-6 py-4.5 hover:bg-emerald-50/30 transition-colors' key={index}>
                            <div className='flex items-center gap-4'>
                                <img className='rounded-2xl w-12 h-12 object-cover border border-emerald-100 bg-emerald-50' src={item.userData?.image} alt="" />
                                <div className='flex flex-col text-sm sm:text-base'>
                                    <p className='text-slate-900 font-extrabold'>{item.userData?.name}</p>
                                    <p className='text-slate-500 font-medium text-xs sm:text-sm'>{slotDateFormat(item.slotDate)}</p>
                                </div>
                            </div>

                            <div>
                                {item.cancelled ? (
                                    <span className='px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-xs sm:text-sm font-extrabold border border-red-200'>Cancelled</span>
                                ) : item.isCompleted ? (
                                    <span className='px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-extrabold border border-emerald-200'>✓ Completed</span>
                                ) : (
                                    <div className='flex items-center gap-2.5'>
                                        <button 
                                            onClick={() => cancelAppointment(item._id)} 
                                            className='px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-xs sm:text-sm border border-slate-200 transition-colors'
                                        >
                                            Cancel ✕
                                        </button>
                                        <button 
                                            onClick={() => completeAppointment(item._id)} 
                                            className='px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs sm:text-sm shadow-xs transition-all'
                                        >
                                            Complete ✓
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default DoctorDashboard