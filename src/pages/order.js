
import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';


function newLined(order) {
    let newText = order.split('\n').map((item, i) => {
       return <p style={{margin:0}} key={i}>{item}</p>;
    });
    return newText;
}

export const Orders = (props) => {
   
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