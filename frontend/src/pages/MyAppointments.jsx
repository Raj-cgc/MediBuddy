import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])
  const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const navigate = useNavigate()

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })

      if (data.success) {
        setAppointments(data.appointments.reverse())
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verifyRazorpay', response, { headers: { token } })
          if (data.success) {
            getUserAppointments()
            navigate('/my-appointments')
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div className='py-6 px-2 sm:px-4 text-slate-800 max-w-5xl mx-auto'>
      
      {/* Header */}
      <div className='flex flex-col gap-1 mb-8'>
        <span className='self-start px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider border border-emerald-200/60'>
          Patient Dashboard
        </span>
        <h1 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
          My <span className='font-serif-accent italic font-normal text-teal-700'>Appointments</span>
        </h1>
        <p className='text-xs text-slate-500 font-normal'>
          Manage your scheduled consultations and payment status.
        </p>
      </div>

      {/* Appointments List */}
      <div className='flex flex-col gap-4'>
        {appointments.length > 0 ? (
          appointments.map((item, index) => (
            <div 
              className='bg-white rounded-3xl p-5 border border-emerald-100/80 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-6' 
              key={index}
            >
              <div className='flex items-center gap-5 w-full sm:w-auto'>
                <img className='w-24 h-24 rounded-2xl object-cover border border-emerald-100 bg-emerald-50/50' src={item.docData.image} alt={item.docData.name} />
                
                <div className='flex flex-col gap-1 text-xs sm:text-sm'>
                  <h3 className='text-base font-extrabold text-slate-900'>{item.docData.name}</h3>
                  <span className='self-start px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[11px] font-bold border border-teal-100'>
                    {item.docData.speciality}
                  </span>
                  
                  <div className='flex items-center gap-1.5 text-slate-500 font-medium mt-1 text-xs'>
                    <span>📅</span>
                    <span className='font-bold text-slate-700'>{slotDateFormat(item.slotDate)}</span>
                    <span>|</span>
                    <span className='font-bold text-teal-700'>{item.slotTime}</span>
                  </div>

                  <p className='text-[11px] text-slate-400 font-normal line-clamp-1'>
                    {item.docData.address.line1}, {item.docData.address.line2}
                  </p>
                </div>
              </div>

              {/* Status & Action Buttons */}
              <div className='flex flex-wrap sm:flex-col gap-2 w-full sm:w-48 justify-end'>
                {!item.cancelled && item.payment && !item.isCompleted && (
                  <span className='w-full py-2.5 px-4 text-center rounded-xl bg-teal-50 text-teal-700 font-extrabold text-xs border border-teal-200'>
                    ✓ Paid
                  </span>
                )}
                
                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button 
                    onClick={() => appointmentRazorpay(item._id)} 
                    className='w-full py-2.5 px-4 text-center rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-extrabold text-xs shadow-md shadow-teal-600/20 transition-all cursor-pointer'
                  >
                    Pay Online
                  </button>
                )}
                
                {!item.cancelled && !item.isCompleted && (
                  <button 
                    onClick={() => cancelAppointment(item._id)} 
                    className='w-full py-2.5 px-4 text-center rounded-xl bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 font-bold text-xs border border-slate-200 hover:border-red-200 transition-all cursor-pointer'
                  >
                    Cancel Appointment
                  </button>
                )}
                
                {item.cancelled && !item.isCompleted && (
                  <span className='w-full py-2.5 px-4 text-center rounded-xl bg-red-50 text-red-600 font-bold text-xs border border-red-200'>
                    Cancelled
                  </span>
                )}
                
                {item.isCompleted && (
                  <span className='w-full py-2.5 px-4 text-center rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-xs border border-emerald-200'>
                    ✓ Completed
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className='py-16 flex flex-col items-center justify-center text-center gap-3 bg-emerald-50/50 rounded-3xl border border-dashed border-emerald-200'>
            <span className='text-4xl'>📅</span>
            <h3 className='text-lg font-bold text-slate-700'>No Appointments Yet</h3>
            <p className='text-xs text-slate-500'>Browse doctors and book your consultation in seconds.</p>
            <button 
              onClick={() => navigate('/doctors')} 
              className='mt-2 px-6 py-2.5 rounded-full bg-teal-600 text-white font-bold text-xs shadow-md shadow-teal-600/30'
            >
              Book First Appointment
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

export default MyAppointments