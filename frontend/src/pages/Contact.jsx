import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='py-6 px-2 sm:px-4 text-slate-800 max-w-5xl mx-auto'>
      
      {/* Header */}
      <div className='flex flex-col items-center text-center gap-2 mb-12'>
        <span className='px-3.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-extrabold uppercase tracking-wider border border-emerald-200/60'>
          Get In Touch
        </span>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight'>
          Contact <span className='font-serif-accent italic font-normal text-teal-700'>MediBuddy</span>
        </h1>
        <p className='text-slate-500 text-xs sm:text-sm font-normal max-w-md'>
          We are here to assist you with inquiries, partnerships, or support.
        </p>
      </div>

      {/* Main Grid Card */}
      <div className='bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100/80 shadow-xl shadow-teal-900/5 flex flex-col md:flex-row items-center gap-12'>
        <img className='w-full md:max-w-sm rounded-2xl object-cover shadow-sm' src={assets.contact_image} alt="Contact MediBuddy" />
        
        <div className='flex flex-col gap-6 w-full text-left'>
          
          {/* Office Address */}
          <div className='flex flex-col gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100'>
            <h3 className='text-sm font-extrabold uppercase tracking-wider text-teal-800 flex items-center gap-2'>
              <span>📍</span> Our Headquarters
            </h3>
            <p className='text-xs sm:text-sm font-medium text-slate-700 leading-relaxed'>
              17th Cross, Richmond Circle, Ring Road <br />
              London, United Kingdom & New Delhi, India
            </p>
          </div>

          {/* Contact Details */}
          <div className='flex flex-col gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100'>
            <h3 className='text-sm font-extrabold uppercase tracking-wider text-teal-800 flex items-center gap-2'>
              <span>📞</span> Direct Channels
            </h3>
            <p className='text-xs sm:text-sm font-medium text-slate-700'>
              Phone: <strong className='text-slate-900'>+91-7004155718</strong>
            </p>
            <p className='text-xs sm:text-sm font-medium text-slate-700'>
              Email: <strong className='text-teal-700'>rajkumarbxr78@gmail.com</strong>
            </p>
          </div>

          {/* Careers */}
          <div className='flex flex-col gap-2 pt-2'>
            <h3 className='text-base font-extrabold text-slate-900'>Careers at MediBuddy</h3>
            <p className='text-xs text-slate-500 font-normal'>
              Learn more about our mission, open roles, and clinical technology teams.
            </p>
            <button className='self-start mt-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-extrabold text-xs shadow-md shadow-teal-600/30 hover:shadow-lg transition-all cursor-pointer'>
              Explore Openings ↗
            </button>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Contact