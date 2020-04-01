import fetch from 'node-fetch';
import constants from '../constants';

export const register = async (qNumber) =>{
    try{
        const response = await fetch(`${constants.url}/register?qNumber=${qNumber}`, { method: 'POST' });
        const json = await response.json();
        return json.affectedRows && json.changedRows>0;
    }catch(e){
        return null;
    }
}

export const unregister = async (qNumber) =>{
    try{
        const response = await fetch(`${constants.url}/unregister?qNumber=${qNumber}`, { method: 'POST' });
        const json = await response.json();
        return json.affectedRows && json.changedRows>0;
    }catch(e){
        return null;
    }
}

export const submitReport = async ({
    qNumber,
    isCough,
    isCold,
    isDiarrhea,
    isSoreThroat,
    isRash,
    isHeadache,
    isBreath,
    isFatigue}) =>{

    const body = {
        qNumber,
        isCough: isCough? 1:0,
        isCold: isCold?1:0,
        isDiarrhea: isDiarrhea?1:0 ,
        isSoreThroat: isSoreThroat?1:0,
        isRash: isRash?1:0,
        isHeadache: isHeadache?1:0,
        isBreath: isBreath?1:0,
        isFatigue: isFatigue?1:0
    } 
    try{
        const response = await fetch(`${constants.url}/submitReport`, { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }, });
        const json = await response.json();
        return json.affectedRows;
    }catch(e){
        return null;
    }
}