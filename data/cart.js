export const cart=[];

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
          quantity: Number(selectedQuantity)
      }
    );
  }
}

function 
