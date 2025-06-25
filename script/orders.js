import { orders } from "../data/order.js";
import { getMatchingItem, loadProductFetch } from "../data/products.js";

async function loadOrder(){

    let orderGridHtml=localStorage.getItem('orderGrid')||'';

    const neworder=localStorage.getItem('orders');
    if(!neworder){
        document.querySelector('.js-orders-grid').innerHTML=orderGridHtml;
        return;
    }
    
    await loadProductFetch();
    let orderHtml=`
        <div class="order-container">
          
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>August 12</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$35.06</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
            </div>
          </div>

          <div class="order-details-grid">
    `;

    orders.forEach((order)=> {

        const productArr=order.products;

        productArr.forEach((item)=>{
            const matchingItem=getMatchingItem(item.productId);
            orderHtml+=`
            <div class="product-image-container">
              <img src="${matchingItem.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${matchingItem.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: August 15
              </div>
              <div class="product-quantity">
                Quantity: 1
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>
        `;
        });
    });
    orderHtml+=`
         </div>
        </div>
    `;
    orderGridHtml+=orderHtml;
    localStorage.setItem('orderGrid',orderGridHtml);
    localStorage.removeItem('orders');
    document.querySelector('.js-orders-grid').innerHTML=orderGridHtml;
}

loadOrder();