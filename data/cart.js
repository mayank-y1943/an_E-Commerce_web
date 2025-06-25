export let cart;

function loadFromStorage(){
  cart=JSON.parse(localStorage.getItem('cart'))||[];

  // if(!cart){
  //   cart=[
  //     {
  //       productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  //       quantity: 2,
  //       deliveryOptionId: '1'
  //     },
  //     {
  //         productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  //         quantity: 1,
  //         deliveryOptionId: '2'
  //     },
  //   ];
  // }
}

loadFromStorage();

export function addToCart(productId){
  let selectedQuantity=document.querySelector(`.js-quantity-selector-${productId}`).value;

  let found=false;
  cart.forEach((cartItem)=>{
    if(cartItem.productId===productId){
        cartItem.quantity+=Number(selectedQuantity);
        found=true;
    }
  });

  if(!found){
    cart.push(
      {
          productId: productId,
          quantity: Number(selectedQuantity),
          deliveryOptionId: '1'
      }
    );
  }
  saveToStorage();
}

export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function deleteFromCart(productId){
  const newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId!=productId){
      newCart.push(cartItem)
    }
  });
  cart=newCart;
  saveToStorage();
}

export function getCartQuantity(){
  let Quantity=0;
  cart.forEach((cartItem)=>{
      Quantity+=cartItem.quantity;
  });

  return Quantity;
}

export function updateDeliveryOptionId(productId, deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem=cartItem;
    }
  });
  matchingItem.deliveryOptionId=deliveryOptionId;
  saveToStorage();
}

export function updateCartQuantity(productId, newQuantity){
  let matchingItem;
  cart.forEach((cartItem)=>{
    if(productId===cartItem.productId){
      matchingItem=cartItem;
    }
  });
  matchingItem.quantity=newQuantity;
  saveToStorage();
}