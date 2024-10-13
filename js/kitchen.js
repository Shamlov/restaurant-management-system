const app = document.querySelector('#app');  // удалить при переносе


import { changeCurrentOrders } from './data.js';
import { getListCurrentOrders } from './data.js';
let currentOrders = getListCurrentOrders()    // переменная в которой находиться весь массив текущих заказов

function getCurrentOrders() {
    currentOrders = getListCurrentOrders()
}
setInterval(()=>getCurrentOrders(), 2000)     // синхронизируем данные с удаленным хранилищем

function kitchen() {
    let kitchen = ` <div class="window-kitchen container-fluid canvas-color pb-1">

        <div class="top-menu-buttons menu-color p-1 mb-1 rounded">
            <button type="button" class="btn btn-primary me-3 ms-5 text-uppercase" id="update">Обновить</button>
            <a href="index.html" type="button" class="btn btn-primary me-3 ms-5 text-uppercase">Главная</a>
            <a href="stop-list.html" type="button" class="btn btn-primary me-3 text-uppercase">Стоп-лист</a>
            <a href="go-list.html" type="button" class="btn btn-primary text-uppercase">Гоу-лист</a>
        </div>

        <div class="list-cards" id="listCards">
            
        </div>
        `

    app.innerHTML = kitchen;
}
kitchen()


function duplicate(dataArr, dataEl) {    // поиск дубликата блюд
    let duplicate = false
    let count = -1
    for (let i = 0; i < dataArr.length; i++ ) {
        if(dataArr[i].nameDish == dataEl.nameDish && !dataArr[i].ready) {
            count ++
        }
    }
    if(count) {
        duplicate = true
    }
    return duplicate
}

const listCards = document.querySelector('#listCards')

function showListOrders(dataArr) {      //  показываем карточки с заказами
    for (let i = 0; i < dataArr.length; i++ ) {
        let duplicateIcon = `<img src="images/icons/copy.svg" class="chef-card icon"></img>`
        if(!duplicate(dataArr, dataArr[i])) {
            duplicateIcon = ''
        }
        // console.log(dataArr[i].ready)
        if(!dataArr[i].ready && !dataArr[i].cancel) {                   // в условии если готово или отмена тогда карточки не показываем
            listCards.insertAdjacentHTML( 'afterBegin' , 
                `<div class="order-card d-flex card-design my-1 p-1 rounded">
                    <div class="name-container w-100">
                        <div class="name fs-5 fw-bold">${dataArr[i].nameDish}&emsp;<span class="order-number">${dataArr[i].orderNumber}</span></div>
                        <div class="comment lh-1">${dataArr[i].comment}</div>
                    </div>
                    <div class="numerical-information px-3 d-flex flex-column justify-content-center">
                        <div class="servings-quantity fs-3 fw-bold text-nowrap">x ${dataArr[i].quantity}</div>
                        <div class="table-number fs-4">${dataArr[i].table}</div>
                    </div>
                    <div class="info-icon d-flex flex-column justify-content-center">
                        <img src="images/icons/info.svg" class="chef-card icon" data-id = ${dataArr[i].id}></img>
                        ${duplicateIcon}
                    </div>
                    <div class="card-button-block d-flex flex-column px-3 justify-content-center">
                        <button class="confirm btn btn-success mb-1 text-uppercase cookReadyBtn" type="button" data-uniqueOrderDishNumber= ${dataArr[i].uniqueOrderDishNumber}>Готов</button>
                        <button class="cancel btn btn-secondary text-uppercase cookCancelBtn" type="button" data-uniqueOrderDishNumber= ${dataArr[i].uniqueOrderDishNumber}>Отмена</button>
                    </div>
                </div>`
            )
        }
        // console.log(duplicate(dataArr, dataArr[i]))    // Проверка дубликата.
    }
}

// придумать, как ввести модальное окно  при клике на инонку рецепта???????????

showListOrders(currentOrders)

let update = document.querySelector('#update')
update.addEventListener('click', updatingOrderList)

setInterval(()=>updatingOrderList(), 2000)    // автообновление листа с заказами
function updatingOrderList() {                // функция обновления листа с заказами
    listCards.innerHTML = ''
    showListOrders(currentOrders)
}



listCards.addEventListener('click', sendingCookReady)   // прослушивание клика кнопки заказ приготовлен

function sendingCookReady(event) {
    if(!event.target.closest('.cookReadyBtn')) {
    return
    }
    console.log('готово')
    // тут при клиике готово меняем статус в массиве на готово
    for(let i = 0; i < currentOrders.length; i++ ) {    
        if(currentOrders[i].uniqueOrderDishNumber == (+event.target.dataset.uniqueorderdishnumber)) {
            currentOrders[i].ready = true
        }
    }
    event.target.closest('.order-card').classList.add('background-color-ready') // добавление цветовой маркировки при клике готово
}

listCards.addEventListener('click', sendingСookCancel)   // прослушивание клика кнопки заказ отменен
function sendingСookCancel(event) {
    if(!event.target.closest('.cookCancelBtn')) {
        return
        }
    console.log('Отмена')
        // тут при клиике готово меняем статус в массиве на отмена
    for(let i = 0; i < currentOrders.length; i++ ) {    
        if(currentOrders[i].uniqueOrderDishNumber == (+event.target.dataset.uniqueorderdishnumber)) {
            currentOrders[i].cancel = true
        }
    }
    event.target.closest('.order-card').classList.add('cancel-background-color')
    event.target.closest('.order-card') = ''
}



// // Генерация номера заказа   (+ добавить уникальный индекс)
// function generationOrderNumber() {
//     let time = new Date 
//     /////// не могу написать регулярку одним заходом
//     let regexp1 = /\D/gi;
//     let rez = time.toTimeString().replace(regexp1, '');
//     let regexp2 = /^.{6}/gi;
//     return rez.match(regexp2)[0]
// }

// // Генерация времени заказа
// function timeOrger() {
//     var currentdate = new Date(); 
//     return ((currentdate.getHours() < 10)?"0":"") + currentdate.getHours() +":"+ ((currentdate.getMinutes() < 10)?"0":"") + currentdate.getMinutes() +":"+ ((currentdate.getSeconds() < 10)?"0":"") + currentdate.getSeconds();
// }    

