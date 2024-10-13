const app = document.querySelector('#app');
import { changeRestaurantMenuCategories } from './data.js'
import { getRestaurantMenuCategories } from './data.js'
import { changeListDishesMenu } from './data.js'
import { getListDishesMenu } from './data.js'


// Стартовая страница
homePage() 
function homePage() {
    let homePage = `
    <div class="home-page" >
        <h1 class="p-3">Вас приветствует сиситема управления и автомаризации работы ресторана</h1>
        <p class="fs-4 px-3">Для продолжения работы, выберете соответствующий пункт</p>
        <div class="selection-block px-4" id="selectionBlockHome">
            <h2 class="fs-3 fw-bold" id="adminStart">Администратор</h2>
            <h2 class="fs-3 fw-bold" id="kitchenStart">Кухня</h2>
            <h2 class="fs-3 fw-bold" id="waiter1Start">Официант N 1</h2>
            <h2 class="fs-3 fw-bold" id="waiter2Start">Официант N 2</h2>
            <h2 class="fs-3 fw-bold" id="waiter3Start">Официант N 3</h2>
            <h2 class="fs-3 fw-bold" id="editingMenuStart">Страиница редактирования меню</h2>
        </div>
    </div>
    `;
    app.innerHTML = homePage;      // заполняем стартовую страницу при загрузке

    const selectionBlockHome = document.querySelector('#selectionBlockHome') 
    selectionBlockHome.addEventListener('click', homeMenuSelection)             // отслидим клики пользователя по пунктам меню на стартовой странице
    function homeMenuSelection(event) {                                
        if(event.target.closest('#adminStart')) {
            console.log("клик по пункту Администратор")
        }
        if(event.target.closest('#kitchenStart')) {
            console.log("клик по пункту Кухня")
            kitchen()
        }
        if(event.target.closest('#waiter1Start')) {
            console.log("клик по пункту Официант N 1")
        }
        if(event.target.closest('#waiter2Start')) {
            console.log("клик по пункту Официант N 2")
        }
        if(event.target.closest('#waiter3Start')) {
            console.log("клик по пункту Официант N 3")
        }
        if(event.target.closest('#editingMenuStart')) {
            console.log("клик по пункту Страиница редактирования меню")
            editingMenu()
        }
    }
}


////////////////////////////////////////

function editingMenu() {
    // отрисовка стартовой страницы
    let sditingMenu = `                      
<!-- Модальное окно -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Название блюда</h1>
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
                <button type="button" class="btn btn-danger" data-delete data-bs-dismiss="modal">Удалить</button>
                <button type="button" class="btn btn-secondary" data-close data-bs-dismiss="modal">Закрыть</button>
                <button type="button" class="btn btn-primary" data-save data-bs-dismiss="modal">Сохранить изменения</button>
            </div>
        </div>
    </div>
</div>
<!-- ................ -->

<div class="kitchen-menu container-fluid canvas-color pb-1 p-0">
    <div class="top-menu-buttons menu-color p-1 mb-1 rounded d-flex p-0  position-fixed w-100">
        <div class="dropdown p-0 me-sm-3 me-1">
            <button class="btn btn-secondary dropdown-toggle text-uppercase" id="homePageBtn">
                На главную
            </button>
        </div>
        <div class="dropdown p-0 me-sm-3 me-1">
            <button class="btn btn-secondary dropdown-toggle text-uppercase" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Меню
            </button>
            <ul class="dropdown-menu" id="restaurantCategoriesTopMenu"></ul>
        </div>
            <button class="edit btn btn-success mb-1 p-1 fs-5" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Добавить</button>
            <h4 class="ms-auto">Редактирование</h4>
    </div>
        
    <div class="kitchen-menu-block list-cards p-1 pt-5" id="menuCategories"></div>
</div>
`
    app.innerHTML = sditingMenu;

    const elementRestaurantMenuCategoriesModal = document.querySelector('#elementRestaurantMenuCategories')
    const restaurantCategoriesTopMenu = document.querySelector('#restaurantCategoriesTopMenu')
    const modalButtons = document.querySelector('#modalButtons')       // блок кнопок в модальном окне
    const menuCategories = document.querySelector('#menuCategories')   // блок основного меню с картачками блюд
    const homePageBtn = document.querySelector('#homePageBtn')

    homePageBtn.addEventListener('click', homePage)    //  вызов функции по отрисовке стартовой страницы

    modalButtons.addEventListener('click', modalButtonsClickSelect)    // отслеживание кликов в на кнопки в модальном окне
    
    function modalButtonsClickSelect(event) {                          // определяем по какой кнопке произошло нажатие
        if(event.target.hasAttribute('data-delete')) {
            // console.log('удалить')
        }
        if(event.target.hasAttribute('data-close')) {
            // console.log('закр')
        }
        if(event.target.hasAttribute('data-save')) {
            // console.log('сохр')
            getDataFormChangeDish ()    //  получим данные из формы модального окна при клике сохранить
        }
    }
    
    // имитация запроса на сервер.  категории блюд
    async function requestListCtegories() {       /// как имитировать запрос на сервер????????????????????????????????????????????????
        restaurantMenuCategoriesUpdateModal(getRestaurantMenuCategories())        // запуск функции с передачей списка категорий блюд в модальное окно
        restaurantMenuCategoriesUpdateTopMenu(getRestaurantMenuCategories())      // запуск функции с передачей списка категорий блюд в верхнее выпадающее меню
        showMenuCategories(getRestaurantMenuCategories())                         // вывод категорий блюд на основной экран 
    }
    requestListCtegories()      // запрос на сервер  категории блюд
    
    function restaurantMenuCategoriesUpdateModal(data) {    // функция обновления выпадающего списка в модальном окне с категориями меню 
        data.forEach((el, index) => {
            elementRestaurantMenuCategoriesModal.insertAdjacentHTML('beforeEnd',`<option value="${el}">${el}</option>`)
        });
    }
    
    function restaurantMenuCategoriesUpdateTopMenu(data) {           // функция обновления выпадающего списка в верхнем меню с категориями меню 
        data.forEach((el, index) => {
            restaurantCategoriesTopMenu.insertAdjacentHTML('beforeEnd',`<li><span class="dropdown-item" href="#">${el}</span></li>`)
        });
    }
    
    // Сбор и запись данных 
    class dishСard {       // класс для создания карточки блюда. 
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
    
    function getDataFormChangeDish () {     // функция сбора данных из формы
        const price = document.querySelector('#price')
        const nameDish = document.querySelector('#nameDish')
        const description = document.querySelector('#description')
        const recipe = document.querySelector('#recipe')
        let data = new dishСard(elementRestaurantMenuCategoriesModal.value, price.value, nameDish.value, description.value, recipe.value,)
        sendDataServer(data)
    }
    
    // как имитировать отправку данных на сервер ???????????????????????????????
    async function sendDataServer(data) {   // отправка данных отдельного блюда на сервер . сейчас добавляется в массив listDishesMenu
        let listDishesMenu = getListDishesMenu()
        listDishesMenu.push(data)
        changeListDishesMenu(listDishesMenu)
        showMenuCards(data)
        console.log(getListDishesMenu())
    }
    
    // вывод катрочек блюд на экран
    
    function showMenuCategories(categories) {     // категории заполняются автоматически из массива
        categories.forEach((el, index) => {
            menuCategories.insertAdjacentHTML('afterBegin', `<div class="menu-category"><h4 class="menuCategory d-inline-block">${el}</h4></div>`)
        });
    
        for(let i = 0; i < getListDishesMenu().length; i++ )  { 
            showMenuCards(getListDishesMenu()[i])                           //как только категории основного экрана заполнены ,  вызываем функцию показа карточек которые есть в массиве
        }
    }
    
    // не могу сообразить как сделать. в моем представлении хочу пройти по html коду. получая категории блюд из текстого поля . поля к этому моменту уже заполнены . 
    // сравнивать значения из html и категорию из  обекта который в котором есть значение категории и сразу добавлять в html.   если есть способ проще, скажите.
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
                            <button class="edit btn btn-success mb-1 p-1 fs-5" type="button" data-id = ${data.id} data-bs-toggle="modal" data-bs-target="#exampleModal">Редактировать</button>
                        </div>
                    </div>`
                )
            }
        }
    }
    
    // реализация кнопки редактировать для конткретного элемента
    
    menuCategories.addEventListener('click', editSingleElement)
    function editSingleElement(event) {
        
        console.log(event.target)
    }
    
    // реализовать сброс данных модального окна поле кахдого добавления блюда/ пока не знаю как
    // реализовать якоря при выборе категорий блюд.  пока не знаю как
    // самое сложное реализовать редактирование и удаление каждого блюда через модальное окно бутстрап, ID блюд уже проставлены.  
}


// формирование страницы для кухни
import { changeCurrentOrders } from './data.js';
import { getListCurrentOrders } from './data.js';
function kitchen() {
    
    let currentOrders = getListCurrentOrders()    // переменная в которой находиться весь массив текущих заказов

    function getCurrentOrders() {
        currentOrders = getListCurrentOrders()
    }
    setInterval(()=>getCurrentOrders(), 2000)     // синхронизируем данные с удаленным хранилищем

    function kitchen() {
        let kitchen = ` 
            <div class="window-kitchen container-fluid canvas-color pb-1">

            <div class="top-menu-buttons menu-color p-1 mb-1 rounded">
                <button type="button" class="btn btn-primary me-3 ms-5 text-uppercase" id="update">Обновить</button>
                <button class="btn btn-secondary dropdown-toggle text-uppercase" id="homePageBtn">На главную</button>
                <button type="button" class="btn btn-primary text-uppercase" id="stopListBtn">Стоп-лист</button>
                <button type="button" class="btn btn-primary text-uppercase" id="goListListBtn">Гоу-лист</button>
            </div>

            <div class="list-cards" id="listCards">
                
            </div>
        `

        app.innerHTML = kitchen;
    }
    kitchen()



    const homePageBtn = document.querySelector('#homePageBtn')
    homePageBtn.addEventListener('click', homePage)    //  вызов функции по отрисовке стартовой страницы

    let stopListBtn = document.querySelector('#stopListBtn')
    stopListBtn.addEventListener('click', stopList )     // вызов функции по отрисовке стоп-лист страницы

    let goListListBtn = document.querySelector('#goListListBtn')
    goListListBtn.addEventListener('click', goList )     // вызов функции по отрисовке стоп-лист страницы


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
}


///  меню стоп-лист

function stopList() {

    let stopListHeader = `    
    <div class="window-kitchen container-fluid canvas-color pb-1">
        <div class="top-menu-buttons menu-color p-1 mb-1 rounded">
            <button type="button" class="btn btn-primary me-3 ms-5 text-uppercase me-3 ms-5" id="backBtnStopList">Назад</button>
            <button type="button" class="btn btn-primary me-3 ms-5 text-uppercase" id="saveBtn">Сохранить</button>
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
    backBtnStopList.addEventListener('click', kitchen)

    async function requestListStopCategories() {                  // имитируем запрос на сервер
        // insertStopCategoryList(restaurantMenuCategories)
        insertStopCategoryList(getRestaurantMenuCategories())
    }
    requestListStopCategories()


    function insertStopCategoryList(categories) {                    // Формируем наа странице список категорий блюд
        categories.forEach((el) => {
            stopList.insertAdjacentHTML('beforeEnd', `<h5 class="menuCategoryCheckbox ms-2" value="${el}">${el}</h5>`)
        })

        for(let i = 0; i < getListDishesMenu().length; i++ )  { 
            showCheckboxList(getListDishesMenu()[i])                           //как только категории основного экрана заполнены ,  вызываем функцию показа карточек которые есть в массиве
        }
    }


    function showCheckboxList(data) {                  // вывод на экран чекбоксов по категориям 
        // console.log(data)                              // видим что каждый элемент приходит в функцию
        let menuCategoryCheckbox = document.getElementsByClassName('menuCategoryCheckbox')
        for(let i = 0; i < menuCategoryCheckbox.length; i++) {
            if(menuCategoryCheckbox[i].textContent == data.category) {
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
                // listDishesMenu[i].stop = true
            }
            if(!inputChek[i].checked) {
                let listDishesMenu = getListDishesMenu()
                listDishesMenu[i].stop = false
                changeListDishesMenu(listDishesMenu)
                // listDishesMenu[i].stop = false
            }
            
                // console.log(inputChek[i].checked)    // проверка  состояния чекбокса
        }
        
        console.log(getListDishesMenu(), 'проверяем внесенные изменения')
    }
}

/// Гоу- лист 
function goList() {
    let goListHeader = `
    <div class="window-kitchen container-fluid canvas-color pb-1">
        <div class="top-menu-buttons menu-color p-1 mb-1 rounded">
            <button type="button" class="btn btn-primary me-3 ms-5 text-uppercase me-3 ms-5" id="backBtnGoList">Назад</button>
            <button type="button" class="btn btn-primary me-3 ms-5 text-uppercase" id="saveBtn">Сохранить</button>
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
    backBtnGoList.addEventListener('click', kitchen)

    async function requestListGoCategories() {                  // имитируем запрос на сервер
        insertGoCategoryList(getRestaurantMenuCategories())
    }
    requestListGoCategories()


    function insertGoCategoryList(categories) {                    // Формируем наа странице список категорий блюд
        categories.forEach((el) => {
            goList.insertAdjacentHTML('beforeEnd', `<h5 class="menuCategoryCheckbox ms-2" value="${el}">${el}</h5>`)
        })

        for(let i = 0; i < getListDishesMenu().length; i++ )  { 
            showCheckboxList(getListDishesMenu()[i])                           //как только категории основного экрана заполнены ,  вызываем функцию показа карточек которые есть в массиве
        }
    }

    function showCheckboxList(data) {                  // вывод на экран чекбоксов по категориям 
        console.log(data)                              // видим что каждый элемент приходит в функцию
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
            
                // console.log(inputChek[i].checked)    // проверка  состояния чекбокса
        }
        
        console.log(getListDishesMenu(), 'проверяем внесенные изменения')
    }







}