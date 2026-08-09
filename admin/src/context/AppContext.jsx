import { createContext } from "react";
import App from "../App";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const currencySymbol = '₹'

    const calculateAge = (dob) => {
        if (!dob || dob === 'Not Selected' || dob === 'Not set') return 'N/A'
        const today = new Date()
        const birthDate = new Date(dob)
        if (isNaN(birthDate.getTime())) return 'N/A'
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age > 0 ? age : 'N/A'
    }

    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    const value = {
        calculateAge,
        slotDateFormat,
        currencySymbol
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}



export default AppContextProvider