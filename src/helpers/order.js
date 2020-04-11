const fetch = require('node-fetch');
var fs = require('fs');

let prodMap = [];
var orderList = '';
var orderArray = [];
var orderStatus = 0;




export const fetchOrders = () => new Promise((resolves, rejects) => {
   fetch('https://time2livery.com/exercises')
      .then(res => res.json())
      .then(body => {
         for (var i = 0; i < body.length; i++) {
            prodMap.push({ id: body[i].id, name: body[i].name });
         }
         //console.log(prodMap)



         fetch('https://time2livery.com/orders')
            .then(res => res.json())
            .then(body => {
               for (let i = 0; i < body.length; i++) {

                  orderList += "CLIENTE: " + body[i].billing.first_name + ' ' + body[i].billing.last_name + '\n';
                  orderList += "INDIRIZZO: " + body[i].billing.address_1 + '\n';
                  orderList += "EMAIL: " + body[i].billing.email + '\n';
                  orderList += "CELL: " + body[i].billing.phone + '\n';
                  orderList += "PAGAMENTO: " + body[i].payment_method + '\n';
                  orderList += "DATA/ORA CONSEGA: " + body[i].dateTime + '\n';
                  orderList += "PRODOTTI: "
                  for (let j = 0; j < body[i].line_items.length; j++) {

                     for (let z = 0; z < prodMap.length; z++) {

                        if (prodMap[z].id === body[i].line_items[j].product_id) {
                           orderList += '\n' + '    ' + body[i].line_items[j].quantity + ' X ' + prodMap[z].name
                        }
                     }


                  }
                  orderArray.push(orderList);
                  orderList = '';
               }

               resolves(orderArray)

            });
      });

});

