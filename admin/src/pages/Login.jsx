import React, { useState, useContext } from 'react'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAToken, backendUrl } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
                if (data.success) {
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
                if (data.success) {
                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[85vh] flex items-center justify-center py-10 px-4'>
            <div className='flex flex-col gap-6 m-auto items-start p-8 sm:p-10 w-full max-w-md bg-white rounded-3xl border border-emerald-100/90 shadow-xl shadow-teal-900/5 text-slate-700 text-sm'>
                
                {/* Header & Role Switcher */}
                <div className='flex flex-col gap-2 w-full text-left'>
                    <div className='flex items-center gap-2 p-1 bg-emerald-50 rounded-full border border-emerald-100 self-start mb-1'>
                        <button 
                            type="button" 
                            onClick={() => setState('Admin')} 
                            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${state === 'Admin' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-teal-700'}`}
                        >
                            Admin Portal
                        </button>
                        <button 
                            type="button" 
                            onClick={() => setState('Doctor')} 
                            className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${state === 'Doctor' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-teal-700'}`}
                        >
                            Doctor Portal
                        </button>
                    </div>

                    <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight'>
                        {state} <span className='font-serif-accent italic font-normal text-teal-700'>Sign In</span>
                    </h2>
                    <p className='text-slate-500 text-xs font-normal'>
                        Access your authorized MediBuddy portal dashboard below.
                    </p>
                </div>

                {/* Form Inputs */}
                <div className='flex flex-col gap-4 w-full'>
                    <div className='w-full flex flex-col gap-1.5'>
                        <label className='text-xs font-extrabold uppercase tracking-wider text-slate-500'>Email Address</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className='border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 rounded-2xl w-full p-3 text-sm font-medium text-slate-800 outline-none transition-all' 
                            type="email" 
                            placeholder={state === 'Admin' ? "admin@medibuddy.com" : "doctor@medibuddy.com"}
                            required 
                        />
                    </div>

                    <div className='w-full flex flex-col gap-1.5'>
                        <label className='text-xs font-extrabold uppercase tracking-wider text-slate-500'>Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            className='border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 rounded-2xl w-full p-3 text-sm font-medium text-slate-800 outline-none transition-all' 
                            type="password" 
                            placeholder="••••••••"
                            required 
                        />
                    </div>
                </div>

                {/* Submit */}
                <button 
                    type='submit' 
                    className='w-full bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-extrabold py-3.5 rounded-2xl text-sm shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer'
                >
                    Login as {state}
                </button>

                {/* Toggle Footer */}
                <div className='w-full text-center pt-2 border-t border-slate-100 text-xs font-medium text-slate-600'>
                    {state === 'Admin' ? (
                        <p>Doctor Portal Login? <span className='text-teal-700 font-extrabold underline cursor-pointer ml-1' onClick={() => setState('Doctor')}>Click here</span></p>
                    ) : (
                        <p>Admin Portal Login? <span className='text-teal-700 font-extrabold underline cursor-pointer ml-1' onClick={() => setState('Admin')}>Click here</span></p>
                    )}
                </div>

            </div>
        </form>
    )
}

export default Login