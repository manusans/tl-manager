
import React from 'react';
import {changeTSlotKitchenStatus } from '../helpers/tslot';
import {formatDate} from '../utilities/date';

export const KTSlots = (props) => {
    const formattedSlots = (
       <div className="text-center">
          <div className="alert alert-primary mt-3">
             <h5>stazio_free v1.1 - Slot ASPORTO CUCINA</h5>
          </div>
          {props.tslots.map(tslot => (
             <div className = 'card mt-3 text-center'>
                <h5 className = 'card-title '>SLOT DEL GIORNO: {formatDate(tslot.day).italianDate}</h5>
                <div className = 'row'>
                {
                   tslot.time_ranges.map(range => (
                      <div className = 'col col-6'>
                         <button 
                            onClick={() => {
                               changeTSlotKitchenStatus(tslot.day, range.start_time, range.kitchen_closed)
                               .then(res => props.refresh())
                            }} 
                            class= {range.kitchen_closed === 'NO' ? 'btn btn-success m-1' : 'btn btn-danger m-1'}
                         >
                            {range.start_time} - {range.end_time}
                         </button>
                      </div>
                   ))
                }
                </div>
             </div>
          ))}
       </div>
    );

 return(
    <div class='container'>
       {
          formattedSlots
       }
    </div>
 );
 }