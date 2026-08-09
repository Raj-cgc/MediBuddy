import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken, userData } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { password, email })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (token && userData) {
      navigate('/')
    }
  }, [token, userData])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[75vh] flex items-center justify-center py-10 px-4'>
      <div className='flex flex-col gap-5 m-auto items-start p-8 sm:p-10 w-full max-w-md bg-white rounded-3xl border border-emerald-100/90 shadow-xl shadow-teal-900/5 text-slate-700 text-sm'>
        
        {/* Header */}
        <div className='flex flex-col gap-1 w-full text-left'>
          <span className='px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider self-start border border-emerald-200/60'>
            {state === 'Sign Up' ? "New Patient Registration" : "Welcome Back"}
          </span>
          <h2 className='text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1'>
            {state === 'Sign Up' ? "Create Account" : "Sign In to Account"}
          </h2>
          <p className='text-slate-500 text-xs font-normal'>
            Please {state === 'Sign Up' ? "register below" : "enter credentials"} to book doctor appointments.
          </p>
        </div>

        {/* Inputs */}
        <div className='flex flex-col gap-4 w-full mt-2'>
          {state === 'Sign Up' && (
            <div className='w-full flex flex-col gap-1.5'>
              <label className='text-xs font-extrabold uppercase tracking-wider text-slate-500'>Full Name</label>
              <input 
                className='border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 rounded-2xl w-full p-3 text-sm font-medium text-slate-800 outline-none transition-all' 
                type="text" 
                placeholder="Dr. / Mr. / Ms. John Doe"
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                required 
              />
            </div>
          )}

          <div className='w-full flex flex-col gap-1.5'>
            <label className='text-xs font-extrabold uppercase tracking-wider text-slate-500'>Email Address</label>
            <input 
              className='border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 rounded-2xl w-full p-3 text-sm font-medium text-slate-800 outline-none transition-all' 
              type="email" 
              placeholder="user@example.com"
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              required 
            />
          </div>

          <div className='w-full flex flex-col gap-1.5'>
            <label className='text-xs font-extrabold uppercase tracking-wider text-slate-500'>Password</label>
            <input 
              className='border border-slate-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 rounded-2xl w-full p-3 text-sm font-medium text-slate-800 outline-none transition-all' 
              type="password" 
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              required 
            />
          </div>
        </div>

        {/* Submit Button */}
        <button 
          type='submit' 
          className='w-full bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-extrabold py-3.5 rounded-2xl text-sm shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer mt-2'
        >
          {state === 'Sign Up' ? "Create Account" : "Sign In"}
        </button>

        {/* Toggle Mode */}
        <div className='w-full text-center pt-2 border-t border-slate-100 mt-2 text-xs font-medium text-slate-600'>
          {state === 'Sign Up' ? (
            <p>Already have an account? <span onClick={() => setState('Login')} className='text-teal-700 font-extrabold underline cursor-pointer hover:text-teal-800 ml-1'>Login here</span></p>
          ) : (
            <p>Don't have an account? <span onClick={() => setState('Sign Up')} className='text-teal-700 font-extrabold underline cursor-pointer hover:text-teal-800 ml-1'>Create a new account</span></p>
          )}
        </div>

      </div>
    </form>
  )
}

export default Login