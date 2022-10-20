import { IDate } from "./models/IDate";
import { ILogin } from "./models/ILogin"


export const control = (): ILogin | null => {
    // remember control

    const stRemember = sessionStorage.getItem('data');
    try {
        const jwt = JSON.parse(stRemember!) // as ILogin
        return jwt
    } catch (error) {
        sessionStorage.removeItem('user')
    }


    return null
}


export const stDate = (): IDate | null => {
    
    if (sessionStorage.date) {
        const dateObj = JSON.parse(sessionStorage.date) as IDate
        return dateObj;
    }
    return null
}


export const setStDate = (startDate:Date,endDate: Date,person: number): IDate=> {
    
    const stDate : IDate = {startDate: startDate,endDate: endDate, person: person } as IDate
    sessionStorage.date = JSON.stringify(stDate)
    
    return stDate
}




