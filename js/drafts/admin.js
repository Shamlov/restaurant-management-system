let app = document.querySelector('#app')
import { getListCurrentOrders } from '../data.js';
///////////////////////////////////////

import { getListTables } from '../data.js'// в адресе убрать точку при переносе

const adminStartHtml = `
    <div class="window-kitchen container-fluid canvas-color pb-1">
        <div class="top-menu-buttons menu-color p-1 mb-1 rounded d-flex">
            <button type="button" class="btn btn-primary p-0 me-sm-3 me-1 ms-sm-5 text-uppercase">Обновить</button>
            <button type="button" class="btn btn-primary p-0 me-sm-3 me-1 text-uppercase">Стоп-лист</button>
            <button type="button" class="btn btn-primary p-0 me-sm-3 text-uppercase">Гоу-лист</button>
            <p class="ms-auto px-4 fs-5">Администратор</p>
        </div>

        <div class="list-tables d-flex flex-wrap gap-2" id="lisTables"></div>

        <div class="open-checks-container" id="openChecksContainer">

            <div class="final-cost card-design">
                <h4>Итого: <span class="d-inline-block ms-4 fw-bold">1200<span> p.</span></span></h4>
            </div>
    
            <div class="button-block">
                <button type="button" class="btn btn-success">Закрыть чек</button>
            </div>
        </div>
    </div>
`
app.innerHTML = adminStartHtml

const lisTables = document.querySelector('#lisTables')
// 

// дополнительно ввети и принимать в функцию данные о заказах
function htmlBlockTablesFormation(dataArr, ordersArr) {
    // console.log(ordersArr)
    for(let i = 0; i < dataArr.length; i++) {
        // // console.log(ordersArr[i])
        // for(let p = 0; p < ordersArr.length; p++) {
        //     // console.log(dataArr[i].number, 'i')
        //     // console.log(ordersArr[p].table, 'p')
        //     // console.log(dataArr[i].number == ordersArr[p].table)
        //     if(dataArr[i].number == ordersArr[p].table) {
        //         // console.log(234)
        //         // console.log(dataArr[i].number == ordersArr[p].table)
        //         console.log(ordersArr[p].price + ordersArr[i].price)
        //     }
        // }
        lisTables.insertAdjacentHTML('beforeEnd', `
            <div class="table text-center">
                <p>стол ${dataArr[i].number}</p>
                <p>нет чеков</p>
            </div>
            `
        )
    }
    
    for (let i = 0; i < ordersArr.length; i++) {
        let sum = []
        for(let j = i + 1; j < ordersArr.length; j++) {
            if (ordersArr[i].table == ordersArr[j].table) {
                // sum = ordersArr[i].price * ordersArr[i].quantity + ordersArr[j].price * ordersArr[j].quantity
                sum.push(ordersArr[i].price, ordersArr[j].price)
                
            }
            // console.log(ordersArr[i].price)
            
        }
        console.log(sum)
    }
}
htmlBlockTablesFormation(getListTables(), getListCurrentOrders())


