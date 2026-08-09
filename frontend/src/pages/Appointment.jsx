import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    if (!docInfo) return;
    setDocSlots([])
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked && docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => ([...prev, timeSlots]));
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    if (!slotTime) {
      return toast.warn('Please select a time slot')
    }

    try {
      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  return docInfo && (
    <div className='py-6 px-2 sm:px-4 text-slate-800'>
      
      {/* Doctor Card Hero */}
      <div className='flex flex-col lg:flex-row gap-8 items-start'>
        
        {/* Doctor Photo Card */}
        <div className='w-full lg:w-80 flex-shrink-0 bg-gradient-to-b from-teal-500/10 via-emerald-100/40 to-emerald-50 rounded-3xl p-4 border border-emerald-100/80 shadow-md relative overflow-hidden'>
          <img className='w-full h-80 object-cover object-top rounded-2xl' src={docInfo.image} alt={docInfo.name} />
          
          <div className='mt-4 flex items-center justify-start px-2'>
            <span className='px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold'>
              {docInfo.experience} Experience
            </span>
          </div>
        </div>

        {/* Doctor Details Info */}
        <div className='flex-1 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-sm flex flex-col justify-between gap-6'>
          <div>
            <div className='flex flex-wrap items-center gap-3'>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-slate-900'>
                {docInfo.name}
              </h1>
              <img className='w-5 h-5' src={assets.verified_icon} alt="Verified Doctor" />
            </div>

            <div className='flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 mt-2'>
              <span className='text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-100'>
                {docInfo.speciality}
              </span>
              <span>•</span>
              <span className='text-slate-500'>{docInfo.degree}</span>
            </div>

            {/* About Section */}
            <div className='mt-6 pt-6 border-t border-slate-100'>
              <h3 className='text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5'>
                <span>About Doctor</span>
                <img className='w-3.5' src={assets.info_icon} alt="" />
              </h3>
              <p className='text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-2 max-w-2xl'>
                {docInfo.about}
              </p>
            </div>
          </div>

          <div className='flex items-center justify-between pt-6 border-t border-slate-100'>
            <div className='flex flex-col'>
              <span className='text-xs font-semibold text-slate-400'>Appointment Fee</span>
              <span className='text-2xl font-extrabold text-teal-800'>{currencySymbol}{docInfo.fees}</span>
            </div>
            <span className='text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200/60'>
              ✓ Verified Practitioner
            </span>
          </div>
        </div>

      </div>

      {/* Booking Slot Selection */}
      <div className='mt-12 bg-gradient-to-br from-[#eaf6f0]/60 to-[#f4faf7] p-6 sm:p-10 rounded-3xl border border-emerald-100 shadow-sm'>
        <h3 className='text-xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2'>
          <span>📅</span> Select Booking Slot
        </h3>
        <p className='text-xs text-slate-500 font-normal mt-1'>Choose your preferred day and available time slot below.</p>

        {/* Day Pills */}
        <div className='flex gap-3 items-center w-full overflow-x-auto pt-6 pb-2'>
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div 
              onClick={() => setSlotIndex(index)} 
              className={`text-center py-4 min-w-16 sm:min-w-20 rounded-2xl cursor-pointer transition-all duration-300 flex-shrink-0 border font-bold ${
                slotIndex === index 
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 border-teal-600 translate-y-[-2px]' 
                  : 'bg-white text-slate-700 hover:bg-emerald-100/50 border-emerald-100'
              }`} 
              key={index}
            >
              <p className='text-xs font-semibold uppercase opacity-80'>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p className='text-lg font-extrabold mt-0.5'>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slot Pills */}
        <div className='flex items-center gap-3 w-full overflow-x-auto pt-6 pb-2'>
          {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].map((item, index) => (
            <button 
              onClick={() => setSlotTime(item.time)} 
              className={`text-xs font-extrabold flex-shrink-0 px-5 py-3 rounded-xl transition-all duration-300 cursor-pointer border ${
                item.time === slotTime 
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 border-teal-600' 
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border-emerald-200/80'
              }`} 
              key={index}
            >
              {item.time.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Action Submit */}
        <button 
          onClick={bookAppointment} 
          className='inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-extrabold text-sm px-10 py-4 rounded-full shadow-lg shadow-teal-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 mt-8 cursor-pointer'
        >
          <span>Book Appointment</span>
          <span>↗</span>
        </button>
      </div>

      {/* Related Doctors */}
      <div className='mt-16'>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>

    </div>
  )
}

export default Appointment