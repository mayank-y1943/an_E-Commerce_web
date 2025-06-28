export let orders=JSON.parse(localStorage.getItem('orders'))||[];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getMatchingOrder(orderId){
    let matchingOrder;
    orders.forEach((order)=> {
        if(order.id===orderId){
            matchingOrder=order;
        }
    });
    return matchingOrder;
}