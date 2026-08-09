import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpeciality] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext);

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (!docImg) {
                return toast.error('Image Not Selected');
            }

            const formData = new FormData()

            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

            const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='w-full p-4 sm:p-8 text-left text-slate-800'>
            
            {/* Header */}
            <div className='flex flex-col items-start gap-1.5 mb-8'>
                <span className='px-3.5 py-1 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-extrabold uppercase tracking-wider border border-emerald-200'>
                    Onboarding Portal
                </span>
                <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1'>
                    Add New <span className='font-serif-accent italic font-normal text-teal-700'>Practitioner</span>
                </h1>
                <p className='text-sm sm:text-base text-slate-600 font-medium'>
                    Register a new verified doctor into the MediBuddy database.
                </p>
            </div>

            {/* Form Card - Left Aligned Full Width */}
            <div className='w-full max-w-5xl bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100/90 shadow-xl shadow-teal-900/5 flex flex-col gap-8'>
                
                {/* Upload Image */}
                <div className='flex items-center gap-5 p-4 sm:p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 self-start'>
                    <label htmlFor="doc-img" className='cursor-pointer relative group'>
                        <img className='w-22 h-22 rounded-2xl object-cover border-2 border-teal-500/30 shadow-xs' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Doctor Upload" />
                        <div className='absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity'>
                            Upload
                        </div>
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
                    <div className='flex flex-col text-xs sm:text-sm'>
                        <span className='font-extrabold text-slate-900 text-sm sm:text-base'>Doctor Profile Picture</span>
                        <span className='text-slate-500 font-medium'>PNG, JPG or WEBP (Square ratio recommended)</span>
                    </div>
                </div>

                {/* Grid Inputs */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm font-semibold'>
                    
                    <div className='flex flex-col gap-2'>
                        <label className='uppercase tracking-wider text-slate-600 font-extrabold'>Doctor Full Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name} className='border border-slate-200 focus:border-teal-600 rounded-2xl p-3.5 text-sm sm:text-base font-medium text-slate-900 outline-none' type="text" placeholder='Dr. Richard James' required />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='uppercase tracking-wider text-slate-600 font-extrabold'>Speciality</label>
                        <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border border-slate-200 focus:border-teal-600 rounded-2xl p-3.5 text-sm sm:text-base font-medium text-slate-900 outline-none'>
                            <option value="General physician">General physician</option>
                            <option value="Gynecologist">Gynecologist</option>
                            <option value="Dermatologist">Dermatologist</option>
                            <option value="Pediatricians">Pediatricians</option>
                            <option value="Neurologist">Neurologist</option>
                            <option value="Gastroenterologist">Gastroenterologist</option>
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='uppercase tracking-wider text-slate-600 font-extrabold'>Doctor Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-slate-200 focus:border-teal-600 rounded-2xl p-3.5 text-sm sm:text-base font-medium text-slate-900 outline-none' type="email" placeholder='doctor@medibuddy.com' required />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='uppercase tracking-wider text-slate-600 font-extrabold'>Education / Degree</label>
                        <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border border-slate-200 focus:border-teal-600 rounded-2xl p-3.5 text-sm sm:text-base font-medium text-slate-900 outline-none' type="text" placeholder='MBBS, MD' required />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='uppercase tracking-wider text-slate-600 font-extrabold'>Account Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-slate-200 focus:border-teal-600 rounded-2xl p-3.5 text-sm sm:text-base font-medium text-slate-900 outline-none' type="password" placeholder='••••••••' required />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='uppercase tracking-wider text-slate-600 font-extrabold'>Years of Experience</label>
                        <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border border-slate-200 focus:border-teal-600 rounded-2xl p-3.5 text-sm sm:text-base font-medium text-slate-900 outline-none'>
                            {[...Array(10)].map((_, i) => (
                                <option key={i} value={`${i + 1} Year`}>{i + 1} Year{i > 0 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='uppercase tracking-wider text-slate-600 font-extrabold'>Consultation Fee (₹)</label>
                        <input onChange={(e) => setFees(e.target.value)} value={fees} className='border border-slate-200 focus:border-teal-600 rounded-2xl p-3.5 text-sm sm:text-base font-medium text-slate-900 outline-none' type="number" placeholder='50' required />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label className='uppercase tracking-wider text-slate-600 font-extrabold'>Clinic Address</label>
                        <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border border-slate-200 focus:border-teal-600 rounded-2xl p-3.5 text-sm sm:text-base font-medium text-slate-900 outline-none mb-1' type="text" placeholder='17th Cross, Richmond' required />
                        <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border border-slate-200 focus:border-teal-600 rounded-2xl p-3.5 text-sm sm:text-base font-medium text-slate-900 outline-none' type="text" placeholder='Circle, Ring Road, London' required />
                    </div>

                </div>

                {/* About Doctor */}
                <div className='flex flex-col gap-2 text-xs sm:text-sm font-semibold'>
                    <label className='uppercase tracking-wider text-slate-600 font-extrabold'>About Doctor & Biography</label>
                    <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='border border-slate-200 focus:border-teal-600 rounded-2xl p-4 text-sm sm:text-base font-medium text-slate-900 outline-none' placeholder='Describe doctor skills, commitment, and care approach...' rows={4} required />
                </div>

                {/* Action */}
                <button type='submit' className='self-start bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-extrabold px-10 py-4 rounded-full text-sm shadow-lg shadow-teal-600/30 hover:shadow-xl transition-all cursor-pointer'>
                    Register Doctor
                </button>

            </div>
        </form>
    )
}

export default AddDoctor