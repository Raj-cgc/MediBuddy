import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <section className='flex flex-col items-center gap-5 py-16 px-4 my-6 text-slate-800' id='speciality'>
            
            {/* Header Badge & Title */}
            <div className='flex flex-col items-center gap-2 text-center max-w-xl'>
                <span className='px-3.5 py-1 rounded-full bg-teal-100/70 text-teal-800 text-xs font-extrabold uppercase tracking-wider border border-teal-200/60'>
                    Medical Specialties
                </span>
                <h2 className='text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight'>
                    Find by <span className='font-serif-accent italic font-normal text-teal-700'>Speciality</span>
                </h2>
                <p className='text-slate-500 text-xs sm:text-sm font-normal leading-relaxed mt-1'>
                    Simply browse through our extensive list of trusted doctors, schedule your appointments hassle-free.
                </p>
            </div>

            {/* Specialty Cards Grid */}
            <div className='flex sm:justify-center items-stretch gap-4 sm:gap-6 pt-6 w-full overflow-x-auto pb-4 px-2 snap-x'>
                {specialityData.map((item, index) => (
                    <Link 
                        onClick={() => scrollTo(0, 0)} 
                        className='flex flex-col items-center justify-between p-5 rounded-3xl bg-gradient-to-b from-white to-emerald-50/50 hover:to-emerald-100/60 border border-emerald-100/80 shadow-sm hover:shadow-md hover:shadow-teal-600/10 hover:-translate-y-2 transition-all duration-300 flex-shrink-0 w-36 sm:w-44 group snap-center cursor-pointer' 
                        key={index} 
                        to={`/doctors/${item.speciality}`}
                    >
                        <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-600/10 p-3 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xs group-hover:bg-teal-600/20'>
                            <img className='w-full h-full object-contain' src={item.image} alt={item.speciality} />
                        </div>
                        <p className='text-xs sm:text-sm font-bold text-slate-700 group-hover:text-teal-700 text-center mt-3 transition-colors line-clamp-1'>
                            {item.speciality}
                        </p>
                        <span className='text-[11px] text-teal-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex items-center gap-0.5'>
                            Browse ↗
                        </span>
                    </Link>
                ))}
            </div>

        </section>
    )
}

export default SpecialityMenu