export const deliveryOptions=[
    {
        Id: '1',
        deliveryDays: 7,
        priceCent: 0
    },
    {
        Id: '2',
        deliveryDays: 3,
        priceCent: 499
    },
    {
        Id: '3',
        deliveryDays: 1,
        priceCent: 999
    }
];

export function getDeliveryOption(deliveryId){
    let deliveryOption;
        deliveryOptions.forEach((option)=>{
        if(deliveryId===option.Id){
            deliveryOption=option;
        }
        });
    return deliveryOption||deliveryOption[0];
}