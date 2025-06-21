import { renderOrderSummeryHTML } from "./checkout/orderSummery.js";
import { renderPaymentSummeryHTML } from "./checkout/paymentSummery.js";
import { loadProduct } from "../data/products.js";
// import '../data/cart-class.js;'
// import '../data/backend-practice.js';

Promise.all([
    new Promise((resolve)=>{
        loadProduct(()=>{
            resolve('v');
        });
    })
]).then((value)=>{
    console.log(value);
    renderOrderSummeryHTML();
    renderPaymentSummeryHTML();
});

/*
new Promise((resolve)=>{
    loadProduct(()=>{
        resolve('value');
    })
}).then((value)=>{
    console.log(value);
    renderOrderSummeryHTML();
    renderPaymentSummeryHTML();
});
*/

/*
loadProduct(()=>{
    renderOrderSummeryHTML();
    renderPaymentSummeryHTML();
});
*/
