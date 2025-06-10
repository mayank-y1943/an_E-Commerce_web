class Cart{
    cartItems = undefined;
    localStorageKey;

    constructor(localStorageKey){
        this.localStorageKey=localStorageKey;
        this.loadFromStorage();
    }

    loadFromStorage(){
            this.cartItems=JSON.parse(localStorage.getItem(this.localStorageKey));

            if(!this.cartItems){
                this.cartItems=[
                {
                    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                    quantity: 2,
                    deliveryOptionId: '1'
                },
                {
                    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                    quantity: 1,
                    deliveryOptionId: '2'
                },
                ];
            }
    }

    addToCart(productId){

        let found=false;
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId===productId){
                cartItem.quantity+=1;
                found=true;
            }
        });

        if(!found){
            this.cartItems.push(
            {
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            }
            );
        }
        this.saveToStorage();
    }
    saveToStorage(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    deleteFromCart(productId){
        const newCart=[];
        this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId!=productId){
            newCart.push(cartItem)
            }
        });
        this.cartItems=newCart;
        this.saveToStorage();
    }

    getCartQuantity(){
        let Quantity=0;
        this.cartItems.forEach((cartItem)=>{
            Quantity+=cartItem.quantity;
        });

        return Quantity;
    }    

    updateDeliveryOptionId(productId, deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if(productId===cartItem.productId){
            matchingItem=cartItem;
            }
        });
        matchingItem.deliveryOptionId=deliveryOptionId;
        this.saveToStorage();
    }

    updateCartQuantity(productId, newQuantity){
        let matchingItem;
        this.cartItems.forEach((cartItem)=>{
            if(productId===cartItem.productId){
            matchingItem=cartItem;
            }
        });
        matchingItem.quantity=newQuantity;
        this.saveToStorage();
    }
}

const cart= new Cart('cart-oop');

const businessCart= new Cart('businessCart-oop');

console.log(cart);
console.log(businessCart);