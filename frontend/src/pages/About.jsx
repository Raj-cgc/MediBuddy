import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='py-6 px-2 sm:px-4 text-slate-800 max-w-6xl mx-auto'>
      
      {/* Header */}
      <div className='flex flex-col items-center text-center gap-2 mb-12'>
        <span className='px-3.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-extrabold uppercase tracking-wider border border-emerald-200/60'>
          About MediBuddy
        </span>
        <h1 className='text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight'>
          Transforming Healthcare <span className='font-serif-accent italic font-normal text-teal-700'>Delivery</span>
        </h1>
        <p className='text-slate-500 text-xs sm:text-sm font-normal max-w-xl mt-1'>
          We bridge the gap between world-class medical specialists and patients with seamless online scheduling.
        </p>
      </div>

      {/* Main Story Grid */}
      <div className='my-10 flex flex-col md:flex-row items-center gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-emerald-100/80 shadow-lg shadow-teal-900/5'>
        <img className='w-full md:max-w-md rounded-2xl object-cover shadow-sm' src={assets.about_image} alt="About MediBuddy" />
        
        <div className='flex flex-col gap-5 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed'>
          <h3 className='text-xl font-extrabold text-slate-900'>Your Health, Our Priority</h3>
          <p>
            MediBuddy is built on the foundation of accessibility, convenience, and healthcare excellence. We empower patients to discover top-rated medical practitioners, review credentials, and secure instant appointments without long wait times.
          </p>
          <p>
            Whether you need a routine check-up, specialized dermatological advice, or neurological consultation, MediBuddy ensures direct access to certified experts.
          </p>

          <div className='p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-slate-800 mt-2'>
            <h4 className='font-extrabold text-teal-800 uppercase tracking-wider text-xs mb-1'>Our Vision</h4>
            <p className='text-xs text-slate-600 font-medium leading-relaxed'>
              To create a connected healthcare ecosystem where every individual receives prompt, personal, and premium medical care anytime, anywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='mt-20 flex flex-col items-center gap-8'>
        <div className='flex flex-col items-center text-center gap-2'>
          <span className='px-3.5 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-extrabold uppercase tracking-wider border border-teal-200/60'>
            Key Pillars
          </span>
          <h2 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
            Why Choose <span className='font-serif-accent italic font-normal text-teal-700'>MediBuddy</span>
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
          <div className='bg-white p-8 rounded-3xl border border-emerald-100/80 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-2 transition-all duration-300 flex flex-col gap-3 group cursor-pointer'>
            <span className='w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-xl font-bold group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-xs'>
              ⚡
            </span>
            <h3 className='text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors'>Efficiency</h3>
            <p className='text-xs text-slate-500 font-normal leading-relaxed'>
              Streamlined appointment booking designed to fit into your busy lifestyle without hassle.
            </p>
          </div>

          <div className='bg-white p-8 rounded-3xl border border-emerald-100/80 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-2 transition-all duration-300 flex flex-col gap-3 group cursor-pointer'>
            <span className='w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-xl font-bold group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-xs'>
              🌟
            </span>
            <h3 className='text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors'>Convenience</h3>
            <p className='text-xs text-slate-500 font-normal leading-relaxed'>
              Access a comprehensive network of trusted healthcare professionals right from your device.
            </p>
          </div>

          <div className='bg-white p-8 rounded-3xl border border-emerald-100/80 shadow-sm hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-2 transition-all duration-300 flex flex-col gap-3 group cursor-pointer'>
            <span className='w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-xl font-bold group-hover:bg-teal-600 group-hover:text-white transition-colors shadow-xs'>
              🎯
            </span>
            <h3 className='text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors'>Personalization</h3>
            <p className='text-xs text-slate-500 font-normal leading-relaxed'>
              Tailored health recommendations and appointment reminders customized to your care plan.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default About