import { renderOrderSummeryHTML } from "./checkout/orderSummery.js";
import { renderPaymentSummeryHTML } from "./checkout/paymentSummery.js";
import { loadProduct } from "../data/products.js";
// import '../data/cart-class.js;'
// import '../data/backend-practice.js';
loadProduct(()=>{
    renderOrderSummeryHTML();
    renderPaymentSummeryHTML();
});
