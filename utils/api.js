import fetch from 'node-fetch';
import constants from '../constants';

const defaultHeaders = { 'Content-Type': 'application/json' }
const STATUS_CODES = {
    ERROR: 400
}

export const register = async (qNumber) =>{
    try{
        const body = {
            mobileNumber: qNumber
        }
        const response = await fetch(`${constants.url}/register`,
         { method: 'POST', 
           headers: defaultHeaders,
           body: JSON.stringify(body)
         });
        const json = await response.json();
        if(json.statusCode === STATUS_CODES.ERROR){
            return {
                isAuthenticated: false,
                token: "",
                policeOfficerName: '',
                policeOfficerMobile: '',
                registeredDate: null
            };
        }
        return {
            isAuthenticated: true,
            token: json.token,
            policeOfficerName: json.policeManData.name,
            policeOfficerMobile: json.policeManData.mobile,
            registeredDate: new Date().getTime()
        };
    }catch(e){
        return null;
    }
}

export const unregister = async (token) =>{
    try{
        const headers = {
            ...defaultHeaders,
            'Authorization': `Basic ${token}`
        }
        const response = await fetch(`${constants.url}/unregister`, 
        { method: 'POST', headers });
        const json = await response.json();
        if(json.statusCode === STATUS_CODES.ERROR){
            return null;
        }
        return true;
    }catch(e){
        return null;
    }
}

export const submitReport = async ({
    isCough,
    isCold,
    isDiarrhea,
    isSoreThroat,
    isRash,
    isHeadache,
    isFever,
    isBreath,
    isFatigue},token) =>{

    const body = {
        COUGH: isCough,
        COLD: isCold,
        DIARRHEA: isDiarrhea,
        THROAT: isSoreThroat,
        MYALGIA: isRash,
        HEADACHE: isHeadache,
        FEVER: isFever,
        BREATH: isBreath,
        FATIGUE: isFatigue
    } 

    const headers = {
        ...defaultHeaders,
        'Authorization': `Basic ${token}`
    }
    try{
        const response = await fetch(`${constants.url}/submitReport`, {
             method: 'PUT', 
             body: JSON.stringify(body), 
             headers});
        const json = await response.json();
        if(json.statusCode === STATUS_CODES.ERROR){
            return null;
        }
        return true;
    }catch(e){
        return null;
    }
}

export const submitWelfareReport = async (list, token) =>{

    const body = {
        list
    }

    const headers = {
        ...defaultHeaders,
        'Authorization': `Basic ${token}`
    }
    try{
        const response = await fetch(`${constants.url}/submitWelfareReport`, {
             method: 'PUT', 
             body: JSON.stringify(body), 
             headers});
        const json = await response.json();
        if(json.statusCode === STATUS_CODES.ERROR){
            return null;
        }
        return true;
    }catch(e){
        return null;
    }
}