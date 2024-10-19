let app = document.querySelector('#app')
import { getListCurrentOrders } from '../data.js';
///////////////////////////////////////

import { getListTables } from '../data.js'// в адресе убрать точку при переносе
import { changeCurrentOrders } from '../data.js'// в адресе убрать точку при переносе

let tableNam = 0
const adminStartHtml = `
    <div class="window-kitchen container-fluid canvas-color pb-1">
        <div class="top-menu-buttons menu-color p-1 mb-1 rounded d-flex">
            <button type="button" class="btn btn-primary p-0 me-sm-3 me-1 ms-sm-5 text-uppercase">Обновить</button>
            <button type="button" class="btn btn-primary p-0 me-sm-3 me-1 text-uppercase">Стоп-лист</button>
            <button type="button" class="btn btn-primary p-0 me-sm-3 text-uppercase">Гоу-лист</button>
            <p class="ms-auto px-4 fs-5">Администратор</p>
        </div>

        <div class="list-tables d-flex flex-wrap gap-2" id="lisTables"></div>

        <div>
            <div class="open-checks-container" id="openChecksContainer"></div>
            <div class="final-cost card-design" id="finalPrice"></div>
    
            <div class="button-block">
                <button type="button" class="btn btn-success" id="btnCloseCheck">Закрыть чек</button>
            </div>
        </div>
    </div>
`
app.innerHTML = adminStartHtml

const lisTables = document.querySelector('#lisTables')
// 

// дополнительно ввести и принимать в функцию данные о заказах
function htmlBlockTablesFormation(dataArr) {
    lisTables.innerHTML = ''
    for(let i = 0; i < dataArr.length; i++) {
        let sum = sumorderAmountTable(dataArr[i].number)
        lisTables.insertAdjacentHTML('beforeEnd', `
            <div class="table text-center" data-table = ${dataArr[i].number}>
                <p>стол ${dataArr[i].number}</p>
                <p>${sum? sum +' р.' : 'чеков нет'}</p>
            </div>
            `
        )
    }
    
}
htmlBlockTablesFormation(getListTables())

function sumorderAmountTable(tableNumber) {      // принимает номер столика и возвращает сумму всех чеков по этому столику 
    return getListCurrentOrders()
        .filter(x => x.table === tableNumber)
        .reduce((a, x) => a + x.price * x.quantity, 0);
}



// цветовая маркировка выбранного столика
const finalPriceEl = document.querySelector('#finalPrice')
lisTables.addEventListener('click', userTableSelection)  



function userTableSelection(event) {    // показ итоговой стоимости заказанных товаров внизу ИТОГО
    if(!event.target.closest('.table')) {
        return
    }
    // добавляем цветовую маркировку блокам с выбранным столиком 
    let arr = event.currentTarget.children
    for(let el of arr) {
        el.classList.remove('active-table')
    }
    event.target.closest('.table').classList.add('active-table')

    finalPrice(event.target.closest('.table').dataset.table)  //передаем в функцию показа стоимости номер выбранного столика
    showTableReceiptList(event.target.closest('.table').dataset.table)   //передаем в функцию показа чеков номер выбранного столика
    tableNam = event.target.closest('.table').dataset.table
}

//формирование финальной цены
function finalPrice(table) {
    finalPriceEl.innerHTML = `
        <h4>Итого: <span class="d-inline-block ms-4 fw-bold">${sumorderAmountTable(+table)}<span> p.</span></span></h4>
    `
}

const openChecksContainer = document.querySelector('#openChecksContainer')
function showTableReceiptList(table) {
    openChecksContainer.innerHTML = ''
    let listCurrentOrders = getListCurrentOrders()
    // let arrListCurrentOrders = []
    let elText =''
    // let elComment =''
    listCurrentOrders.forEach((el) => {
        
        if(el.table == table) {
            elText += `<p class="mb-0">${el.nameDish}<span class="d-inline-block ms-4 fw-bold"><span>${el.quantity} шт.</span>&emsp;<span>${el.teme}</span>&emsp;<span>${el.price * el.quantity} р.</span></span></p>`
        }
        
    })

    openChecksContainer.insertAdjacentHTML('afterBegin', `
        <div class="open-checks card-design">
            <h2 class="fs-4 border-bottom  border-black">Открытый чек столика N ${table}</h2>
            ${elText}
        </div>
    `)
}


function removeTableData(table) {     // Удаление из объекта заказа с выбранным столиком
    console.log(getListCurrentOrders())
    let listCurrentOrders = getListCurrentOrders()
    let newListCurrentOrders = []
    listCurrentOrders.forEach((el) => {
        if( !(el.table == table)) {
            newListCurrentOrders.push(el)
        }
    })
    changeCurrentOrders(newListCurrentOrders)
    console.log(getListCurrentOrders())
}


let btnCloseCheck = document.querySelector('#btnCloseCheck')
btnCloseCheck.addEventListener('click', deleteOrder)

function deleteOrder() {
    removeTableData(tableNam)
    colorMarkingClosedCheck()
    htmlBlockTablesFormation(getListTables())
}

function colorMarkingClosedCheck() {    // цветовая маркировка закрытого чека
    let openChecks = document.querySelectorAll('.open-checks > p')
    openChecks.forEach((el) => {
        el.classList.add('closed-check')
    })
}