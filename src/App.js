import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from 'react';
import { fetchOrders } from './helpers/order'
import {CopyToClipboard} from 'react-copy-to-clipboard';


var orders = [];

function newLined(order) {
   let newText = order.split('\n').map((item, i) => {
      return <p style={{margin:0}} key={i}>{item}</p>;
   });
   return newText;
}

 class App extends Component {
  constructor(props) {
     super(props);
     this.state = { orders: [], loading : true };
  }

  componentDidMount() {
     fetchOrders()
        .then((res) => this._setOrders(res.reverse()));
  }

   _setOrders(fetchedOrders) {
      this.setState({ orders: fetchedOrders, loading: false });
      console.log(this.state.orders[0])
   } 

   render() {

      //Formatted Orders
      const formattedOrders = (
         <div>
            {this.state.orders.map(order => (
               <div class='card mt-5 p-3'>{newLined(order)}
                  <br />
                  <CopyToClipboard text={order}
                     onCopy={() => this.setState({copied: true})}>
                     <button class='btn btn-primary'>Copia Ordine</button>
                  </CopyToClipboard>
                  
               </div>
            ))}
         </div>
      ); 

      if (this.state.loading) {
         return (
            <div style={{color:'white'}}>
               <h3 class='display-3 text-center'>carico gli ordini..</h3>
            </div>
         )
      };

      
      return (
         <div class='container'>
            {formattedOrders}
         </div>
      )
   }
}



export default App
