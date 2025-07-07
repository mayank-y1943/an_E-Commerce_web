import {cart, addToCart, getCartQuantity} from '../data/cart.js';
import { products, loadProduct} from '../data/products.js';

loadProduct(renderProductGrid);

function renderProductGrid(){

  let productHtml='';

  const url=new URL(window.location.href);
  let search=url.searchParams.get('search');

  let filteredProduct=products;

  if(search){
    search=search.toLowerCase();
    filteredProduct=products.filter((product)=>{
        return product.name.toLowerCase().includes(search)||
               product.keywords.includes(search);
    });
  }

  filteredProduct.forEach((product)=>{
      productHtml+=`<div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getURL()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${product.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${product.extraHtmlInfo()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>`;
  });
  document.querySelector('.js-product-grid').innerHTML=productHtml;


  function addedToCartMessage(productId){
    document.querySelector(`.js-added-to-cart-${productId}`).classList.toggle('added');

    setTimeout(()=>{
      document.querySelector(`.js-added-to-cart-${productId}`).classList.toggle('added');
    }, 1000);
  }

  function updateCartQuantityAtHeader(){
    const Quantity=getCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML=Quantity;
  }

  updateCartQuantityAtHeader();


  document.querySelectorAll('.js-add-to-cart-button').forEach((button)=>{
      button.addEventListener('click', ()=>{
          const productId=button.dataset.productId;

          addedToCartMessage(productId);

          let selectedQuantity=document.querySelector(`.js-quantity-selector-${productId}`).value;

          addToCart(productId, selectedQuantity);

          updateCartQuantityAtHeader();

      })
  });

  document.querySelector('.js-search-button').
    addEventListener('click', ()=>{
        const search=document.querySelector('.js-search-bar').value;
        window.location.href=`index.html?search=${search}`;
    });

  document.querySelector('.js-search-bar').
    addEventListener('keydown', (event)=>{
      if(event.key==='Enter'){
        const search=document.querySelector('.js-search-bar').value;
        window.location.href=`index.html?search=${search}`;
      }
    });
    
}