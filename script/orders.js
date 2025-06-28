import { orders } from "../data/order.js";
import { getMatchingItem, loadProductFetch } from "../data/products.js";
import { deleteFromCart, getCartQuantity } from "../data/cart.js";

async function loadPage() {
  await loadProductFetch();

  let ordersHTML = '';

  orders.forEach((order) => {
    
    const orderDate = new Date(order.orderTime);

    const formattedDate = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(orderDate);

    ordersHTML += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formattedDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${(order.totalCostCents/100).toFixed(2)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
      </div>
    `;
  });

  function productsListHTML(order) {
    let productsListHTML = '';

    order.products.forEach((productDetails) => {

      const product = getMatchingItem(productDetails.productId);
      
      const date = new Date(productDetails.estimatedDeliveryTime);

      const formatted = new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(date);

      productsListHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${
              formatted
            }
          </div>
          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    return productsListHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}
loadPage();

// async function loadOrder(){

//   // let orderGridHtml=localStorage.getItem('orderGrid')||'';
//   let orderGridHtml='';
  
//   const neworder=localStorage.getItem('orders');
//   if(!neworder){
//     document.querySelector('.js-orders-grid').innerHTML=orderGridHtml;
//     return;
//   }
  
//   await loadProductFetch();

//     const orderId=orders[0].id;
//     const orderTime=orders[0].orderTime;
//     const totatCost=orders[0].totalCostCents;

//     const orderDate = new Date(orderTime);

//     const formattedDate = new Intl.DateTimeFormat('en-US', {
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric'
//     }).format(orderDate);

//     let orderHtml=`
//         <div class="order-container">
          
//           <div class="order-header">
//             <div class="order-header-left-section">
//               <div class="order-date">
//                 <div class="order-header-label">Order Placed:</div>
//                 <div>${formattedDate}</div>
//               </div>
//               <div class="order-total">
//                 <div class="order-header-label">Total:</div>
//                 <div>${(totatCost/100).toFixed(2)}</div>
//               </div>
//             </div>

//             <div class="order-header-right-section">
//               <div class="order-header-label">Order ID:</div>
//               <div>${orderId}</div>
//             </div>
//           </div>

//           <div class="order-details-grid">
//     `;

//     orders.forEach((order)=> {

//         const productArr=order.products;

//         productArr.forEach((item)=>{
//             const matchingItem=getMatchingItem(item.productId);

//             deleteFromCart(item.productId);

//             const date = new Date(item.estimatedDeliveryTime);

//             const formatted = new Intl.DateTimeFormat('en-US', {
//               month: 'long',
//               day: 'numeric',
//               year: 'numeric'
//             }).format(date);

//             orderHtml+=`
//             <div class="product-image-container">
//               <img src="${matchingItem.image}">
//             </div>

//             <div class="product-details">
//               <div class="product-name">
//                 ${matchingItem.name}
//               </div>
//               <div class="product-delivery-date">
//                 Arriving on: ${formatted}
//               </div>
//               <div class="product-quantity">
//                 Quantity: ${item.quantity}
//               </div>
//               <button class="buy-again-button button-primary">
//                 <img class="buy-again-icon" src="images/icons/buy-again.png">
//                 <span class="buy-again-message">Buy it again</span>
//               </button>
//             </div>

//             <div class="product-actions">
//               <a href="tracking.html">
//                 <button class="track-package-button button-secondary">
//                   Track package
//                 </button>
//               </a>
//             </div>
//         `;
//         });
//     });
//     orderHtml+=`
//          </div>
//         </div>
//     `;
//     orderGridHtml+=orderHtml;
//     // localStorage.setItem('orderGrid',orderGridHtml);
//     // localStorage.removeItem('orders');
//     document.querySelector('.js-orders-grid').innerHTML=orderGridHtml;
// }

// loadOrder();
