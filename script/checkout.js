import { products } from '../data/products.js';
import { cart, deleteFromCart, updateCartQuantity } from '../data/cart.js';



let orderSummeryHTML='';
cart.forEach((cartItem)=>{
    const productId=cartItem.productId;
    let matchingItem;
    products.forEach((product)=>{
        if(product.id===productId){
            matchingItem=product;
            }
        });
    orderSummeryHTML+=`
          <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${cartItem.productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
});
document.querySelector('.js-order-summery')
.innerHTML=orderSummeryHTML;

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