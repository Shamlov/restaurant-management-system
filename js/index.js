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
                menuCategory[i].insertAdjacentHTML('afterEnd', 
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


