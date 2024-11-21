const orderList = {
    7: [
        {
            id: "od zakaza",
            dishes: [
                {
                    dishId: 1,
                    comment: "1346rfdgh",
                    qty: 3,
                },
                {
                    
                    dishId: 4,
                    comment: "fgefgfg",
                    qty: 2,
                }
            ]
        },
        {

        }
    ]
}
const addDishToList = (idDish, qty, comment) => {

}
const addOrder = (tableNum, dishes) => {
    if (!orderList[7]) {
        orderList[tableNum] = {}
    }

    if (!orderList[tableNum].dishes) {
        orderList[tableNum].dishes = [];
    }
    orderList[tableNum].dishes = dishes;
}