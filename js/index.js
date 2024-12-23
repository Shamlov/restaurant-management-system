const app = document.querySelector('#app');

import { getRestaurantMenuCategories } from './data.js'
import { changeListDishesMenu } from './data.js'
import { getListDishesMenu } from './data.js'
import { getListTables } from './data.js'

homePage()     // Запуск стартовой страницы 

//  Стартовая страница  ----->>>>>      /////////////////////////////////////////////////////////

function homePage() {  
    let homePage = `
    <div class="home-page general-style" >
        <h1 class="p-3 text-center">Cистема управления и автоматизации работы общепита</h1>
        <p class="fs-4 px-3 text-center">Выбери пункт меню</p>
        <div class="selection-block px-4 mx-5" id="selectionBlockHome">
            <h2 class="fs-3 fw-bold p-1" id="adminStart">Администратор</h2>
            <h2 class="fs-3 fw-bold p-1" id="kitchenStart">Кухня</h2>
            <h2 class="fs-3 fw-bold p-1" id="waiter1Start">Официант N 1</h2>
            <h2 class="fs-3 fw-bold p-1" id="waiter2Start">Официант дополнительно</h2>
            <h2 class="fs-3 fw-bold p-1" id="editingMenuStart">Страиница редактирования меню</h2>
            <h2 class="fs-3 fw-bold p-1">Складской учет</h2>
            <h2 class="fs-3 fw-bold p-1">История заказов</h2>
            <h2 class="fs-3 fw-bold p-1">Книга знаний</h2>
        </div>
    </div>
    `;

    app.innerHTML = homePage;      

    const selectionBlockHome = document.querySelector('#selectionBlockHome')    
    selectionBlockHome.addEventListener('click', homeMenuSelection)             
    function homeMenuSelection(event) {                                
        if(event.target.closest('#adminStart')) {              
            adminPage()        
        }
        if(event.target.closest('#kitchenStart')) {       
            kitchen()         
        }
        if(event.target.closest('#waiter1Start')) {
            kitchenМenu()
        }
        if(event.target.closest('#waiter2Start')) {
            alert ("Для подключения дополнительного сторудника, обратитесь к разработчику")
        }
        if(event.target.closest('#editingMenuStart')) {
            editingMenu()
        }
    }
}

//////////////////////////////////////// Стартовая страница   <<<----

// окно администратора ---->>>                  ////////////////////////////////////////////////////////

function adminPage() {

    let tableNam = 0
    const adminStartHtml = `
        <div class="window-kitchen pb-1 general-style">
            <div class="top-menu-buttons header  p-1 mb-1 d-flex ">
                <button type="button" class="btn text-uppercase me-3 ms-5" id="update">Обновить</button>
                <button type="button" class="btn text-uppercase me-3" id="homePageBtn">На главную</button>
                <button type="button" class="btn text-uppercase me-3" id="stopListBtn">Стоп-лист</button>
                <button type="button" class="btn text-uppercase me-3" id="goListListBtn">Гоу-лист</button>
                <p class="ms-auto px-4 fs-5">Администратор</p>
            </div>
    
            <div class="list-tables d-flex flex-wrap gap-2" id="lisTables"></div>
    
            <div>
                <div class="open-checks-container" id="openChecksContainer"></div>
                <div class="final-cost card-design" id="finalPrice"></div>
        
                <div class="button-block">
                    <button type="button" class="btn my-btn" id="btnCloseCheck">Закрыть чек</button>
                </div>
            </div>
        </div>
    `
    app.innerHTML = adminStartHtml    
    
    let update = document.querySelector('#update')
    update.addEventListener('click', adminPage)       

    const homePageBtn = document.querySelector('#homePageBtn')
    homePageBtn.addEventListener('click', homePage)

    let stopListBtn = document.querySelector('#stopListBtn')
    stopListBtn.addEventListener('click', stopList )

    let goListListBtn = document.querySelector('#goListListBtn')
    goListListBtn.addEventListener('click', goList )
    

    const lisTables = document.querySelector('#lisTables')
    
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
    
    function sumorderAmountTable(tableNumber) {      
        return getListCurrentOrders()
            .filter(x => x.table === tableNumber)
            .reduce((a, x) => a + x.price * x.quantity, 0);
    }
    
    function issuedSumorderAmountTable(tableNumber) {     
            return getListCurrentOrders()
            .filter(x => (x.table === tableNumber) && x.issued)
            .reduce((a, x) => a + x.price * x.quantity, 0);
    }

    const finalPriceEl = document.querySelector('#finalPrice')
    lisTables.addEventListener('click', userTableSelection)  
    
    
    
    function userTableSelection(event) {    
        if(!event.target.closest('.table')) {
            return
        }

        let arr = event.currentTarget.children
        for(let el of arr) {
            el.classList.remove('active-table')
        }
        event.target.closest('.table').classList.add('active-table')
    
        finalPrice(event.target.closest('.table').dataset.table)
        showTableReceiptList(event.target.closest('.table').dataset.table)
        tableNam = event.target.closest('.table').dataset.table
    }
    

    function finalPrice(table) {
        finalPriceEl.innerHTML = `
            <h4>Итого: <span class="d-inline-block ms-4 fw-bold">${issuedSumorderAmountTable(+table)}<span> p.</span></span></h4>
        `
    }
    
    const openChecksContainer = document.querySelector('#openChecksContainer')
    function showTableReceiptList(table) {
        openChecksContainer.innerHTML = ''
        let listCurrentOrders = getListCurrentOrders()
        let elText =''
        listCurrentOrders.forEach((el) => {
            if(el.table == table) {
                let status = ''
                if(el.cancel){
                    status = 'cancel'
                }
                elText += `<p class="mb-0 dish-line ${status}"><span>${showLogoStatusDish(el)}</span>${el.nameDish}<span class="d-inline-block ms-4 fw-bold"><span>${el.quantity} шт.</span>&emsp;<span>${el.time}</span>&emsp;<span>${el.price * el.quantity} р.</span></span></p>`
            }
            
        })
    
        openChecksContainer.insertAdjacentHTML('afterBegin', `
            <div class="open-checks card-design">
                <h2 class="fs-4 border-bottom  border-black">Открытый чек столика N ${table}</h2>
                ${elText}
            </div>
        `)
    }
    
    
    function removeTableData(table) {    
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
    
    function colorMarkingClosedCheck() {
        let openChecks = document.querySelectorAll('.open-checks > p')
        openChecks.forEach((el) => {
            el.classList.add('closed-check')
        })
    }

    
    

}

import { changeCurrentOrders } from './data.js';
import { getListCurrentOrders } from './data.js';

function kitchen() {
    
    let currentOrders 

    function getCurrentOrders() {
        currentOrders = getListCurrentOrders()
    }
    getCurrentOrders()

    function kitchen() {

        let kitchen = ` 
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Заголовок модального окна</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                </div>
                <div class="modal-body" id="motalText">
                ...
                </div>
            </div>
            </div>
        </div>


            <div class="window-kitchen general-style pb-1">
                <div class="top-menu-buttons header p-1 mb-1 d-flex ">
                    <button type="button" class="btn text-uppercase me-3 ms-5" id="update">Обновить</button>
                    <button type="button" class="btn text-uppercase me-3" id="homePageBtn">На главную</button>
                    <button type="button" class="btn text-uppercase me-3" id="stopListBtn">Стоп-лист</button>
                    <button type="button" class="btn text-uppercase me-3" id="goListListBtn">Гоу-лист</button>
                    <p class="ms-auto px-4 fs-5">Кухня</p>
                </div>

                <div class="list-cards" id="listCards"></div>
                
            </div>
        `

        app.innerHTML = kitchen;
        
    }
    kitchen()
    


    const homePageBtn = document.querySelector('#homePageBtn')
    homePageBtn.addEventListener('click', homePage) 

    let stopListBtn = document.querySelector('#stopListBtn')
    stopListBtn.addEventListener('click', stopList )

    let goListListBtn = document.querySelector('#goListListBtn')
    goListListBtn.addEventListener('click', goList )


    function duplicate(dataArr, dataEl) { 
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

    function showListOrders(dataArr) {
        for (let i = 0; i < dataArr.length; i++ ) {
            let duplicateIcon = `<img src="images/icons/copy.svg" class="chef-card icon"></img>`
            if(!duplicate(dataArr, dataArr[i])) {
                duplicateIcon = ''
            }

            if(!dataArr[i].ready && !dataArr[i].cancel) {   
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
                            <img src="images/icons/info.svg" class="chef-card icon chef-card-btn" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id = ${dataArr[i].id} ></img>
                            ${duplicateIcon}
                        </div>
                        <div class="card-button-block d-flex flex-column px-3 justify-content-center">
                            <button class="confirm btn mb-1 text-uppercase cookReadyBtn" type="button" data-idDish= ${dataArr[i].idDish}>Готов</button>
                            <button class="cancel btn text-uppercase cookCancelBtn" type="button" data-idDish= ${dataArr[i].idDish}>Отмена</button>
                        </div>
                    </div>`
                )
            }
        }
    }


    showListOrders(currentOrders)

    let update = document.querySelector('#update')
    update.addEventListener('click', updatingOrderList)

    function updatingOrderList() {       
        listCards.innerHTML = ''
        showListOrders(currentOrders)
    }

    listCards.addEventListener('click', infoBtnGo)
    function infoBtnGo(event) {
        if(!event.target.closest('.chef-card-btn')) {
            return
        }
        function updateModalContent (title, text) {
            document.querySelector('#exampleModalLabel').innerText = title
            document.querySelector('#motalText').innerText = text
        }
        console.log(+event.target.dataset.id)
        for(let i = 0; i < currentOrders.length; i++) {
            if(+event.target.dataset.id == currentOrders[i].id) {
                updateModalContent(currentOrders[i].nameDish, currentOrders[i].recipe)
            }
        }
    }


    listCards.addEventListener('click', sendingCookReady)

    function sendingCookReady(event) {
        if(!event.target.closest('.cookReadyBtn')) {
        return
        }

        for(let i = 0; i < currentOrders.length; i++ ) { 
            if(+currentOrders[i].idDish == +event.target.dataset.iddish) {
                currentOrders[i].ready = true
                changeCurrentOrders(currentOrders)
            }
        }
        event.target.closest('.order-card').classList.add('background-color-ready')
    }

    listCards.addEventListener('click', sendingСookCancel)
    function sendingСookCancel(event) {
        if(!event.target.closest('.cookCancelBtn')) {
            return
            }

        for(let i = 0; i < currentOrders.length; i++ ) {    
                if(+currentOrders[i].idDish == +event.target.dataset.iddish) {
                currentOrders[i].cancel = true
            }
        }
        getCurrentOrders()
        event.target.closest('.order-card').classList.add('cancel-background-color')
        setTimeout(()=>event.target.closest('.order-card').remove(), 2000)
        
    }
}

////////////////////////////////////////////////////////////////////////////////////////
// Страница официанта

let intermediateOrder = [] 
function kitchenМenu() {        
    function listTables() { 
        let listTables = ''
        getListTables().forEach((el, index) => {
            listTables += ` <option value="${el.number}">${el.number} ${el.description}</option>`
        }) 
        return listTables
    }
    
    let listDishesMenu = getListDishesMenu()  
    let restaurantMenuCategories = getRestaurantMenuCategories()  
    let headerKitchenМenu = `
    <div class="kitchen-menu general-style pb-1">
        <div class="top-menu-buttons header p-1 mb-1 d-flex">
            <button type="button" class="btn me-3 ms-1 text-uppercase" id="update">Обновить</button>
            <button type="button" class="btn text-uppercase me-3" id="homePageBtn">На главную</button>
            <button type="button" class="btn text-uppercase me-3" id="issuanceBtn">Выдача</button>
            <select id="selectedTable" class="table form-select p-1 w-25 mb-0">
                <option selected value='0'>Выбранный столик</option>
                ${listTables()} 
            </select>
            <p class="ms-auto px-4 fs-5">Официант</p>
            <img src="/images/icons/listOrders.svg" class="chef-card icon ms-auto" id="orderReceiptButton"></img>
        </div>
        <div class="kitchen-menu-block list-cards p-1" id="kitchenMenuBlock"></div>
    </div>
    `
    app.innerHTML = headerKitchenМenu
    const kitchenMenuBlock = document.querySelector('#kitchenMenuBlock')
    const homePageBtn = document.querySelector('#homePageBtn')
    homePageBtn.addEventListener('click', homePage)
    issuanceBtn.addEventListener('click', issuance) 

    function showMenuCategories(categories) {
        categories.forEach((el, index) => {
            kitchenMenuBlock.insertAdjacentHTML('afterBegin', `
                    <div class="menu-category">
                        <h4>${el}</h4>
                    </div>
                `)
        });
    
        for(let i = 0; i < listDishesMenu.length; i++ )  { 
            showMenuCards(listDishesMenu[i])                           
        }
    }
    
    showMenuCategories(restaurantMenuCategories)
    
    function showMenuCards(data) { 
        const menuCategory = document.getElementsByClassName('menu-category')
        for(let i = 0; i < menuCategory.length; i++) {
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
                    <div class="order-card d-flex card-design ms-2 my-1 p-1 rounded ${statusList}" data-id="${data.id}">
                        <div class="name-container w-100">
                            <div class="name fs-5 fw-bold lh-1">${data.nameDish}</div>
                            <div class="comment lh-1" data-bs-toggle="modal" data-bs-target="#exampleModal">${data.description}</div>
                        </div>
                        <div class="card-button-block d-flex flex-column px-3 justify-content-center">
                            <button class="confirm price-button btn mb-1 p-0 fs-5" type="button" >${data.price}</button>
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
    
    function clickAddButton(event) {  
        if(!(event.target.closest('button'))) {
            return
        }
        writeDataIntermediateArray(event.target.closest('.order-card').dataset.id, event.target.closest('.order-card').lastElementChild.lastElementChild.value )
    }
    
    function writeDataIntermediateArray(sId, quantity) {
        let obj = listDishesMenu.find(el => el.id == sId)
        obj = {...obj}
        obj.quantity = +quantity
        intermediateOrder.push(obj)
    }

    const orderReceiptButton = document.querySelector("#orderReceiptButton")
    function selectedTable () {
        const selectedTableBtn = document.querySelector("#selectedTable")
        if(!(+selectedTableBtn.value)) {
            alert('Столик не выбран')
        }
        if(+selectedTableBtn.value) {
        intermediateOrder.unshift(+selectedTableBtn.value)
        
        addingOrder1()
        }
    }
    orderReceiptButton.addEventListener('click', selectedTable)
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////

function editingMenu() {      // страница редактирования меню
    let sditingMenu = `                      
<!-- Модальное окно -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 text-uppercase" id="exampleModalLabel">Добавить / изменить</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
            </div>
            <div class="modal-body">

                <div class="d-flex justify-content-between me-2">
                    <select class="form-select" id="elementRestaurantMenuCategories">
                        <option selected disabled>Откройте это меню выбора</option>
                    </select>
                    <input type="number" min="0" class="form-control ms-3" placeholder="Стоимость" id="price">
                </div>

                <p class="mb-0">Название блюда</p>
                <textarea class="form-control" aria-label="С текстовым полем" id="nameDish"></textarea>
                <p class="mb-0">Краткое описание</p>
                <textarea class="form-control" aria-label="С текстовым полем" id="description"></textarea>
                <p class="mb-0">Карта для кухни</p>
                <textarea class="form-control" aria-label="С текстовым полем" id="recipe"></textarea>
            </div>
            <div class="modal-footer" id="modalButtons">
                <button type="button" class="btn modal-delete fw-bold" data-delete data-bs-dismiss="modal" id="deleteBtn">Удалить</button>
                <button type="button" class="btn modal-close fw-bold" data-close data-bs-dismiss="modal" id="cancelBtn">Закрыть</button>
                <button type="button" class="btn modal-save fw-bold" data-save data-bs-dismiss="modal" id="saveBtn">Сохранить изменения</button>
            </div>
        </div>
    </div>
</div>
<!-- ................ -->

<div class="kitchen-menu general-style pb-1 p-0">
    <div class="top-menu-buttons header p-1 mb-1 d-flex p-1 mb-1">
        <button type="button" class="btn me-3 ms-1 text-uppercase" id="homePageBtn">На главную</button>
        <div class="dropdown p-0 me-sm-3 me-1">
            <button class="btn dropdown-toggle text-uppercase h-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Меню
            </button>
            <ul class="dropdown-menu" id="restaurantCategoriesTopMenu"></ul>
        </div>
        <button class="edit btn me-3 ms-1 text-uppercase" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Добавить</button>
        <p class="ms-auto px-4 fs-5">Редактирование</p>
    </div>
        
    <div class="kitchen-menu-block list-cards p-1" id="menuCategories"></div>
</div>
`
    app.innerHTML = sditingMenu;

    const elementRestaurantMenuCategoriesModal = document.querySelector('#elementRestaurantMenuCategories')
    const restaurantCategoriesTopMenu = document.querySelector('#restaurantCategoriesTopMenu')
    const modalButtons = document.querySelector('#modalButtons')
    const menuCategories = document.querySelector('#menuCategories') 
    const homePageBtn = document.querySelector('#homePageBtn')

    homePageBtn.addEventListener('click', homePage)  

    modalButtons.addEventListener('click', modalButtonsClickSelect)   
    
    function modalButtonsClickSelect(event) { 
        if(event.target.hasAttribute('data-delete')) {
        }
        if(event.target.hasAttribute('data-close')) {
        }
        if(event.target.hasAttribute('data-save')) {
            getDataFormChangeDish ()  
        }
    }
    

    async function requestListCtegories() {       
        restaurantMenuCategoriesUpdateModal(getRestaurantMenuCategories())       
        restaurantMenuCategoriesUpdateTopMenu(getRestaurantMenuCategories())      
        showMenuCategories(getRestaurantMenuCategories())   
    }
    requestListCtegories()   
    
    function restaurantMenuCategoriesUpdateModal(data) {  
        data.forEach((el, index) => {
            elementRestaurantMenuCategoriesModal.insertAdjacentHTML('beforeEnd',`<option value="${el}">${el}</option>`)
        });
    }
    
    function restaurantMenuCategoriesUpdateTopMenu(data) {           // функция обновления выпадающего списка в верхнем меню с категориями меню 
        data.forEach((el, index) => {
            restaurantCategoriesTopMenu.insertAdjacentHTML('beforeEnd',`<li><span class="dropdown-item" href="#">${el}</span></li>`)
        });
    }
    
    class dishСard {  
        id = getListDishesMenu().length + 1
        stop = false
        go = false
        constructor(category, price, nameDish, description, recipe, catrgoryIndex) {
            this.category = category
            this.price = price
            this.nameDish = nameDish
            this.description = description
            this.recipe = recipe
        }
    }
    const price = document.querySelector('#price')
    const nameDish = document.querySelector('#nameDish')
    const description = document.querySelector('#description')
    const recipe = document.querySelector('#recipe')
    function getDataFormChangeDish () { 
        let data = new dishСard(elementRestaurantMenuCategoriesModal.value, price.value, nameDish.value, description.value, recipe.value,)
        sendDataServer(data)
    }
    
    async function sendDataServer(data) { 
        let listDishesMenu = getListDishesMenu()
        listDishesMenu.push(data)
        changeListDishesMenu(listDishesMenu)
        showMenuCards(data)
        clearModal()
    }

    
    function showMenuCategories(categories) {  
        categories.forEach((el, index) => {
            menuCategories.insertAdjacentHTML('afterBegin', `<div class="menu-category"><h4 class="menuCategory d-inline-block">${el}</h4></div>`)
        });
    
        for(let i = 0; i < getListDishesMenu().length; i++ )  { 
            showMenuCards(getListDishesMenu()[i])  
        }
    }
    
    function showMenuCards(data) {
        const menuCategory = document.getElementsByClassName('menuCategory')
        for(let i = 0; i < menuCategory.length; i++) {
            if(menuCategory[i].textContent == data.category) {
                menuCategory[i].insertAdjacentHTML('afterEnd',    //  afterEnd
                    `<div class="order-card d-flex card-design my-1 p-1 rounded" data-id = ${data.id}>
                        <div class="name-container w-100">
                            <div class="name fs-5 fw-bold lh-1">${data.nameDish}<span class="ms-5">${data.price} р.</span></div>
                            <div class="comment lh-1">${data.description}</div>
                            <div class="comment lh-1">${data.recipe}</div>
                        </div>
                        <div class="card-button-block d-flex flex-column px-3 justify-content-center">
                            <button class="edit btn modal-save mb-1 p-1 fs-5" type="button" data-id = ${data.id} data-bs-toggle="modal" data-bs-target="#exampleModal">Редактировать</button>
                        </div>
                    </div>`
                )
            }
        }
    }
    
    menuCategories.addEventListener('click', editSingleElement)
    function editSingleElement(event) {
        let ListDishesMenu = getListDishesMenu()
        for(let i = 0; i < ListDishesMenu.length; i++) {
            if(+event.target.dataset.id == ListDishesMenu[i].id) {
            price.value = +ListDishesMenu[i].price
            nameDish.innerText = ListDishesMenu[i].nameDish
            description.innerText = ListDishesMenu[i].description
            recipe.innerText = ListDishesMenu[i].recipe
            }
        }
    }
    
    function clearModal() { 
        // тут вписать код очистки модального окна
    }
}

///  меню стоп-лист
function stopList() {
    let stopListHeader = `    
    <div class="window-kitchen general-style pb-1">
        <div class="top-menu-buttons header p-1 mb-1 d-flex">
            <button type="button" class="btn me-3 ms-2 text-uppercase " id="backBtnStopList">Администратор</button>
            <button type="button" class="btn me-3  text-uppercase " id="backBtnStopList1">Кухня</button>
            <button type="button" class="btn me-3 ms-5 text-uppercase" id="saveBtn">Сохранить</button>
            <p class="ms-auto px-4 fs-5">Стоп-лист</p>
        </div>
        
        <div class="stop-list-block">
            <h4>Стоп-лист</h4>
            <div id="stopList"></div>
        </div>
    </div>
    `
    app.innerHTML = stopListHeader

    const stopList = document.querySelector('#stopList')

    const backBtnStopList = document.querySelector('#backBtnStopList');
    backBtnStopList.addEventListener('click', adminPage)
    const backBtnStopList1 = document.querySelector('#backBtnStopList1');
    backBtnStopList1.addEventListener('click', kitchen)

    async function requestListStopCategories() {                 
        insertStopCategoryList (getRestaurantMenuCategories())
    }
    requestListStopCategories()


    function insertStopCategoryList(categories) {                  
        categories.forEach((el) => {
            stopList.insertAdjacentHTML('beforeEnd', `<h5 class="menuCategoryCheckbox ms-2" value="${el}">${el}</h5>`)
        })

        for(let i = 0; i < getListDishesMenu().length; i++ )  { 
            showCheckboxList(getListDishesMenu()[i])                         
        }
    }


    function showCheckboxList(data) {
        let menuCategoryCheckbox = document.getElementsByClassName('menuCategoryCheckbox')
        for(let i = 0; i < menuCategoryCheckbox.length; i++) {
            if(menuCategoryCheckbox[i].textContent == data.category) {
                console.log(data.category)
                let choice = ""
                if(data.stop) {
                    choice = 'checked'
                }
                menuCategoryCheckbox[i].insertAdjacentHTML('beforeBegin', `
                    <div class="form-check ms-3">
                        <label class="form-check-label">
                            <input class="form-check-input inputChek" type="checkbox" value="${data.id}" ${choice}>
                            ${data.nameDish}
                        </label>
                    </div>
                    `
                    
                )
            }
        }
    }

    const saveBtn = document.querySelector("#saveBtn")

    saveBtn.addEventListener('click', overwriteData)

    async function overwriteData() {
        const inputChek = document.getElementsByClassName('inputChek')
        for(let i = 0; i < inputChek.length; i++) {         // в данном цикле идем без привязки к ID поэтому beforeBegin важен порядок . не меняем  menuCategoryCheckbox[i].insertAdjacentHTML('beforeBegin',
            if(inputChek[i].checked) {
                let listDishesMenu = getListDishesMenu()
                listDishesMenu[i].stop = true
                changeListDishesMenu(listDishesMenu)
            }
            if(!inputChek[i].checked) {
                let listDishesMenu = getListDishesMenu()
                listDishesMenu[i].stop = false
                changeListDishesMenu(listDishesMenu)
            }
        }
        
        console.log(getListDishesMenu(), 'проверяем внесенные изменения')
    }
}

/// Гоу- лист 
function goList() {
    let goListHeader = `
    <div class="window-kitchen general-style pb-1 ">
        <div class="top-menu-buttons header p-1 mb-1 d-flex ">
            <button type="button" class="btn me-3 ms-2 text-uppercase" id="backBtnGoList">Администратор</button>
            <button type="button" class="btn me-3 ms-2 text-uppercase"  id="backBtnGoList1">Кухня</button>
            <button type="button" class="btn me-3 ms-5 text-uppercase" id="saveBtn">Сохранить</button>
            <p class="ms-auto px-4 fs-5">Гоу-лист</p>
        </div>
        
        <div class="stop-list-block">
            <h4>Гоу-лист</h4>
            <div id="goList"></div>
        </div>
    </div>
    `
    app.innerHTML = goListHeader

    const goList = document.querySelector('#goList')

    const backBtnGoList = document.querySelector('#backBtnGoList');
    backBtnGoList.addEventListener('click', adminPage)

    const backBtnGoList1 = document.querySelector('#backBtnGoList1');
    backBtnGoList1.addEventListener('click', kitchen)

    async function requestListGoCategories() {
        insertGoCategoryList(getRestaurantMenuCategories())
    }
    requestListGoCategories()


    function insertGoCategoryList(categories) {
        categories.forEach((el) => {
            goList.insertAdjacentHTML('beforeEnd', `<h5 class="menuCategoryCheckbox ms-2" value="${el}">${el}</h5>`)
        })

        for(let i = 0; i < getListDishesMenu().length; i++ )  { 
            showCheckboxList(getListDishesMenu()[i])                           
        }
    }

    function showCheckboxList(data) {
        let menuCategoryCheckbox = document.getElementsByClassName('menuCategoryCheckbox')
        for(let i = 0; i < menuCategoryCheckbox.length; i++) {
            if(menuCategoryCheckbox[i].textContent == data.category) {
                let choice = ""
                if(data.go) {
                    choice = 'checked'
                }
                menuCategoryCheckbox[i].insertAdjacentHTML('beforeBegin', `
                    <div class="form-check ms-3">
                        <label class="form-check-label">
                            <input class="form-check-input inputChek" type="checkbox" value="${data.id}" ${choice}>
                            ${data.nameDish}
                        </label>
                    </div>
                    `
                    
                )
            }
        }
    }

    const saveBtn = document.querySelector("#saveBtn")
    saveBtn.addEventListener('click', overwriteData)
    async function overwriteData() {
        const inputChek = document.getElementsByClassName('inputChek')
        for(let i = 0; i < inputChek.length; i++) {         // в данном цикле идем без привязки к ID поэтому beforeBegin важен порядок . не меняем  menuCategoryCheckbox[i].insertAdjacentHTML('beforeBegin',
            if(inputChek[i].checked) {
                let listDishesMenu = getListDishesMenu()
                listDishesMenu[i].go = true
                changeListDishesMenu(listDishesMenu)
            }
            if(!inputChek[i].checked) {
                let listDishesMenu = getListDishesMenu()
                listDishesMenu[i].go = false
                changeListDishesMenu(listDishesMenu)
            }
        }
    }
}


function addingOrder1() {
    let addingOrderHtmlCode = `
        <div class="kitchen-menu general-style pb-1">

        <div class="top-menu-buttons p-1 mb-1 d-flex p-0 header ">
            <div class="dropdown p-0 me-sm-3 me-1 ">
                <button type="button" class="btn me-3 ms-1 text-uppercase" id="update">Обновить</button>
                <button type="button" class="btn text-uppercase me-3" id="homePageBtn">На главную</button>
            </div>
            <p class="align-self-center fw-bold">Столик ${intermediateOrder[0]}</p>
            <button class="btn ms-auto text-uppercase" id="confirmBtn">Верно</button>
        </div>

        <div class="adding-order pt-1 px-2" id="addingOrder"></div>

        <div class="price-block d-flex justify-content-end pe-4 fs-5 fw-bold">
            <span>Итого: &emsp;</span>
            <span>${sum(intermediateOrder)}</span>
            <span>&nbsp;руб.</span>
        </div>
    </div>
    `
    app.innerHTML = addingOrderHtmlCode
    let addingOrder = document.querySelector('#addingOrder')
    for(let i = 1; i < intermediateOrder.length; i++ ) {
        addingOrder.insertAdjacentHTML('beforeEnd', `
            <div class="product-line border-bottom my-2 border-2 border-black border-opacity-50" data-intermediateOrderId = ${i}>
                <div class="d-flex">
                    <div class="me-2">
                        <img class="icon" src="/images/icons/delete.svg" alt="">
                    </div>
                    <h4 class="me-auto pe-2 fs-5">${intermediateOrder[i].nameDish}</h4>
                    <span class="quantity fs-4 fw-bold pe-2">${intermediateOrder[i].quantity} <span> шт.</span></span>
                    <span class="price fs-4 fw-bold pe-2">${intermediateOrder[i].price} <span> р.</span></span>
                    <button class="btn-add-comment btn btn-primary btn-sm px-2 py-0" data-bs-toggle="modal" data-bs-target="#exampleModal">Комментарий</button>
                </div>
                <p class="commet mb-0">тут будет находиться ваш комментарий</p>
            </div>
        `)
    }

    const confirmBtn = document.querySelector('#confirmBtn')
    confirmBtn.addEventListener('click', lickConfirmButton)
    function lickConfirmButton() {
        writeOrdersArray(intermediateOrder)
        intermediateOrder = []
        kitchenМenu()                       
    }
}

function sum (arrOrder) {  
    let sum = 0
    for(let i = 1; i < arrOrder.length; i++) {
        sum += +arrOrder[i].price * +arrOrder[i].quantity
    }
    return sum
}

function writeOrdersArray(arrOrder) {  
    let time = timeOrger()
    let orderNumber = generationOrderNumber()
    for (let i = 1; i < arrOrder.length; i++) {
        arrOrder[i].time = time
        arrOrder[i].orderNumber = orderNumber
        arrOrder[i].table = arrOrder[0]
        arrOrder[i].ready = false
        arrOrder[i].cancel = false
        arrOrder[i].issued = false
        arrOrder[i].idDish = orderNumber + i
        arrOrder[i].comment = 'Ваш комментарий'
    }
    let currentOrders1 = getListCurrentOrders()

    arrOrder.shift() 
    let rezArr = currentOrders1.concat(arrOrder)
    changeCurrentOrders(rezArr)
    console.log(getListCurrentOrders())
    currentOrders1 = []
    intermediateOrder = []
    rezArr = []
}

function generationOrderNumber() {
    let time = new Date 
    let regexp1 = /\D/gi;
    let rez = time.toTimeString().replace(regexp1, '');
    let regexp2 = /^.{6}/gi;
    return rez.match(regexp2)[0]
}

function timeOrger() {
    var currentdate = new Date(); 
    return ((currentdate.getHours() < 10)?"0":"") + currentdate.getHours() +":"+ ((currentdate.getMinutes() < 10)?"0":"") + currentdate.getMinutes() +":"+ ((currentdate.getSeconds() < 10)?"0":"") + currentdate.getSeconds();
}    

function issuance() { 
    const issuanceStartHtml = `
        <div class="window-issuance general-style  pb-1">
    
            <div class="top-menu-buttons header p-1 mb-1 d-flex">
                <button type="button" class="btn p-1 ms-3   text-uppercase" id="update">Обновить</button>
                <button type="button" class="btn p-1 ms-3  text-uppercase" id="backBtn">Назад</button>
                <button type="button" class="btn p-1 ms-3  text-uppercase" id="homePageBtn">Домой</button>
                <p class="ms-auto px-4 fs-5">Выдача</p>
            </div>
    
            <div class="list-tables-issuance d-flex flex-wrap gap-2" id="listTablesIssuance"></div>
    
            <div class="open-checks-container" id="openChecksContainerIssuance"></div>
    
        </div>
    `
    
    app.innerHTML = issuanceStartHtml
    let update = document.querySelector('#update')
    update.addEventListener('click', issuance)  

    const homePageBtn = document.querySelector('#homePageBtn')
    homePageBtn.addEventListener('click', homePage) 

    const backBtn = document.querySelector('#backBtn')
    backBtn.addEventListener('click', kitchenМenu) 

    const listTablesIssuance = document.querySelector('#listTablesIssuance')
    function htmlBlockTablesFormation(dataArr) {
        listTablesIssuance.innerHTML = ''
        for(let i = 0; i < dataArr.length; i++) {
            let sum = sumorderAmountTable(dataArr[i].number)
            listTablesIssuance.insertAdjacentHTML('beforeEnd', `
                <div class="table text-center" data-table = ${dataArr[i].number}>
                    <p>стол ${dataArr[i].number}</p>
                    <p>${sum? sum +' р.' : 'чеков нет'}</p>
                </div>
                `
            )
        }
    }
    htmlBlockTablesFormation(getListTables())

    function sumorderAmountTable(tableNumber) {     
        return getListCurrentOrders()
            .filter(x => x.table === tableNumber)
            .reduce((a, x) => a + x.price * x.quantity, 0);
    }


    function colorCodingTablesCurrentWaiter(arrOrder)  { 
        let arrayActiveTables = []  
        arrOrder.forEach( (el) => {
            if (!arrayActiveTables.includes(el.table)) {
                arrayActiveTables.push(el.table);
            }
        })

        let table = document.getElementsByClassName('table') 
        
        for(let el of table) {  
            let active = arrayActiveTables.some((num) => {
                return num == +el.dataset.table
            })
            if(active) {
                el.classList.add('active-waiter-tables')
            }
        }
    }
    
    colorCodingTablesCurrentWaiter(getListCurrentOrders())

    function colorCodingSelectedTable(event) {           
        let arr = event.currentTarget.children
        for(let el of arr) {
            el.classList.remove('active-waiter-selection')
        }
        event.target.closest('.table').classList.add('active-waiter-selection')
    }

    const openChecksContainerIssuance = document.querySelector('#openChecksContainerIssuance')
    function showCurrentOrders(currentOrdersArr, numTable) {     
        openChecksContainerIssuance.innerHTML = ''
        let elText =''
        currentOrdersArr.forEach((el) => {
            if(el.table == numTable) {
                let btnGiveOut = !el.issued && el.ready  ? `<button type="button" class="btn btn-success btn-sm">Выдать</button>` : ''    // это кнопка выдать
                let cancel = el.cancel ? 'cancel' : ''
                elText += `<p class="mb-0 ${cancel}" data-idDish = ${el.idDish}><span>${showLogoStatusDish(el)}</span> ${el.nameDish}<span class="d-inline-block ms-4 fw-bold"><span> ${el.quantity} шт.</span>&emsp;<span>${el.time}</span>&emsp;<span>${el.price * el.quantity} р.</span></span> ${btnGiveOut}</p>`

            }
        }
        )
        openChecksContainerIssuance.insertAdjacentHTML('beforeend' , `
            <div class="open-checks card-design">
                <h2 class="fs-4 border-bottom  border-black">Открытый чек столика N <span>${numTable}</span></h2>
                ${elText}
            </div>
        `)

    }

    function showLogoStatusDish(el) { 
        let htmlImg = `<img src="images/icons/cook.png" class="chef-card icon ms-2"></img>`
        if(el.ready) {
            htmlImg = `<img src="images/icons/ready-meal.png" class="chef-card icon ms-2"></img>`
        }
        if(el.issued) {
            htmlImg = `<img src="images/icons/waiter.png" class="chef-card icon ms-2"></img>`
        }
        return htmlImg
    } 

    

    listTablesIssuance.addEventListener('click', selectedTable)  
    function selectedTable(event) {  
        if(!event.target.closest('.table')) {    
            return
        }
        colorCodingSelectedTable(event)
        showCurrentOrders(getListCurrentOrders(), +event.target.closest('.table').dataset.table)    
    }

    openChecksContainerIssuance.addEventListener('click', issuedBtn)
    function issuedBtn(event) {
        if(!event.target.closest('button')) {    
            return
        }

        let arr = getListCurrentOrders()

        for(let i = 0; i < arr.length; i++ ) {
            if(+event.target.closest('p').dataset.iddish == arr[i].idDish) {
                arr[i].issued = true
            }
        }
        changeCurrentOrders(arr)
    }
}


function showLogoStatusDish(el) {
    let htmlImg = `<img src="images/icons/cook.png" class="chef-card icon ms-2"></img>`
    console.log(el)
    if(el.ready) {
        htmlImg = `<img src="images/icons/ready-meal.png" class="chef-card icon ms-2"></img>`
    }
    if(el.issued) {
        htmlImg = `<img src="images/icons/waiter.png" class="chef-card icon ms-2"></img>`
    }
    return htmlImg
} 