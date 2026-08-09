import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ speciality, docId }) => {
    const navigate = useNavigate();
    const { doctors, currencySymbol } = useContext(AppContext);
    const [relDoc, setRelDocs] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDocs(doctorsData);
        }
    }, [doctors, speciality, docId])

    return (
        <section className='flex flex-col items-center gap-6 my-16 text-slate-800'>
            
            {/* Header */}
            <div className='flex flex-col items-center gap-2 text-center max-w-xl'>
                <span className='px-3.5 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-extrabold uppercase tracking-wider border border-emerald-200/60'>
                    Similar Practitioners
                </span>
                <h2 className='text-3xl font-extrabold text-slate-900 tracking-tight'>
                    Related <span className='font-serif-accent italic font-normal text-teal-700'>Doctors</span>
                </h2>
                <p className='text-slate-500 text-xs sm:text-sm font-normal'>
                    Explore other trusted specialists in {speciality}.
                </p>
            </div>

            {/* Grid */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-4'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div 
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                        className='group bg-white rounded-3xl overflow-hidden border border-emerald-100/80 shadow-xs hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between' 
                        key={index}
                    >
                        <div className='relative w-full aspect-4/3 bg-gradient-to-b from-teal-500/10 via-emerald-100/30 to-emerald-50 overflow-hidden flex items-end justify-center'>
                            <img className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
                            
                            <div className='absolute top-3 left-3 glass-pill px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs'>
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                                <span className={`text-[11px] font-extrabold ${item.available ? 'text-emerald-700' : 'text-slate-500'}`}>
                                    {item.available ? 'Available' : 'Unavailable'}
                                </span>
                            </div>
                        </div>

                        <div className='p-5 flex flex-col gap-2'>
                            <span className='self-start px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-[11px] font-bold border border-teal-100'>
                                {item.speciality}
                            </span>
                            <h3 className='text-base font-bold text-slate-800 group-hover:text-teal-700 transition-colors line-clamp-1'>
                                {item.name}
                            </h3>
                            <p className='text-xs text-slate-500 line-clamp-1'>
                                {item.degree} • {item.experience} Experience
                            </p>
                            
                            <div className='flex items-center justify-between pt-3 mt-1 border-t border-slate-100'>
                                <div className='flex flex-col'>
                                    <span className='text-[10px] uppercase font-bold text-slate-400'>Fee</span>
                                    <span className='text-sm font-extrabold text-teal-800'>{currencySymbol}{item.fees}</span>
                                </div>
                                <span className='w-8 h-8 rounded-full bg-emerald-50 group-hover:bg-teal-600 group-hover:text-white text-teal-700 flex items-center justify-center text-sm font-bold transition-all shadow-xs'>
                                    ↗
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button 
                onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
                className='inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-teal-800 font-extrabold text-xs px-8 py-3 rounded-full border border-emerald-200 transition-all mt-4 cursor-pointer'
            >
                <span>View More Specialists</span>
                <span>↗</span>
            </button>

        </section>
    )
}

export default RelatedDoctors