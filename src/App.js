import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect} from 'react';

//internal api
import { fetchOrders } from './helpers/order';
import { fetchSlots } from './helpers/slot';
import { fetchTSlots } from './helpers/tslot';

//pages
import {Orders} from './pages/order';
import {Slots} from './pages/slot';
import {TSlots} from './pages/tslot';


import {
   BrowserRouter as Router,
   Switch,
   Route
 } from "react-router-dom";
 

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



   
   




export default App;
