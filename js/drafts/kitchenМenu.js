const app = document.querySelector('#app')

import { getListDishesMenu } from '/js/data.js';
//////////////////////////////

let ListDishesMenu = getListDishesMenu()   // не забыть обновлять при клике на кнопку обновить и по таймеру
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
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
        </select>
        <img src="/images/icons/listOrders.svg" class="chef-card icon ms-auto"></img>
    </div>
    <div class="kitchen-menu-block list-cards p-1 pt-5"></div>
</div>
`
app.innerHTML = headerKitchenМenu

console.log(ListDishesMenu)









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