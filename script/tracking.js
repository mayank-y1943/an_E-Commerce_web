import { getCartQuantity } from "../data/cart.js";
import { getMatchingOrder } from "../data/order.js";
import { getMatchingItem, loadProductFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.8.9/esm/index.js';


async function loadTrackingPage() {
    await loadProductFetch();

    const url=new URL(window.location.href);
    
    const orderId=url.searchParams.get("orderId");
    const productId=url.searchParams.get("productId");

    const order=getMatchingOrder(orderId);
    const product=getMatchingItem(productId);

    console.log(order);

    let productDetails;
    order.products.forEach((details)=>{
        if(details.productId===product.id){
            productDetails=details;
        }
    });

    const trackHtml=`
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML=trackHtml;

    const quantity=getCartQuantity();
    document.querySelector('.js-tracking-cart-quantity').innerHTML=quantity;
}
loadTrackingPage();
