import { products } from '../../data/products.js';
import { cart, deleteFromCart, updateCartQuantity, updateDeliveryOptionId } from '../../data/cart.js';
import dayjs from 'https://unpkg.com/dayjs@1.8.9/esm/index.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';

export function renderOrderSummeryHTML(){

  let orderSummeryHTML='';
  cart.forEach((cartItem)=>{
      const productId=cartItem.productId;
      let matchingItem;
      products.forEach((product)=>{
          if(product.id===productId){
              matchingItem=product;
              }
      });
      let deliveryOption;
      deliveryOptions.forEach((option)=>{
        if(cartItem.deliveryOptionId===option.Id){
          deliveryOption=option;
        }
      });
      const today=dayjs();
      const deliveryDays=today.add(deliveryOption.deliveryDays, 'days');
      const dateString=deliveryDays.format('dddd, MMMM D');

      orderSummeryHTML+=`
            <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingItem.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingItem.name}
                  </div>
                  <div class="product-price">
                    $${(matchingItem.priceCents/100).toFixed(2)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" 
                    data-product-id=${cartItem.productId}>
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHTML(cartItem)}
                </div>
              </div>
            </div>
          `;
  });
  document.querySelector('.js-order-summery')
  .innerHTML=orderSummeryHTML;

  function deliveryOptionHTML(cartItem){
    let html='';
    deliveryOptions.forEach((deliveryOption)=>{
      const today=dayjs();
      const deliveryDays=today.add(deliveryOption.deliveryDays, 'days');
      const dateString=deliveryDays.format('dddd, MMMM D');
      let priceString='';
      if(deliveryOption.priceCent===0){
        priceString='FREE';
      }
      else{
        priceString=`$${(deliveryOption.priceCent/100).toFixed(2)}`;
      }
      const isChecked=deliveryOption.Id===cartItem.deliveryOptionId;
      html+=`
      <div class="delivery-option js-delivery-option"
      data-product-id=${cartItem.productId}
      data-delivery-option-id=${deliveryOption.Id}>
        <input type="radio"
          ${isChecked?'checked':''}
          class="delivery-option-input"
          name="delivery-option-${cartItem.productId}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
      `;
    });
    return html;
  }

  document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
      link.addEventListener('click', ()=>{
          const productId=link.dataset.productId;
          deleteFromCart(productId);
          document.querySelector(`.js-cart-item-container-${productId}`).remove();
          updateCheckoutQuantity();
      })
  });

  function updateCheckoutQuantity(){
    const Quantity=updateCartQuantity();
    document.querySelector('.js-checkout-header-middle-section').innerHTML=
    `Checkout (<a class="return-to-home-link"
      href="amazon.html">${Quantity} items</a>)
    `;
  }

  updateCheckoutQuantity();

  document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener('click', ()=>{
      const productId=element.dataset.productId;
      const deliveryOptionId=element.dataset.deliveryOptionId;
      updateDeliveryOptionId(productId, deliveryOptionId);
      renderOrderSummeryHTML();
    });
  });
}