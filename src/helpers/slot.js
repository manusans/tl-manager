import {yyyyMMdd} from '../utilities/date'
const fetch = require(`node-fetch`);

var body = {"day": yyyyMMdd(new Date())};

export const fetchSlots = () => new Promise((resolves, rejects) => {
    fetch(`https://time2livery.com/ranges/afterDay/`, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then( res => { resolves (res) } )
    .catch( err => { rejects (err) } )
});


export const changeSlotStatus = (day, start_time, associated_order) => new Promise((resolves, rejects) =>{
    //if NO, slot is free. if CC, slot is closed only for Kitchen
    var action = associated_order === 'NO' ? 'lock' : 'unlock';
    
    fetch(`https://time2livery.com/ranges/changeStatus/ck_6ed8647be5acc63877d339af614b60f2b0d7f32c`, {
        method: 'post',
        body:    JSON.stringify({day: day, start_time: start_time, action: action }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then( res => { resolves (res) } )
    .catch( err => { rejects (err) } )
});


export const changeSlotKitchenStatus = (day, start_time, kitchen_closed) => new Promise((resolves, rejects) =>{
    //if NO, slot is free. if YES, slot is closed only for pizza
    var action = kitchen_closed === 'NO' ? 'lock' : 'unlock';
    
    fetch(`https://time2livery.com/ranges/changeKitchenStatus/ck_6ed8647be5acc63877d339af614b60f2b0d7f32c`, {
        method: 'post',
        body:    JSON.stringify({day: day, start_time: start_time, action: action }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then( res => { resolves (res) } )
    .catch( err => { rejects (err) } )
});