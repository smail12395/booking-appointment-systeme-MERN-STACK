import { createContext } from "react";

export const AppContext = createContext()

const AppContextProider = (props) => {
    const currency = 'MAD'
    const calculateAge = (dob)=> {
        const today = new Date()
        const birtDate = new Date(dob)
        let age = today.getFullYear() - birtDate.getFullYear()
        return age

    }
    const months = ['','Jan','Feb','Mar','Apr','May', 'Jun', 'Aug', 'Sep','Oct', 'Nov', 'Dec']

    const slotDateFormat = (slotDate)=>{
      const dateArray = slotDate.split('/')
      return dateArray[0] + ' ' + months[Number(dateArray[1])-1] + ' '+dateArray[2]
    }
    const value = {
        calculateAge,
        slotDateFormat,
        currency
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProider