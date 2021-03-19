const fetch = require(`node-fetch`);

let prodMap = [];
var orderList = ``;
var orderArray = [];


export const fetchOrders = () => new Promise((resolves, rejects) => {
   fetch(`https://time2livery.com/exercises`)
      .then(res => res.json())
      .then(body => {

         for (var i = 0; i < body.length; i++) {
            prodMap.push({ id: body[i].id, name: body[i].name, price: body[i].price });
         }
         //console.log(prodMap)



         fetch(`https://time2livery.com/orders/last`)
            .then(res => res.json())
            .then(body => {
               for (let i = 0; i < body.length; i++) {

                  orderList += `CLIENTE: ${body[i].billing.first_name} ${body[i].billing.last_name} \n`;
                  orderList += `INDIRIZZO: ${body[i].billing.address_1}\n`;
                  orderList += `EMAIL: ${body[i].billing.email}\n`;
                  orderList += `CELL: ${body[i].billing.phone}\n`;
                  orderList += `PIANO: ${body[i].shipping.floor}\n`;
                  orderList += `PAGAMENTO: ${body[i].payment_method}\n`;
                  orderList += `DATA/ORA CONSEGNA: ${body[i].dateTime}\n`;
                  
                  orderList += body[i].line_items.length === 0 ? `` : `\n---- PRODOTTI ----\n`;
                  for (let j = 0; j < body[i].line_items.length; j++) {
                     for (let z = 0; z < prodMap.length; z++) {
                        if (prodMap[z].id === body[i].line_items[j].product_id) {
                           orderList += `\n ${body[i].line_items[j].quantity} X ${prodMap[z].name} ( ${prodMap[z].price} Euro )`
                        }
                     }
                  }
                  
                  orderList += body[i].iceCreams.length === 0 ? `` : `\n---- GELATI ----\n`;
                  for (let k = 0; k < body[i].iceCreams.length; k++){
                     orderList += `  ${k+1}) ${body[i].iceCreams[k].product.name} (${body[i].iceCreams[k].product.price}€) con:\n`;
                     orderList += `  ...... ${body[i].iceCreams[k].flavors.join("\n...... ")}`;
                     orderList += `\n`;                     
                  }

                  if(body[i].pizza_items){
                     var pizza = body[i].pizza_items;
                     orderList += pizza.length > 0 ? `\n---- PIZZE ----` : ``;
                     try{
                     for (let j = 0; j < pizza.length; j++) {
                        orderList += `\n ${pizza[j].qty} X ${pizza[j].name}
.... PREZZO TOTALE: ${pizza[j].price} Euro
.... NOTE: ${pizza[j].optionals.notes}  
.... IMPASTO: ${pizza[j].optionals.pasta.name} 
.... BASE: ${pizza[j].optionals.base.name}
.... INGREDIENTI AGG: ` 
// eslint-disable-next-line
+ Object.keys(pizza[j].optionals.ingredients).map(function(k){return `\n ${pizza[j].optionals.ingredients[k].name} ( ${pizza[j].optionals.ingredients[k].price} Euro )`});

                                 
                     }}catch(err){
                        orderList += `Errore di identificazione pizza: ${err}`;
                     }
                     orderList += `\n\n`;
                  }

                  orderArray.push(orderList);
                  orderList = ``;
               }

               resolves(orderArray)

            });
      });

});



/*
{
   
}*/