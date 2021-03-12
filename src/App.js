import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect} from 'react';

//internal api
import { fetchOrders } from './helpers/order';
import { fetchSlots, changeSlotStatus } from './helpers/slot';
import { fetchTSlots, changeTSlotStatus } from './helpers/tslot';

//interna utilities
import {formatDate} from './utilities/date';

import {CopyToClipboard} from 'react-copy-to-clipboard';
import {
   BrowserRouter as Router,
   Switch,
   Route
 } from "react-router-dom";
 

function newLined(order) {
   let newText = order.split('\n').map((item, i) => {
      return <p style={{margin:0}} key={i}>{item}</p>;
   });
   return newText;
}

function App() {
   // Dichiara una nuova variable di stato
   const [data, setData] = useState({
      orders : [],
      slots : [],
      tslots: [],
   });
   
   
   useEffect(() => {
      refresh();   
   }, [])

   const refresh = () => {
      var retOrders = [];
      fetchOrders().then(orders => {
         retOrders = orders;
         fetchSlots().then( slots =>{
            fetchTSlots().then( tslots =>{
               setData({
                  orders : retOrders,
                  slots : slots,
                  tslots : tslots,
               })
            })
         })
      })
   }

   return (
     <div className='container'>
        <Router>
            <div>
            <Switch>
               <Route path="/orders">
                  <Orders orders={data.orders} />
               </Route>
               <Route path="/slots">
                  <Slots slots={data.slots} refresh={refresh} />
               </Route>
               <Route path="/tslots">
                  <TSlots tslots={data.tslots} refresh={refresh} />
               </Route>
               <Route path="/">
                  <Orders orders={data.orders}/>
               </Route>
            </Switch>
            </div>
         </Router>
     </div>
   );
 }


 const Orders = (props) => {
   
   //Formatted Orders
   const formattedOrders = (
      <div className>
         {props.orders.map(order => (
            <div class='card mt-5 p-3'>{newLined(order)}
               <br />
               <CopyToClipboard text={order}>
                  <button class='btn btn-primary'>Copia Ordine</button>
               </CopyToClipboard>
            </div>
         ))}
      </div>
   ); 

   return(
      <div class='container'>
         {
            formattedOrders
         }
      </div>
   );
}

const Slots = (props) => {
   const formattedSlots = (
      <div className="text-center">
         <div className="alert alert-primary mt-3">
            <h5>stazio_free v1.0 - Slot DELIVERY 🍕</h5>
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

   const TSlots = (props) => {
      const formattedSlots = (
         <div className="text-center">
            <div className="alert alert-primary mt-3">
               <h5>stazio_free v1.1 - Slot ASPORTO 🍕</h5>
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
                                 changeTSlotStatus(tslot.day, range.start_time, range.associated_order)
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
   




export default App;
