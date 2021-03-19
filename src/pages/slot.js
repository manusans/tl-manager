
import React from 'react';
import {changeSlotStatus } from '../helpers/slot';
import {formatDate} from '../utilities/date';

export const Slots = (props) => {
    const formattedSlots = (
       <div className="text-center">
          <div className="alert alert-primary mt-3">
             <h5>stazio_free v1.0 - Slot DELIVERY</h5>
          </div>
          {props.slots.map(slot => (
             <div className = 'card mt-3 text-center'>
                <h5 className = 'card-title '>SLOT DEL GIORNO: {formatDate(slot.day).italianDate}</h5>
                <div className = 'row'>
                {
                   slot.time_ranges.map(range => (
                      <div className = 'col col-6'>
                         <button 
                            onClick={() => {
                               changeSlotStatus(slot.day, range.start_time, range.associated_order)
                               .then(res => props.refresh())
                            }} 
                            class= {range.associated_order === 'NO' ? 'btn btn-success m-1' : 'btn btn-danger m-1'}
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