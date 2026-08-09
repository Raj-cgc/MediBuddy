import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const { doctors, currencySymbol } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors);
    }
  }

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality])

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ];

  return (
    <div className='py-6 px-2 sm:px-4 text-slate-800'>
      
      {/* Header */}
      <div className='flex flex-col gap-2 mb-8'>
        <span className='self-start px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-extrabold uppercase tracking-wider border border-emerald-200/60'>
          Medical Specialists
        </span>
        <h1 className='text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight'>
          Find & Book <span className='font-serif-accent italic font-normal text-teal-700'>Specialists</span>
        </h1>
        <p className='text-slate-500 text-xs sm:text-sm font-normal'>
          Filter through our network of verified medical experts by specialty.
        </p>
      </div>

      <div className='flex flex-col md:flex-row items-start gap-8'>
        
        {/* Mobile Filter Toggle */}
        <button 
          className={`py-2.5 px-5 rounded-xl border text-sm font-bold flex items-center justify-between w-full md:hidden transition-all shadow-xs ${showFilter ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-slate-700 border-slate-200'}`} 
          onClick={() => setShowFilter(prev => !prev)}
        >
          <span>Filters by Specialty</span>
          <span>{showFilter ? '▲' : '▼'}</span>
        </button>

        {/* Specialty Filter Sidebar */}
        <div className={`flex-col gap-2.5 text-xs sm:text-sm font-semibold w-full md:w-64 flex-shrink-0 ${showFilter ? 'flex' : 'hidden md:flex'}`}>
          <div className='p-4 rounded-3xl bg-emerald-50/60 border border-emerald-100 flex flex-col gap-2 shadow-xs'>
            <div className='flex items-center justify-between pb-2 mb-1 border-b border-emerald-200/60 text-slate-800 font-extrabold text-xs uppercase tracking-wider'>
              <span>Specialties</span>
              {speciality && (
                <button 
                  onClick={() => navigate('/doctors')} 
                  className='text-[11px] text-teal-700 hover:underline capitalize font-bold'
                >
                  Clear All
                </button>
              )}
            </div>

            {specialities.map((item, index) => {
              const isSelected = speciality === item;
              return (
                <div 
                  key={index}
                  onClick={isSelected ? () => navigate('/doctors') : () => navigate(`/doctors/${item}`)} 
                  className={`px-4 py-3 rounded-2xl cursor-pointer transition-all flex items-center justify-between font-bold ${
                    isSelected 
                      ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30 translate-x-1' 
                      : 'bg-white text-slate-700 hover:bg-emerald-100/60 border border-emerald-100/50'
                  }`}
                >
                  <span>{item}</span>
                  <span className={`text-xs ${isSelected ? 'text-white' : 'text-slate-400'}`}>↗</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Doctor Grid */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
              <div 
                onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
                className='group bg-white rounded-3xl overflow-hidden border border-emerald-100/80 shadow-xs hover:shadow-xl hover:shadow-teal-900/5 hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between' 
                key={index}
              >
                {/* Doctor Image */}
                <div className='relative w-full aspect-4/3 bg-gradient-to-b from-teal-500/10 via-emerald-100/30 to-emerald-50 overflow-hidden flex items-end justify-center'>
                  <img className='w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
                  
                  <div className='absolute top-3 left-3 glass-pill px-3 py-1 rounded-full flex items-center gap-1.5 shadow-xs'>
                    <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                    <span className={`text-[11px] font-extrabold ${item.available ? 'text-emerald-700' : 'text-slate-500'}`}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>

                {/* Details */}
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
                      <span className='text-[10px] uppercase font-bold text-slate-400'>Consultation Fee</span>
                      <span className='text-sm font-extrabold text-teal-800'>{currencySymbol}{item.fees}</span>
                    </div>
                    <span className='w-8 h-8 rounded-full bg-emerald-50 group-hover:bg-teal-600 group-hover:text-white text-teal-700 flex items-center justify-center text-sm font-bold transition-all shadow-xs'>
                      ↗
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='col-span-full py-16 flex flex-col items-center justify-center text-center gap-3 bg-emerald-50/50 rounded-3xl border border-dashed border-emerald-200'>
              <span className='text-4xl'>🩺</span>
              <h3 className='text-lg font-bold text-slate-700'>No Doctors Found</h3>
              <p className='text-xs text-slate-500'>Try selecting a different specialty or clearing filters.</p>
              <button 
                onClick={() => navigate('/doctors')} 
                className='mt-2 px-6 py-2 rounded-full bg-teal-600 text-white font-bold text-xs shadow-md shadow-teal-600/30'
              >
                Show All Doctors
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Doctors