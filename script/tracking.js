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


    let productDetails;
    order.products.forEach((details)=>{
        if(details.productId===product.id){
            productDetails=details;
        }
    });

    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
    const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

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
          <div class="progress-label ${percentProgress<50?'current-status':''}">
            Preparing
          </div>
          <div class="progress-label ${percentProgress>=50 && percentProgress<100?'current-status':''}">
            Shipped
          </div>
          <div class="progress-label ${percentProgress>=100?'current-status':''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%;" ></div>
        </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML=trackHtml;

    const quantity=getCartQuantity();
    document.querySelector('.js-tracking-cart-quantity').innerHTML=quantity;
}
loadTrackingPage();
