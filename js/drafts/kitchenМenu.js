const app = document.querySelector('#app')

import { getListTables } from '/js/data.js';
import { getListDishesMenu } from '/js/data.js';
import { getRestaurantMenuCategories } from '/js/data.js';
import { getListCurrentOrders } from '/js/data.js';
import { changeCurrentOrders } from '/js/data.js';

//////////////////////////////

function listTables() {
    let listTables = ''
    getListTables().forEach((el, index) => {
        listTables += ` <option value="${el.number}">${el.number} ${el.description}</option>`
    }) 
    return listTables
}


let listDishesMenu = getListDishesMenu()   // не забыть обновлять при клике на кнопку обновить и по таймеру
let restaurantMenuCategories = getRestaurantMenuCategories()
const intermediateOrder = []    // массив промежуточного заказа
let headerKitchenМenu = `
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Шашлык по-кавказски из свинины с луком</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body">
                <p>Невероятный аромат и вкус шашлыка у многих ассоциируется с весенне-летней порой. Это блюдо неизменно связано с кавказской кухней. Считается, что именно представители Кавказа разбираются в том, как мариновать и как готовить мясо. состав: свинина, лук, специи , 1000 ККал</p>
            </div>
        </div>
    </div>
    </div>
</div>

<div class="kitchen-menu container-fluid canvas-color pb-1 p-0">
    <div class="top-menu-buttons menu-color p-1 mb-1 rounded d-flex p-0  position-fixed w-100">
        <button type="button" class="btn btn-primary me-3 ms-1 text-uppercase" id="update">Обновить</button>
        <button type="button" class="btn btn-primary text-uppercase me-3" id="homePageBtn">На главную</button>
        <div class="dropdown p-0 me-sm-3 me-1">
            <button class="btn btn-secondary dropdown-toggle text-uppercase" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Меню
            </button>
            <ul class="dropdown-menu">
                <li><span class="dropdown-item" href="#">Холодные закуски</span></li>
                <li><span class="dropdown-item" href="#">Горячие закуски</span></li>
                <li><span class="dropdown-item" href="#">Салаты</span></li>
                <li><span class="dropdown-item" href="#">Супы</span></li>
            </ul>
        </div>
        <select id="inputState" class="table form-select p-1 w-25 mb-0">
            <option selected>Выбранный столик</option>
            ${listTables()}
        </select>
        <img src="/images/icons/listOrders.svg" class="chef-card icon ms-auto"></img>
    </div>
    <div class="kitchen-menu-block list-cards p-1 pt-5" id="kitchenMenuBlock"></div>
</div>
`
app.innerHTML = headerKitchenМenu
const kitchenMenuBlock = document.querySelector('#kitchenMenuBlock')


function showMenuCategories(categories) {     // категории заполняются автоматически из массива
    categories.forEach((el, index) => {
        kitchenMenuBlock.insertAdjacentHTML('afterBegin', `
                <div class="menu-category">
                    <h4>${el}</h4>
                </div>
            `)
    });

    for(let i = 0; i < listDishesMenu.length; i++ )  { 
        showMenuCards(listDishesMenu[i])                           //как только категории основного экрана заполнены ,  вызываем функцию показа карточек которые есть в массиве
    }
}

showMenuCategories(restaurantMenuCategories)


function showMenuCards(data) {
    const menuCategory = document.getElementsByClassName('menu-category')
    for(let i = 0; i < menuCategory.length; i++) {
        // console.log(menuCategory[i].firstElementChild.textContent)
        let statusList = ''
        if(menuCategory[i].firstElementChild.textContent == data.category) {
            if(data.stop) {
                statusList = 'stop-list'
            }
            if(data.go) {
                statusList = 'go-list'
            }
            menuCategory[i].insertAdjacentHTML('afterEnd',    //  afterEnd
            `
                <div class="order-card d-flex card-design my-1 p-1 rounded ${statusList}" data-id="${data.id}">
                    <div class="name-container w-100">
                        <div class="name fs-5 fw-bold lh-1">${data.nameDish}</div>
                        <div class="comment lh-1" data-bs-toggle="modal" data-bs-target="#exampleModal">${data.description}</div>
                    </div>
                    <div class="card-button-block d-flex flex-column px-3 justify-content-center">
                        <button class="confirm price-button btn btn-success mb-1 p-0 fs-5" type="button" >${data.price}</button>
                        <select id="inputState" class="form-select p-1">
                            <option selected value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="false">*</option>
                        </select>
                    </div>
                </div>
            `
            )
        }
    }
}

kitchenMenuBlock.addEventListener('click', clickAddButton )

function clickAddButton(event) {     // клик и получение данных при клике на кнопку с ценой
    if(!(event.target.closest('button'))) {
        return
    }
    writeDataIntermediateArray(event.target.closest('.order-card').dataset.id, event.target.closest('.order-card').lastElementChild.lastElementChild.value )
    //console.log(event.target.closest('.order-card').dataset.id)   // получили ID блюда меню
    // console.log(event.target.closest('.order-card').lastElementChild.lastElementChild.value )   // получили колличество блюда меню
}

function writeDataIntermediateArray(sId, quantity) {
    let obj = listDishesMenu.find(el => el.id == sId)      // находим объект в массиве по id
    obj.quantity = +quantity
    // console.log(obj)
    intermediateOrder.push(obj)
    console.log(intermediateOrder)   //  получили обект промежуточного заказа
}











// Генерация номера заказа
function generationOrderNumber() {
    let time = new Date 
    /////// не могу написать регулярку одним заходом
    let regexp1 = /\D/gi;
    let rez = time.toTimeString().replace(regexp1, '');
    let regexp2 = /^.{6}/gi;
    return rez.match(regexp2)[0]
}

// Генерация времени заказа
function timeOrger() {
    var currentdate = new Date(); 
    return ((currentdate.getHours() < 10)?"0":"") + currentdate.getHours() +":"+ ((currentdate.getMinutes() < 10)?"0":"") + currentdate.getMinutes() +":"+ ((currentdate.getSeconds() < 10)?"0":"") + currentdate.getSeconds();
}    

// console.log(12345)