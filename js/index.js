const app = document.querySelector('#app');
import { changeRestaurantMenuCategories } from './data.js'
import { getRestaurantMenuCategories } from './data.js'
import { changeListDishesMenu } from './data.js'
import { getListDishesMenu } from './data.js'
import { getListTables } from './data.js'

homePage()     // Запуск стартовой страницы 

//  Стартовая страница  ----->>>>>      /////////////////////////////////////////////////////////

function homePage() {    // Формирование стартовой страницы 
    let homePage = `
    <div class="home-page" >
        <h1 class="p-3">Вас приветствует сиситема управления и автомаризации работы ресторана</h1>
        <p class="fs-4 px-3">Для продолжения работы, выберете соответствующий пункт</p>
        <div class="selection-block px-4" id="selectionBlockHome">
            <h2 class="fs-3 fw-bold" id="adminStart">Администратор</h2>
            <h2 class="fs-3 fw-bold" id="kitchenStart">Кухня</h2>
            <h2 class="fs-3 fw-bold" id="waiter1Start">Официант N 1</h2>
            <h2 class="fs-3 fw-bold" id="waiter2Start">Официант дополнительно</h2>
            <h2 class="fs-3 fw-bold" id="editingMenuStart">Страиница редактирования меню</h2>
        </div>
    </div>
    `;

    app.innerHTML = homePage;      // заполняем HTML кодом стартовую страницу при запуске приложения

    const selectionBlockHome = document.querySelector('#selectionBlockHome')    
    selectionBlockHome.addEventListener('click', homeMenuSelection)             // отслидим клики пользователя по пунктам меню на стартовой странице. идем методом делегирования
    function homeMenuSelection(event) {                                
        if(event.target.closest('#adminStart')) {               // клик по пункту Администратор
            adminPage()        // запускаем страницу администратора
        }
        if(event.target.closest('#kitchenStart')) {       // клик по пункту Кухня
            kitchen()          // запускаем страницу кухни
        }
        if(event.target.closest('#waiter1Start')) {    // клик по пункту Официант N 1
            kitchenМenu()       // запуск функции меню официанта
        }
        if(event.target.closest('#waiter2Start')) {
            alert ("Для подключения дополнительного сторудника, обратитесь к разработчику")
        }
        if(event.target.closest('#editingMenuStart')) {    // клик по пункту Страиница редактирования меню
            editingMenu()
        }
    }
}

//////////////////////////////////////// Стартовая страница   <<<----

// окно администратора ---->>>                  ////////////////////////////////////////////////////////

// function adminPage() {

//     let tableNam = 0      // выбранный столик по умолчанию. в нем меняем значение переменной исходя из клика пользователя
//     const adminStartHtml = `
//         <div class="window-kitchen container-fluid canvas-color pb-1">
//             <div class="top-menu-buttons menu-color p-1 mb-1 rounded d-flex">
//                 <button type="button" class="btn btn-primary me-3 ms-5 text-uppercase" id="update">Обновить</button>
//                 <button type="button" class="btn btn-primary text-uppercase me-3" id="homePageBtn">На главную</button>
//                 <button type="button" class="btn btn-primary text-uppercase me-3" id="stopListBtn">Стоп-лист</button>
//                 <button type="button" class="btn btn-primary text-uppercase me-3" id="goListListBtn">Гоу-лист</button>
//                 <p class="ms-auto px-4 fs-5">Администратор</p>
//             </div>
    
//             <div class="list-tables d-flex flex-wrap gap-2" id="lisTables"></div>
    
//             <div>
//                 <div class="open-checks-container" id="openChecksContainer"></div>
//                 <div class="final-cost card-design" id="finalPrice"></div>
        
//                 <div class="button-block">
//                     <button type="button" class="btn btn-success" id="btnCloseCheck">Закрыть чек</button>
//                 </div>
//             </div>
//         </div>
//     `
//     app.innerHTML = adminStartHtml      //  отрисовываем страницу администатора

    
//     let update = document.querySelector('#update')
//     update.addEventListener('click', adminPage)        //  вызов функции по отрисовке текущей страницы (обновление)
//     // setInterval(adminPage, 10000)                      //  автоматическое обновление текущей страницы через временной интервал 10 сек

//     const homePageBtn = document.querySelector('#homePageBtn')
//     homePageBtn.addEventListener('click', homePage)      //  вызов функции по отрисовке стартовой страницы

//     let stopListBtn = document.querySelector('#stopListBtn')
//     stopListBtn.addEventListener('click', stopList )     // вызов функции по отрисовке стоп-лист страницы

//     let goListListBtn = document.querySelector('#goListListBtn')
//     goListListBtn.addEventListener('click', goList )     // вызов функции по отрисовке гоу-лист страницы
    

//     const lisTables = document.querySelector('#lisTables')
    
//     // дополнительно ввести и принимать в функцию данные о заказах
//     function htmlBlockTablesFormation(dataArr) {
//         lisTables.innerHTML = ''
//         for(let i = 0; i < dataArr.length; i++) {
//             let sum = sumorderAmountTable(dataArr[i].number)
//             lisTables.insertAdjacentHTML('beforeEnd', `
//                 <div class="table text-center" data-table = ${dataArr[i].number}>
//                     <p>стол ${dataArr[i].number}</p>
//                     <p>${sum? sum +' р.' : 'чеков нет'}</p>
//                 </div>
//                 `
//             )
//         }
//     }
//     htmlBlockTablesFormation(getListTables())
    
//     function sumorderAmountTable(tableNumber) {      // принимает номер столика и возвращает сумму всех чеков по этому столику 
//         return getListCurrentOrders()
//             .filter(x => x.table === tableNumber)
//             .reduce((a, x) => a + x.price * x.quantity, 0);
//     }
    
//     function issuedSumorderAmountTable(tableNumber) {      // принимает номер столика и возвращает сумму выданных
//             return getListCurrentOrders()
//             .filter(x => (x.table === tableNumber) && x.issued)
//             .reduce((a, x) => a + x.price * x.quantity, 0);
//     }
    
//     // цветовая маркировка выбранного столика
//     const finalPriceEl = document.querySelector('#finalPrice')
//     lisTables.addEventListener('click', userTableSelection)  
    
    
    
//     function userTableSelection(event) {    // показ итоговой стоимости заказанных товаров внизу ИТОГО
//         if(!event.target.closest('.table')) {
//             return
//         }
//         // добавляем цветовую маркировку блокам с выбранным столиком 
//         let arr = event.currentTarget.children
//         for(let el of arr) {
//             el.classList.remove('active-table')
//         }
//         event.target.closest('.table').classList.add('active-table')
    
//         finalPrice(event.target.closest('.table').dataset.table)  //передаем в функцию показа стоимости номер выбранного столика
//         showTableReceiptList(event.target.closest('.table').dataset.table)   //передаем в функцию показа чеков номер выбранного столика
//         tableNam = event.target.closest('.table').dataset.table
//     }
    
//     //формирование финальной цены
//     function finalPrice(table) {
//         finalPriceEl.innerHTML = `
//             <h4>Итого: <span class="d-inline-block ms-4 fw-bold">${issuedSumorderAmountTable(+table)}<span> p.</span></span></h4>
//         `
//     }
    
//     const openChecksContainer = document.querySelector('#openChecksContainer')
//     function showTableReceiptList(table) {
//         openChecksContainer.innerHTML = ''
//         let listCurrentOrders = getListCurrentOrders()
//         // let arrListCurrentOrders = []
//         let elText =''
//         let elComment =''
//         listCurrentOrders.forEach((el) => {
            
//             if(el.table == table) {
//                 elText += `<p class="mb-0">${el.nameDish}<span class="d-inline-block ms-4 fw-bold"><span>${el.quantity} шт.</span>&emsp;<span>${el.teme}</span>&emsp;<span>${el.price * el.quantity} р.</span><span>${showLogoStatusDish(el)}</span></span></p>`
//             }
            
//         })
    
//         openChecksContainer.insertAdjacentHTML('afterBegin', `
//             <div class="open-checks card-design">
//                 <h2 class="fs-4 border-bottom  border-black">Открытый чек столика N ${table}</h2>
//                 ${elText}
//             </div>
//         `)
//     }
    
    
//     function removeTableData(table) {     // Удаление из объекта заказа с выбранным столиком
//         console.log(getListCurrentOrders())
//         let listCurrentOrders = getListCurrentOrders()
//         let newListCurrentOrders = []
//         listCurrentOrders.forEach((el) => {
//             if( !(el.table == table)) {
//                 newListCurrentOrders.push(el)
//             }
//         })
//         changeCurrentOrders(newListCurrentOrders)
//         console.log(getListCurrentOrders())
//     }
    
    
//     let btnCloseCheck = document.querySelector('#btnCloseCheck')
//     btnCloseCheck.addEventListener('click', deleteOrder)
    
//     function deleteOrder() {
//         removeTableData(tableNam)
//         colorMarkingClosedCheck()
//         htmlBlockTablesFormation(getListTables())
//     }
    
//     function colorMarkingClosedCheck() {    // цветовая маркировка закрытого чека
//         let openChecks = document.querySelectorAll('.open-checks > p')
//         openChecks.forEach((el) => {
//             el.classList.add('closed-check')
//         })
//     }

    
    
//     function ready (el) {                                        // вывод логотипа статуса блюда
//         let htmlImg = `<img src="images/icons/cook.png" class="chef-card icon ms-2"></img>`
//         console.log(el)
//         if(el.ready) {
//             htmlImg = `<img src="images/icons/ready-meal.png" class="chef-card icon ms-2"></img>`
//         }
//         if(el.issued) {
//             htmlImg = `<img src="images/icons/waiter.png" class="chef-card icon ms-2"></img>`
//         }
//         return htmlImg
//     } 
// }































// function editingMenu() {      // страница редактирования меню
//     // отрисовка стартовой страницы
//     let sditingMenu = `                      
// <!-- Модальное окно -->
// <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//     <div class="modal-dialog">
//         <div class="modal-content">
//             <div class="modal-header">
//                 <h1 class="modal-title fs-5" id="exampleModalLabel">Название блюда</h1>
//                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
//             </div>
//             <div class="modal-body">

//                 <div class="d-flex justify-content-between me-2">
//                     <select class="form-select" id="elementRestaurantMenuCategories">
//                         <option selected disabled>Откройте это меню выбора</option>
//                     </select>
//                     <input type="number" min="0" class="form-control ms-3" placeholder="Стоимость" id="price">
//                 </div>

//                 <p class="mb-0">Название блюда</p>
//                 <textarea class="form-control" aria-label="С текстовым полем" id="nameDish"></textarea>
//                 <p class="mb-0">Краткое описание</p>
//                 <textarea class="form-control" aria-label="С текстовым полем" id="description"></textarea>
//                 <p class="mb-0">Карта для кухни</p>
//                 <textarea class="form-control" aria-label="С текстовым полем" id="recipe"></textarea>
//             </div>
//             <div class="modal-footer" id="modalButtons">
//                 <button type="button" class="btn btn-danger" data-delete data-bs-dismiss="modal">Удалить</button>
//                 <button type="button" class="btn btn-secondary" data-close data-bs-dismiss="modal">Закрыть</button>
//                 <button type="button" class="btn btn-primary" data-save data-bs-dismiss="modal">Сохранить изменения</button>
//             </div>
//         </div>
//     </div>
// </div>
// <!-- ................ -->

// <div class="kitchen-menu container-fluid canvas-color pb-1 p-0">
//     <div class="top-menu-buttons menu-color p-1 mb-1 rounded d-flex p-0  position-fixed w-100">
//         <div class="dropdown p-0 me-sm-3 me-1">
//             <button class="btn btn-secondary dropdown-toggle text-uppercase" id="homePageBtn">
//                 На главную
//             </button>
//         </div>
//         <div class="dropdown p-0 me-sm-3 me-1">
//             <button class="btn btn-secondary dropdown-toggle text-uppercase" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                     Меню
//             </button>
//             <ul class="dropdown-menu" id="restaurantCategoriesTopMenu"></ul>
//         </div>
//             <button class="edit btn btn-success mb-1 p-1 fs-5" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">Добавить</button>
//             <h4 class="ms-auto">Редактирование</h4>
//     </div>
        
//     <div class="kitchen-menu-block list-cards p-1 pt-5" id="menuCategories"></div>
// </div>
// `
//     app.innerHTML = sditingMenu;

//     const elementRestaurantMenuCategoriesModal = document.querySelector('#elementRestaurantMenuCategories')
//     const restaurantCategoriesTopMenu = document.querySelector('#restaurantCategoriesTopMenu')
//     const modalButtons = document.querySelector('#modalButtons')       // блок кнопок в модальном окне
//     const menuCategories = document.querySelector('#menuCategories')   // блок основного меню с картачками блюд
//     const homePageBtn = document.querySelector('#homePageBtn')

//     homePageBtn.addEventListener('click', homePage)    //  вызов функции по отрисовке стартовой страницы

//     modalButtons.addEventListener('click', modalButtonsClickSelect)    // отслеживание кликов в на кнопки в модальном окне
    
//     function modalButtonsClickSelect(event) {                          // определяем по какой кнопке произошло нажатие
//         if(event.target.hasAttribute('data-delete')) {
//             // console.log('удалить')
//         }
//         if(event.target.hasAttribute('data-close')) {
//             // console.log('закр')
//         }
//         if(event.target.hasAttribute('data-save')) {
//             // console.log('сохр')
//             getDataFormChangeDish ()    //  получим данные из формы модального окна при клике сохранить
//         }
//     }
    
//     // имитация запроса на сервер.  категории блюд
//     async function requestListCtegories() {       /// как имитировать запрос на сервер????????????????????????????????????????????????
//         restaurantMenuCategoriesUpdateModal(getRestaurantMenuCategories())        // запуск функции с передачей списка категорий блюд в модальное окно
//         restaurantMenuCategoriesUpdateTopMenu(getRestaurantMenuCategories())      // запуск функции с передачей списка категорий блюд в верхнее выпадающее меню
//         showMenuCategories(getRestaurantMenuCategories())                         // вывод категорий блюд на основной экран 
//     }
//     requestListCtegories()      // запрос на сервер  категории блюд
    
//     function restaurantMenuCategoriesUpdateModal(data) {    // функция обновления выпадающего списка в модальном окне с категориями меню 
//         data.forEach((el, index) => {
//             elementRestaurantMenuCategoriesModal.insertAdjacentHTML('beforeEnd',`<option value="${el}">${el}</option>`)
//         });
//     }
    
//     function restaurantMenuCategoriesUpdateTopMenu(data) {           // функция обновления выпадающего списка в верхнем меню с категориями меню 
//         data.forEach((el, index) => {
//             restaurantCategoriesTopMenu.insertAdjacentHTML('beforeEnd',`<li><span class="dropdown-item" href="#">${el}</span></li>`)
//         });
//     }
    
//     // Сбор и запись данных 
//     class dishСard {       // класс для создания карточки блюда. 
//         id = getListDishesMenu().length + 1
//         stop = false
//         go = false
//         constructor(category, price, nameDish, description, recipe, catrgoryIndex) {
//             this.category = category
//             this.price = price
//             this.nameDish = nameDish
//             this.description = description
//             this.recipe = recipe
//         }
//     }
    
//     function getDataFormChangeDish () {     // функция сбора данных из формы
//         const price = document.querySelector('#price')
//         const nameDish = document.querySelector('#nameDish')
//         const description = document.querySelector('#description')
//         const recipe = document.querySelector('#recipe')
//         let data = new dishСard(elementRestaurantMenuCategoriesModal.value, price.value, nameDish.value, description.value, recipe.value,)
//         sendDataServer(data)
//     }
    
//     // как имитировать отправку данных на сервер ???????????????????????????????
//     async function sendDataServer(data) {   // отправка данных отдельного блюда на сервер . сейчас добавляется в массив listDishesMenu
//         let listDishesMenu = getListDishesMenu()
//         listDishesMenu.push(data)
//         changeListDishesMenu(listDishesMenu)
//         showMenuCards(data)
//         console.log(getListDishesMenu())
//     }
    
//     // вывод катрочек блюд на экран
    
//     function showMenuCategories(categories) {     // категории заполняются автоматически из массива
//         categories.forEach((el, index) => {
//             menuCategories.insertAdjacentHTML('afterBegin', `<div class="menu-category"><h4 class="menuCategory d-inline-block">${el}</h4></div>`)
//         });
    
//         for(let i = 0; i < getListDishesMenu().length; i++ )  { 
//             showMenuCards(getListDishesMenu()[i])                           //как только категории основного экрана заполнены ,  вызываем функцию показа карточек которые есть в массиве
//         }
//     }
    
//     // не могу сообразить как сделать. в моем представлении хочу пройти по html коду. получая категории блюд из текстого поля . поля к этому моменту уже заполнены . 
//     // сравнивать значения из html и категорию из  обекта который в котором есть значение категории и сразу добавлять в html.   если есть способ проще, скажите.
//     function showMenuCards(data) {
//         const menuCategory = document.getElementsByClassName('menuCategory')
//         for(let i = 0; i < menuCategory.length; i++) {
//             if(menuCategory[i].textContent == data.category) {
//                 menuCategory[i].insertAdjacentHTML('afterEnd',    //  afterEnd
//                     `<div class="order-card d-flex card-design my-1 p-1 rounded" data-id = ${data.id}>
//                         <div class="name-container w-100">
//                             <div class="name fs-5 fw-bold lh-1">${data.nameDish}<span class="ms-5">${data.price} р.</span></div>
//                             <div class="comment lh-1">${data.description}</div>
//                             <div class="comment lh-1">${data.recipe}</div>
//                         </div>
//                         <div class="card-button-block d-flex flex-column px-3 justify-content-center">
//                             <button class="edit btn btn-success mb-1 p-1 fs-5" type="button" data-id = ${data.id} data-bs-toggle="modal" data-bs-target="#exampleModal">Редактировать</button>
//                         </div>
//                     </div>`
//                 )
//             }
//         }
//     }
    
//     // реализация кнопки редактировать для конткретного элемента
    
//     menuCategories.addEventListener('click', editSingleElement)
//     function editSingleElement(event) {
        
//         console.log(event.target)
//     }
    
//     // реализовать сброс данных модального окна поле кахдого добавления блюда/ пока не знаю как
//     // реализовать якоря при выборе категорий блюд.  пока не знаю как
//     // самое сложное реализовать редактирование и удаление каждого блюда через модальное окно бутстрап, ID блюд уже проставлены.  
// }










// ///  меню стоп-лист

// function stopList() {

//     let stopListHeader = `    
//     <div class="window-kitchen container-fluid canvas-color pb-1">
//         <div class="top-menu-buttons menu-color p-1 mb-1 rounded">
//             <button type="button" class="btn btn-primary me-3 ms-5 text-uppercase me-3 ms-5" id="backBtnStopList">Назад</button>
//             <button type="button" class="btn btn-primary me-3 ms-5 text-uppercase" id="saveBtn">Сохранить</button>
//         </div>
        
//         <div class="stop-list-block">
//             <h4>Стоп-лист</h4>
//             <div id="stopList"></div>
//         </div>
//     </div>
//     `
//     app.innerHTML = stopListHeader

//     const stopList = document.querySelector('#stopList')

//     const backBtnStopList = document.querySelector('#backBtnStopList');
//     backBtnStopList.addEventListener('click', kitchen)

//     async function requestListStopCategories() {                  // имитируем запрос на сервер
//         // insertStopCategoryList(restaurantMenuCategories)
//         insertStopCategoryList(getRestaurantMenuCategories())
//     }
//     requestListStopCategories()


//     function insertStopCategoryList(categories) {                    // Формируем наа странице список категорий блюд
//         categories.forEach((el) => {
//             stopList.insertAdjacentHTML('beforeEnd', `<h5 class="menuCategoryCheckbox ms-2" value="${el}">${el}</h5>`)
//         })

//         for(let i = 0; i < getListDishesMenu().length; i++ )  { 
//             showCheckboxList(getListDishesMenu()[i])                           //как только категории основного экрана заполнены ,  вызываем функцию показа карточек которые есть в массиве
//         }
//     }


//     function showCheckboxList(data) {                  // вывод на экран чекбоксов по категориям 
//         // console.log(data)                              // видим что каждый элемент приходит в функцию
//         let menuCategoryCheckbox = document.getElementsByClassName('menuCategoryCheckbox')
//         for(let i = 0; i < menuCategoryCheckbox.length; i++) {
//             if(menuCategoryCheckbox[i].textContent == data.category) {
//                 let choice = ""
//                 if(data.stop) {
//                     choice = 'checked'
//                 }
//                 menuCategoryCheckbox[i].insertAdjacentHTML('beforeBegin', `
//                     <div class="form-check ms-3">
//                         <label class="form-check-label">
//                             <input class="form-check-input inputChek" type="checkbox" value="${data.id}" ${choice}>
//                             ${data.nameDish}
//                         </label>
//                     </div>
//                     `
                    
//                 )
//             }
//         }
//     }

//     const saveBtn = document.querySelector("#saveBtn")

//     saveBtn.addEventListener('click', overwriteData)

//     async function overwriteData() {
//         const inputChek = document.getElementsByClassName('inputChek')
//         for(let i = 0; i < inputChek.length; i++) {         // в данном цикле идем без привязки к ID поэтому beforeBegin важен порядок . не меняем  menuCategoryCheckbox[i].insertAdjacentHTML('beforeBegin',
//             if(inputChek[i].checked) {
//                 let listDishesMenu = getListDishesMenu()
//                 listDishesMenu[i].stop = true
//                 changeListDishesMenu(listDishesMenu)
//                 // listDishesMenu[i].stop = true
//             }
//             if(!inputChek[i].checked) {
//                 let listDishesMenu = getListDishesMenu()
//                 listDishesMenu[i].stop = false
//                 changeListDishesMenu(listDishesMenu)
//                 // listDishesMenu[i].stop = false
//             }
            
//                 // console.log(inputChek[i].checked)    // проверка  состояния чекбокса
//         }
        
//         console.log(getListDishesMenu(), 'проверяем внесенные изменения')
//     }
// }

// /// Гоу- лист 
// function goList() {
//     let goListHeader = `
//     <div class="window-kitchen container-fluid canvas-color pb-1">
//         <div class="top-menu-buttons menu-color p-1 mb-1 rounded">
//             <button type="button" class="btn btn-primary me-3 ms-5 text-uppercase me-3 ms-5" id="backBtnGoList">Назад</button>
//             <button type="button" class="btn btn-primary me-3 ms-5 text-uppercase" id="saveBtn">Сохранить</button>
//         </div>
        
//         <div class="stop-list-block">
//             <h4>Гоу-лист</h4>
//             <div id="goList"></div>
//         </div>
//     </div>
//     `
//     app.innerHTML = goListHeader

//     const goList = document.querySelector('#goList')

//     const backBtnGoList = document.querySelector('#backBtnGoList');
//     backBtnGoList.addEventListener('click', kitchen)

//     async function requestListGoCategories() {                  // имитируем запрос на сервер
//         insertGoCategoryList(getRestaurantMenuCategories())
//     }
//     requestListGoCategories()


//     function insertGoCategoryList(categories) {                    // Формируем наа странице список категорий блюд
//         categories.forEach((el) => {
//             goList.insertAdjacentHTML('beforeEnd', `<h5 class="menuCategoryCheckbox ms-2" value="${el}">${el}</h5>`)
//         })

//         for(let i = 0; i < getListDishesMenu().length; i++ )  { 
//             showCheckboxList(getListDishesMenu()[i])                           //как только категории основного экрана заполнены ,  вызываем функцию показа карточек которые есть в массиве
//         }
//     }

//     function showCheckboxList(data) {                  // вывод на экран чекбоксов по категориям 
//         console.log(data)                              // видим что каждый элемент приходит в функцию
//         let menuCategoryCheckbox = document.getElementsByClassName('menuCategoryCheckbox')
//         for(let i = 0; i < menuCategoryCheckbox.length; i++) {
//             if(menuCategoryCheckbox[i].textContent == data.category) {
//                 let choice = ""
//                 if(data.go) {
//                     choice = 'checked'
//                 }
//                 menuCategoryCheckbox[i].insertAdjacentHTML('beforeBegin', `
//                     <div class="form-check ms-3">
//                         <label class="form-check-label">
//                             <input class="form-check-input inputChek" type="checkbox" value="${data.id}" ${choice}>
//                             ${data.nameDish}
//                         </label>
//                     </div>
//                     `
                    
//                 )
//             }
//         }
//     }

//     const saveBtn = document.querySelector("#saveBtn")

//     saveBtn.addEventListener('click', overwriteData)

//     async function overwriteData() {
//         const inputChek = document.getElementsByClassName('inputChek')
//         for(let i = 0; i < inputChek.length; i++) {         // в данном цикле идем без привязки к ID поэтому beforeBegin важен порядок . не меняем  menuCategoryCheckbox[i].insertAdjacentHTML('beforeBegin',
//             if(inputChek[i].checked) {
//                 let listDishesMenu = getListDishesMenu()
//                 listDishesMenu[i].go = true
//                 changeListDishesMenu(listDishesMenu)
//             }
//             if(!inputChek[i].checked) {
//                 let listDishesMenu = getListDishesMenu()
//                 listDishesMenu[i].go = false
//                 changeListDishesMenu(listDishesMenu)
//             }
            
//                 // console.log(inputChek[i].checked)    // проверка  состояния чекбокса
//         }
        
//         console.log(getListDishesMenu(), 'проверяем внесенные изменения')
//     }
// }









import { changeCurrentOrders } from './data.js';
import { getListCurrentOrders } from './data.js';

// // формирование страницы для кухни

// function kitchen() {
    
//     let currentOrders     // переменная в которой находиться весь массив текущих заказов

//     function getCurrentOrders() {
//         currentOrders = getListCurrentOrders()
//     }
//     getCurrentOrders()
//     // setInterval(()=>getCurrentOrders(), 2000)     // синхронизируем данные с удаленным хранилищем

//     function kitchen() {
//         let kitchen = ` 
//             <div class="window-kitchen container-fluid canvas-color pb-1">

//             <div class="top-menu-buttons menu-color p-1 mb-1 rounded">
//                 <button type="button" class="btn btn-primary me-3 ms-5 text-uppercase" id="update">Обновить</button>
//                 <button class="btn btn-secondary dropdown-toggle text-uppercase" id="homePageBtn">На главную</button>
//                 <button type="button" class="btn btn-primary text-uppercase" id="stopListBtn">Стоп-лист</button>
//                 <button type="button" class="btn btn-primary text-uppercase" id="goListListBtn">Гоу-лист</button>
//             </div>

//             <div class="list-cards" id="listCards">
                
//             </div>
//         `

//         app.innerHTML = kitchen;
//     }
//     kitchen()



//     const homePageBtn = document.querySelector('#homePageBtn')
//     homePageBtn.addEventListener('click', homePage)    //  вызов функции по отрисовке стартовой страницы

//     let stopListBtn = document.querySelector('#stopListBtn')
//     stopListBtn.addEventListener('click', stopList )     // вызов функции по отрисовке стоп-лист страницы

//     let goListListBtn = document.querySelector('#goListListBtn')
//     goListListBtn.addEventListener('click', goList )     // вызов функции по отрисовке стоп-лист страницы


//     function duplicate(dataArr, dataEl) {    // поиск дубликата блюд
//         let duplicate = false
//         let count = -1
//         for (let i = 0; i < dataArr.length; i++ ) {
//             if(dataArr[i].nameDish == dataEl.nameDish && !dataArr[i].ready) {
//                 count ++
//             }
//         }
//         if(count) {
//             duplicate = true
//         }
//         return duplicate
//     }

//     const listCards = document.querySelector('#listCards')

//     function showListOrders(dataArr) {      //  показываем карточки с заказами
//         for (let i = 0; i < dataArr.length; i++ ) {
//             let duplicateIcon = `<img src="images/icons/copy.svg" class="chef-card icon"></img>`
//             if(!duplicate(dataArr, dataArr[i])) {
//                 duplicateIcon = ''
//             }
//             // console.log(dataArr[i].ready)
//             if(!dataArr[i].ready && !dataArr[i].cancel) {                   // в условии если готово или отмена тогда карточки не показываем
//                 listCards.insertAdjacentHTML( 'afterBegin' , 
//                     `<div class="order-card d-flex card-design my-1 p-1 rounded">
//                         <div class="name-container w-100">
//                             <div class="name fs-5 fw-bold">${dataArr[i].nameDish}&emsp;<span class="order-number">${dataArr[i].orderNumber}</span></div>
//                             <div class="comment lh-1">${dataArr[i].comment}</div>
//                         </div>
//                         <div class="numerical-information px-3 d-flex flex-column justify-content-center">
//                             <div class="servings-quantity fs-3 fw-bold text-nowrap">x ${dataArr[i].quantity}</div>
//                             <div class="table-number fs-4">${dataArr[i].table}</div>
//                         </div>
//                         <div class="info-icon d-flex flex-column justify-content-center">
//                             <img src="images/icons/info.svg" class="chef-card icon" data-id = ${dataArr[i].id}></img>
//                             ${duplicateIcon}
//                         </div>
//                         <div class="card-button-block d-flex flex-column px-3 justify-content-center">
//                             <button class="confirm btn btn-success mb-1 text-uppercase cookReadyBtn" type="button" data-idDish= ${dataArr[i].idDish}>Готов</button>
//                             <button class="cancel btn btn-secondary text-uppercase cookCancelBtn" type="button" data-idDish= ${dataArr[i].idDish}>Отмена</button>
//                         </div>
//                     </div>`
//                 )
//             }
//             // console.log(duplicate(dataArr, dataArr[i]))    // Проверка дубликата.
//         }
//         // console.log(currentOrders)
//     }

//     // придумать, как ввести модальное окно  при клике на инонку рецепта???????????

//     showListOrders(currentOrders)

//     let update = document.querySelector('#update')
//     update.addEventListener('click', updatingOrderList)

//     // setInterval(()=>updatingOrderList(), 2000)    // автообновление листа с заказами
//     function updatingOrderList() {                // функция обновления листа с заказами
//         listCards.innerHTML = ''
//         showListOrders(currentOrders)
//     }



//     listCards.addEventListener('click', sendingCookReady)   // прослушивание клика кнопки заказ приготовлен

//     function sendingCookReady(event) {
//         if(!event.target.closest('.cookReadyBtn')) {
//         return
//         }
//         console.log('готово')
//         // тут при клиике готово меняем статус в массиве на готово
//         console.log(getCurrentOrders())
//         for(let i = 0; i < currentOrders.length; i++ ) { 
//             // console.log(+currentOrders[i].idDish)
//             // console.log((+event.target.dataset.iddish))
//             if(+currentOrders[i].idDish == +event.target.dataset.iddish) {
//                 // console.log(currentOrders[i].ready)
//                 currentOrders[i].ready = true
//                 // console.log(currentOrders[i].ready)
//                 changeCurrentOrders(currentOrders)
//             }
//         }
//         console.log(getCurrentOrders())
//         event.target.closest('.order-card').classList.add('background-color-ready') // добавление цветовой маркировки при клике готово
//     }

//     listCards.addEventListener('click', sendingСookCancel)   // прослушивание клика кнопки заказ отменен
//     function sendingСookCancel(event) {
//         if(!event.target.closest('.cookCancelBtn')) {
//             return
//             }
//         console.log('Отмена')
//             // тут при клиике готово меняем статус в массиве на отмена
//         for(let i = 0; i < currentOrders.length; i++ ) {    
//             if(currentOrders[i].uniqueOrderDishNumber == (+event.target.dataset.uniqueorderdishnumber)) {
//                 currentOrders[i].cancel = true
//             }
//         }
//         event.target.closest('.order-card').classList.add('cancel-background-color')
//         event.target.closest('.order-card') = ''
//     }
// }














let intermediateOrder = []    // массив промежуточного заказа
function kitchenМenu() {                // страница оицианта
    function listTables() {             // получаем html код  для построения блока со списком столиков
        let listTables = ''
        getListTables().forEach((el, index) => {
            listTables += ` <option value="${el.number}">${el.number} ${el.description}</option>`
        }) 
        return listTables
    }
    
    let listDishesMenu = getListDishesMenu()   // не забыть обновлять при клике на кнопку обновить и по таймеру
    let restaurantMenuCategories = getRestaurantMenuCategories()      //  получим категории меню в переменную
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
            <button type="button" class="btn btn-primary text-uppercase me-3" id="issuanceBtn">Выдача</button>
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
            <select id="selectedTable" class="table form-select p-1 w-25 mb-0">
                <option selected value='0'>Выбранный столик</option>
                ${listTables()}   
            </select>
            <img src="/images/icons/listOrders.svg" class="chef-card icon ms-auto" id="orderReceiptButton"></img>
        </div>
        <div class="kitchen-menu-block list-cards p-1 pt-5" id="kitchenMenuBlock"></div>
    </div>
    `
    app.innerHTML = headerKitchenМenu
    const kitchenMenuBlock = document.querySelector('#kitchenMenuBlock')
    const homePageBtn = document.querySelector('#homePageBtn')
    homePageBtn.addEventListener('click', homePage)
    // issuanceBtn.addEventListener('click', issuance)       //  раскоментировать

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
    
    function showMenuCards(data) {     //   отображение каждой карточки 
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
        console.log()
    }
    
    function writeDataIntermediateArray(sId, quantity) {
        let obj = listDishesMenu.find(el => el.id == sId)      // находим объект в массиве по id
        obj = {...obj}
        obj.quantity = +quantity
        // console.log(obj)
        intermediateOrder.push(obj)
        // console.log(intermediateOrder)   //  получили обект промежуточного заказа
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
          // как только получили данные по столику. вызываеим функцию построенмя чека
    }
    orderReceiptButton.addEventListener('click', selectedTable)
    
}



function addingOrder1() {
    let addingOrderHtmlCode = `
        <div class="kitchen-menu container-fluid canvas-color pb-1 p-0">

        <div class="top-menu-buttons menu-color p-1 mb-1 rounded d-flex p-0  position-fixed w-100">
            <div class="dropdown p-0 me-sm-3 me-1">
                <button type="button" class="btn btn-primary me-3 ms-1 text-uppercase" id="update">Обновить</button>
                <button type="button" class="btn btn-primary text-uppercase me-3" id="homePageBtn">На главную</button>
            </div>
            <span class="align-self-center fw-bold"">Столик ${intermediateOrder[0]}</span>
            <button class="btn btn-secondary ms-auto text-uppercase" id="confirmBtn">Верно</button>
        </div>

        <div class="adding-order pt-5 px-2" id="addingOrder"></div>

        <div class="price-block d-flex justify-content-end pe-4 fs-5 fw-bold">
            <span>Итого: &emsp;</span>
            <span>${sum(intermediateOrder)}</span>
            <span>&nbsp;руб.</span>
        </div>
    </div>
    `
    app.innerHTML = addingOrderHtmlCode
    // console.log(intermediateOrder)
    let addingOrder = document.querySelector('#addingOrder')
    for(let i = 1; i < intermediateOrder.length; i++ ) {
        // console.log(intermediateOrder[i])
        addingOrder.insertAdjacentHTML('beforeEnd', `
            <div class="product-line border-bottom border-2 border-black border-opacity-50" data-intermediateOrderId = ${i}>
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
    function lickConfirmButton() {    // выполняется при клике на кнопку верно
        writeOrdersArray(intermediateOrder)
        intermediateOrder = []
        kitchenМenu()                       
    }
}

function sum (arrOrder) {    // считаем смумму заказа
    let sum = 0
    for(let i = 1; i < arrOrder.length; i++) {
        sum += +arrOrder[i].price * +arrOrder[i].quantity
    }
    return sum
}

function writeOrdersArray(arrOrder) {    // запись заказа в массив для официантов
    // arrOrder  все верно работает и обнуляется
    // debugger
    let time = timeOrger()
    let orderNumber = generationOrderNumber()
    for (let i = 1; i < arrOrder.length; i++) {
        arrOrder[i].time = time
        arrOrder[i].orderNumber = orderNumber
        arrOrder[i].table = arrOrder[0]
        arrOrder[i].ready = false
        arrOrder[i].issued = false
        arrOrder[i].idDish = orderNumber + i
    }
    let currentOrders1 = getListCurrentOrders()

    arrOrder.shift()   // уберем 0 элемент массива . т.к. он указывал на выбранный номер столика
    let rezArr = currentOrders1.concat(arrOrder)
    changeCurrentOrders(rezArr)
    console.log(getListCurrentOrders())


    currentOrders1 = []
    intermediateOrder = []
    rezArr = []
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

























// function issuance() {      // окно выдачи заказа
    

//     let tableNam = 0      // выбранный столик по умолчанию. в нем меняем значение переменной исходя из клика пользователя
    
//     const issuanceStartHtml = `
//         <div class="window-issuance container-fluid canvas-color pb-1">
    
//             <div class="top-menu-buttons menu-color p-1 mb-1 rounded d-flex">
//                 <button type="button" class="btn btn-primary p-1 me-sm-3 me-1 ms-sm-5 text-uppercase" id="update">Обновить</button>
//                 <button type="button" class="btn btn-primary p-1 me-sm-3 me-1 text-uppercase" id="backBtn">Назад</button>
//                 <button type="button" class="btn btn-primary p-1 me-sm-3 text-uppercase" id="homePageBtn">Домой</button>
//                 <p class="ms-auto px-4 fs-5">Выдача</p>
//             </div>
    
//             <div class="list-tables-issuance d-flex flex-wrap gap-2" id="listTablesIssuance"></div>
    
//             <div class="open-checks-container" id="openChecksContainerIssuance"></div>
    
//         </div>
//     `
    
//     app.innerHTML = issuanceStartHtml               //   отрисовываем страницу администатора
    
//     let update = document.querySelector('#update')
//     update.addEventListener('click', issuance)      //  вызов функции по отрисовке текущей страницы (обновление)
//     // setInterval(issuance, 10000)                      //  автоматическое обновление текущей страницы через временной интервал 10 сек

//     const homePageBtn = document.querySelector('#homePageBtn')
//     homePageBtn.addEventListener('click', homePage)       //  вызов функции по отрисовке стартовой страницы

//     const backBtn = document.querySelector('#backBtn')
//     backBtn.addEventListener('click', kitchenМenu)       //  вызов функции по отрисовке страницы официанта


//     const listTablesIssuance = document.querySelector('#listTablesIssuance')
//     function htmlBlockTablesFormation(dataArr) {
//         listTablesIssuance.innerHTML = ''
//         for(let i = 0; i < dataArr.length; i++) {
//             let sum = sumorderAmountTable(dataArr[i].number)
//             listTablesIssuance.insertAdjacentHTML('beforeEnd', `
//                 <div class="table text-center" data-table = ${dataArr[i].number}>
//                     <p>стол ${dataArr[i].number}</p>
//                     <p>${sum? sum +' р.' : 'чеков нет'}</p>
//                 </div>
//                 `
//             )
//         }
//     }
//     htmlBlockTablesFormation(getListTables())

//     function sumorderAmountTable(tableNumber) {      // принимает номер столика и возвращает сумму всех чеков по этому столику 
//         return getListCurrentOrders()
//             .filter(x => x.table === tableNumber)
//             .reduce((a, x) => a + x.price * x.quantity, 0);
//     }

//     // console.log(getListCurrentOrders())

//     function colorCodingTablesCurrentWaiter(arrOrder)  {                 //  цветовая маркировка столов текущего официанта при загрузке страницы
//         let arrayActiveTables = []                    // соберем в массив номера открытых столиков перебирая массив заказов и не дублируя данные
//         arrOrder.forEach( (el) => {
//             if (!arrayActiveTables.includes(el.table)) {
//                 arrayActiveTables.push(el.table);
//             }
//         })

//         let table = document.getElementsByClassName('table')     // получаем коллекцию html элементов столиков
        
//         for(let el of table) {                             // перебираем , сравниваем с массивом активных столиков текущего официанта и устанавливаем цветовую метку
//             let active = arrayActiveTables.some((num) => {
//                 return num == +el.dataset.table
//             })
//             if(active) {
//                 el.classList.add('active-waiter-tables')
//             }
//         }
//     }
    
//     colorCodingTablesCurrentWaiter(getListCurrentOrders())

//     function colorCodingSelectedTable(event) {             // добавляем цветовую маркировку блокам с выбранным столиком 
//         let arr = event.currentTarget.children
//         for(let el of arr) {
//             el.classList.remove('active-waiter-selection')
//         }
//         event.target.closest('.table').classList.add('active-waiter-selection')
//     }


//     const openChecksContainerIssuance = document.querySelector('#openChecksContainerIssuance')
//     function showCurrentOrders(currentOrdersArr, numTable) {       //  отображение на странице информации о текущих заказах по каждому столику
//         openChecksContainerIssuance.innerHTML = ''
//         let elText =''
//         currentOrdersArr.forEach((el) => {
//             if(el.table == numTable) {
//                 let btnGiveOut = !el.issued ? `<button type="button" class="btn btn-success btn-sm">Выдать</button>` : ''    // это кнопка выдать
//                 elText += `<p class="mb-0" data-idDish = ${el.idDish}>${el.nameDish}<span class="d-inline-block ms-4 fw-bold"><span>${el.quantity} шт.</span>&emsp;<span>${el.teme}</span>&emsp;<span>${el.price * el.quantity} р.</span><span>${showLogoStatusDish(el)}</span></span> ${btnGiveOut}</p>`

//             }
//         }
//         )
//         openChecksContainerIssuance.insertAdjacentHTML('beforeend' , `
//             <div class="open-checks card-design">
//                 <h2 class="fs-4 border-bottom  border-black">Открытый чек столика N <span>${numTable}</span></h2>
//                 ${elText}
//             </div>
//         `)

//     }

//     // возможно нужно будет удалить
//     function showLogoStatusDish(el) { // вывод логотипа статуса блюда
//         let htmlImg = `<img src="images/icons/cook.png" class="chef-card icon ms-2"></img>`
//         console.log(el)
//         if(el.ready) {
//             htmlImg = `<img src="images/icons/ready-meal.png" class="chef-card icon ms-2"></img>`
//         }
//         if(el.issued) {
//             htmlImg = `<img src="images/icons/waiter.png" class="chef-card icon ms-2"></img>`
//         }
//         return htmlImg
//     } 

    

//     listTablesIssuance.addEventListener('click', selectedTable)  
//     function selectedTable(event) {                  // действие при клике на выбранный столик
//         if(!event.target.closest('.table')) {    
//             return
//         }

//         colorCodingSelectedTable(event)               // добавляем цветовую маркировку блокам с выбранным столиком 
//         showCurrentOrders(getListCurrentOrders(), +event.target.closest('.table').dataset.table)    // передадим массив текущие заказы и номер столика на который кликает официант
//         console.log(+event.target.closest('.table').dataset.table)

//     }

//     openChecksContainerIssuance.addEventListener('click', issuedBtn)                   // прослушивание кнопок выдано
//     function issuedBtn(event) {
//         if(!event.target.closest('button')) {    
//             return
//         }

//         let arr = getListCurrentOrders()


//         for(let i = 0; i < arr.length; i++ ) {
//             if(+event.target.closest('p').dataset.iddish == arr[i].idDish) {
//                 arr[i].issued = true
//             }
//         }
//         changeCurrentOrders(arr)
//     }
// }