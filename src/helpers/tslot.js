import {yyyyMMdd} from '../utilities/date'
const fetch = require(`node-fetch`);

var body = {"day": yyyyMMdd(new Date())};

export const fetchTSlots = () => new Promise((resolves, rejects) => {
    fetch(`https://time2livery.com/taranges/afterDay/`, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then( res => { resolves (res) } )
    .catch( err => { rejects (err) } )
});


export const changeTSlotStatus = (day, start_time, associated_order) => new Promise((resolves, rejects) =>{
    var action = associated_order === 'NO' ? 'lock' : 'unlock';
    
    fetch(`https://time2livery.com/taranges/changeStatus/ck_6ed8647be5acc63877d339af614b60f2b0d7f32c`, {
        method: 'post',
        body:    JSON.stringify({day: day, start_time: start_time, action: action }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then( res => { resolves (res) } )
    .catch( err => { rejects (err) } )
});