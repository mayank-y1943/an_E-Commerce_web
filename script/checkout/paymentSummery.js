import {cart, deleteFromCart, getCartQuantity} from '../../data/cart.js';
import { getMatchingItem } from '../../data/products.js';
import { getDeliveryOption, deliveryOptions } from '../../data/deliveryOptions.js';
import { addOrder, orders } from '../../data/order.js';

export function renderPaymentSummeryHTML(){
  
    let itemsPriceCents=0;
    let shippingPriceCents=0;
    cart.forEach((cartItem)=>{
        const matchingItem=getMatchingItem(cartItem.productId);
        itemsPriceCents+=matchingItem.priceCents*cartItem.quantity;

        const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents+=deliveryOption.priceCent;
    });

    const totalBeforTax=itemsPriceCents+shippingPriceCents;
    const estimatedTax=totalBeforTax*0.1;

    const orderTotal=totalBeforTax+estimatedTax;

    const items=getCartQuantity();
    
    const paymentSummeryHTML=`
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${items}):</div>
            <div class="payment-summary-money">
                $${(itemsPriceCents/100).toFixed(2)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
                $${(shippingPriceCents/100).toFixed(2)}
            </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">
                $${(totalBeforTax/100).toFixed(2)}
            </div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">
                 $${(estimatedTax/100).toFixed(2)}
            </div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">
                $${(orderTotal/100).toFixed(2)}
            </div>
          </div>

          <button class="place-order-button button-primary
          js-place-order">
            Place your order
          </button>
    `;

    const cartQuantity=getCartQuantity();
    if(cartQuantity===0){
      document.querySelector('.js-payment-summery')
        .innerHTML='';
    }
    else{
      document.querySelector('.js-payment-summery')
          .innerHTML=paymentSummeryHTML;


      document.querySelector('.js-place-order')
        .addEventListener('click', async ()=>{
          try{
            const response=await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers:{
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  cart: cart
                })
            });
            const order=await response.json();
            addOrder(order);
            order.products.forEach(product => {
              deleteFromCart(product.productId);
            });
          }catch(error){
            console.log('unexpected error');
          }
          window.location.href='orders.html';
        });
    }

}