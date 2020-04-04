import fetch from 'node-fetch';
import jwt_decode from 'jwt-decode';
import constants from '../constants';

const defaultHeaders = { 'Content-Type': 'application/json' }


export const register = async (qNumber) =>{
    try{
        const body = {
            secret: qNumber
        }
        const response = await fetch(`${constants.url}/api/user/quarantine/authenticate`,
         { method: 'POST', 
           headers: defaultHeaders,
           body: JSON.stringify(body)
         });
        if(!response.ok){
            return {
                isAuthenticated: false,
                token: "",
                inspectUsers: [],
                registeredDate: null
            };
        }
        const json = await response.json();
        const { inspectUsers, name }= jwt_decode(json.token);
        return {
            isAuthenticated: true,
            token: json.token,
            inspectUsers,
            name,
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
            'Authorization': `Bearer ${token}`
        }
        const response = await fetch(`${constants.url}/unregister`, 
        { method: 'POST', headers });
        if(!response.ok){
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
        'Authorization': `Bearer ${token}`
    }
    try{
        const response = await fetch(`${constants.url}/api/user/quarantine/point`, {
             method: 'PUT', 
             body: JSON.stringify(body), 
             headers});
        if(!response.ok){
            return null;
        }
        return true;
    }catch(e){
        return null;
    }
}

export const submitWelfareReport = async (list, token) =>{

    const body = {};

    list.forEach(item=>{
        body[item]=true;
    })

    const headers = {
        ...defaultHeaders,
        'Authorization': `Bearer ${token}`
    }
    try{
        const response = await fetch(`${constants.url}/submitWelfareReport`, {
             method: 'PUT', 
             body: JSON.stringify(body), 
             headers});
        if(!response.ok){
            return null;
        }
        return true;
    }catch(e){
        return null;
    }
}