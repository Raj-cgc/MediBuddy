import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currencySymbol } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  }, [dToken])

  return profileData && (
    <div className='w-full p-4 sm:p-8 text-left text-slate-800'>
      
      {/* Header */}
      <div className='flex flex-col items-start gap-1.5 mb-8'>
        <span className='px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-extrabold uppercase tracking-wider border border-emerald-200'>
          Doctor Settings
        </span>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1'>
          Doctor <span className='font-serif-accent italic font-normal text-teal-700'>Profile</span>
        </h1>
        <p className='text-sm sm:text-base text-slate-600 font-medium'>
          Manage your consultation fee, clinic address, and active availability status.
        </p>
      </div>

      {/* Card - Full Width / Left Aligned */}
      <div className='w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100/90 shadow-xl shadow-teal-900/5 flex flex-col md:flex-row gap-8 items-start'>
        
        <div className='w-full md:w-72 flex-shrink-0 bg-gradient-to-b from-teal-500/10 via-emerald-100/40 to-emerald-50 rounded-3xl p-3 border border-emerald-100'>
          <img className='w-full h-80 object-cover object-top rounded-2xl' src={profileData.image} alt={profileData.name} />
        </div>

        <div className='flex-1 flex flex-col gap-6 w-full'>
          <div>
            <div className='flex flex-wrap items-center gap-3'>
              <h2 className='text-3xl font-extrabold text-slate-900'>{profileData.name}</h2>
              <span className='px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold'>
                {profileData.experience}
              </span>
            </div>

            <div className='flex items-center gap-2 text-sm font-semibold text-slate-600 mt-2.5'>
              <span className='text-teal-700 bg-teal-50 px-3.5 py-1 rounded-full border border-teal-100 font-bold'>
                {profileData.speciality}
              </span>
              <span>•</span>
              <span className='text-slate-600 font-bold'>{profileData.degree}</span>
            </div>
          </div>

          <div className='pt-4 border-t border-slate-100'>
            <h4 className='text-xs font-extrabold uppercase tracking-wider text-slate-400'>About Doctor</h4>
            <p className='text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-1'>
              {profileData.about}
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm font-semibold pt-2'>
            <div className='p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1'>
              <span className='text-xs uppercase font-bold text-slate-400'>Consultation Fee</span>
              {isEdit ? (
                <input 
                  type="number" 
                  className='bg-white border border-slate-200 rounded-lg p-2 font-bold text-teal-800 text-base'
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} 
                  value={profileData.fees} 
                />
              ) : (
                <span className='font-extrabold text-teal-800 text-lg sm:text-xl'>{currencySymbol}{profileData.fees}</span>
              )}
            </div>

            <div className='p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1'>
              <span className='text-xs uppercase font-bold text-slate-400'>Availability Status</span>
              <div className='flex items-center gap-2.5 mt-1.5'>
                <input 
                  onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} 
                  checked={profileData.available} 
                  type="checkbox" 
                  disabled={!isEdit}
                  className='w-5 h-5 text-teal-600 rounded focus:ring-teal-500 cursor-pointer' 
                />
                <span className={`font-bold text-sm sm:text-base ${profileData.available ? 'text-emerald-700' : 'text-slate-500'}`}>
                  {profileData.available ? 'Available for Appointments' : 'Currently Unavailable'}
                </span>
              </div>
            </div>

            <div className='sm:col-span-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1'>
              <span className='text-xs uppercase font-bold text-slate-400'>Clinic Address</span>
              {isEdit ? (
                <div className='flex flex-col gap-2 mt-1'>
                  <input className='bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900 text-sm' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address?.line1 || ''} type="text" />
                  <input className='bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-900 text-sm' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address?.line2 || ''} type="text" />
                </div>
              ) : (
                <span className='font-bold text-slate-900 text-sm sm:text-base'>
                  {profileData.address?.line1}, {profileData.address?.line2}
                </span>
              )}
            </div>
          </div>

          <div className='pt-4 border-t border-slate-100 flex justify-end'>
            {isEdit ? (
              <button 
                onClick={updateProfile} 
                className='bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-extrabold px-8 py-3.5 rounded-full text-sm shadow-md shadow-teal-600/30 transition-all cursor-pointer'
              >
                Save Profile
              </button>
            ) : (
              <button 
                onClick={() => setIsEdit(true)} 
                className='bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-800 font-extrabold px-8 py-3.5 rounded-full text-sm transition-all cursor-pointer'
              >
                Edit Details
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  )
}

export default DoctorProfile