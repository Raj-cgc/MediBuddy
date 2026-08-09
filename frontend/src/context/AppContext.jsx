import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const rawBackendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000'
    const backendUrl = rawBackendUrl.replace(/\/$/, '')

    const [token, setToken] = useState(
        localStorage.getItem('token') && localStorage.getItem('token') !== 'false' && localStorage.getItem('token') !== 'undefined' && localStorage.getItem('token') !== 'null'
            ? localStorage.getItem('token')
            : false
    )

    const [userData, setUserData] = useState(false)


    const getDoctorsData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const loadUserProfileData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/get-profile', { headers: { token } })
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
                setToken(false)
                localStorage.removeItem('token')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            setToken(false)
            localStorage.removeItem('token')
        }
    }

    const value = {
        doctors, getDoctorsData,
        currencySymbol,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData
    }

    useEffect(() => {
        getDoctorsData()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])



    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider