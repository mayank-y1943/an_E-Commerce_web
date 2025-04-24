import {cart, updateCartQuantity} from '../../data/cart.js';
import { getMatchingItem } from '../../data/products.js';
import { getDeliveryOption, deliveryOptions } from '../../data/deliveryOptions.js';

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

    const items=updateCartQuantity();
    
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;

    document.querySelector('.js-payment-summery')
        .innerHTML=paymentSummeryHTML;

}