import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)

      image && formData.append('image', image)

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }

  return userData && (
    <div className='max-w-2xl py-6 px-2 sm:px-4 text-slate-800'>
      
      <div className='bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100 shadow-xl shadow-teal-900/5 flex flex-col gap-6'>
        
        {/* Profile Avatar & Name Header */}
        <div className='flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100'>
          {isEdit ? (
            <label htmlFor="image" className='relative group cursor-pointer'>
              <img className='w-28 h-28 rounded-full object-cover border-4 border-teal-500/30 shadow-md opacity-80 group-hover:opacity-100 transition-opacity' src={image ? URL.createObjectURL(image) : userData.image} alt="Profile" />
              <div className='absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity'>
                Upload
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
            </label>
          ) : (
            <img className='w-28 h-28 rounded-full object-cover border-4 border-teal-500/30 shadow-md' src={userData.image} alt="Profile" />
          )}

          <div className='flex flex-col text-center sm:text-left gap-1'>
            <span className='px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider self-center sm:self-start border border-emerald-200/60'>
              Patient Profile
            </span>
            {isEdit ? (
              <input className='border border-slate-200 rounded-xl px-3 py-1.5 text-2xl font-bold text-slate-900 mt-1 outline-none focus:border-teal-600' type="text" value={userData.name} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
            ) : (
              <h1 className='font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1'>{userData.name}</h1>
            )}
            <p className='text-xs text-slate-500 font-medium'>{userData.email}</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className='flex flex-col gap-4'>
          <h3 className='text-xs font-extrabold uppercase tracking-wider text-slate-400'>Contact Details</h3>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-medium'>
            <div className='p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1'>
              <span className='text-[10px] uppercase font-bold text-slate-400'>Phone Number</span>
              {isEdit ? (
                <input className='bg-white border border-slate-200 rounded-lg p-1.5 font-bold text-slate-800' type="text" value={userData.phone} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              ) : (
                <span className='font-bold text-slate-800'>{userData.phone || 'Not provided'}</span>
              )}
            </div>

            <div className='p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1'>
              <span className='text-[10px] uppercase font-bold text-slate-400'>Email Address</span>
              <span className='font-bold text-slate-800 truncate'>{userData.email}</span>
            </div>

            <div className='sm:col-span-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1'>
              <span className='text-[10px] uppercase font-bold text-slate-400'>Address</span>
              {isEdit ? (
                <div className='flex flex-col gap-2 mt-1'>
                  <input className='bg-white border border-slate-200 rounded-lg p-1.5 font-bold text-slate-800' onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address?.line1 || ''} type="text" placeholder="Line 1" />
                  <input className='bg-white border border-slate-200 rounded-lg p-1.5 font-bold text-slate-800' onChange={e => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address?.line2 || ''} type="text" placeholder="Line 2" />
                </div>
              ) : (
                <span className='font-bold text-slate-800'>
                  {userData.address?.line1 || 'Not set'}, {userData.address?.line2 || ''}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className='flex flex-col gap-4 pt-2'>
          <h3 className='text-xs font-extrabold uppercase tracking-wider text-slate-400'>Basic Details</h3>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-medium'>
            <div className='p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1'>
              <span className='text-[10px] uppercase font-bold text-slate-400'>Gender</span>
              {isEdit ? (
                <select className='bg-white border border-slate-200 rounded-lg p-1.5 font-bold text-slate-800' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <span className='font-bold text-slate-800'>{userData.gender || 'Not set'}</span>
              )}
            </div>

            <div className='p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1'>
              <span className='text-[10px] uppercase font-bold text-slate-400'>Date of Birth</span>
              {isEdit ? (
                <input className='bg-white border border-slate-200 rounded-lg p-1.5 font-bold text-slate-800' type="date" onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
              ) : (
                <span className='font-bold text-slate-800'>{userData.dob || 'Not set'}</span>
              )}
            </div>
          </div>
        </div>

        {/* Edit / Save Button */}
        <div className='pt-4 border-t border-slate-100 flex justify-end'>
          {isEdit ? (
            <button 
              className='bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-extrabold px-8 py-3 rounded-full text-xs shadow-md shadow-teal-600/30 hover:shadow-lg transition-all cursor-pointer' 
              onClick={updateUserProfileData}
            >
              Save Information
            </button>
          ) : (
            <button 
              className='bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-800 font-extrabold px-8 py-3 rounded-full text-xs transition-all cursor-pointer' 
              onClick={() => setIsEdit(true)}
            >
              Edit Profile
            </button>
          )}
        </div>

      </div>

    </div>
  )
}

export default MyProfile