import { renderOrderSummeryHTML } from "./checkout/orderSummery.js";
import { renderPaymentSummeryHTML } from "./checkout/paymentSummery.js";
import { loadProduct, loadProductFetch } from "../data/products.js";
// import '../data/cart-class.js;'
// import '../data/backend-practice.js';

async function loadPage() {
    try{
        await loadProductFetch();
    }catch(error){
        console.log('unexpected error');
    }

    renderOrderSummeryHTML();
    renderPaymentSummeryHTML();
}
loadPage();

/*
Promise.all([
    loadProductFetch()
]).then(()=>{
    renderOrderSummeryHTML();
    renderPaymentSummeryHTML();
});
*/

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
