const listDishesMenu = [

]

const elementRestaurantMenuCategoriesModal = document.querySelector('#elementRestaurantMenuCategories')
const restaurantCategoriesTopMenu = document.querySelector('#restaurantCategoriesTopMenu')
const modalButtons = document.querySelector('#modalButtons')       // блок кнопок в модальном окне
const menuCategories = document.querySelector('#menuCategories')   // блок основного меню с картачками блюд

modalButtons.addEventListener('click', modalButtonsClickSelect)    // отслеживание кликов в на кнопки в модальном окне

function modalButtonsClickSelect(event) {                          // определяем по какой кнопке произошло нажатие
    if(event.target.hasAttribute('data-delete')) {
        console.log('удалить')
    }
    if(event.target.hasAttribute('data-close')) {
        console.log('закр')
    }
    if(event.target.hasAttribute('data-save')) {
        console.log('сохр')
        getDataFormChangeDish ()    //  получим данные из формы модального окна при клике сохранить
    }
}



// имитация запроса на сервер.  категории блюд
async function requestListCtegories() {       /// как имитировать запрос на сервер????????????????????????????????????????????????
    const restaurantMenuCategories = ['Холодные закуски', 'Горячие закуски', 'Салаты', 'Супы', 'Основные блюда', 'Блюда на гриле', 'Гарниры', 'Десерты', 'Напитки',] 
    restaurantMenuCategoriesUpdateModal(restaurantMenuCategories)        // запуск функции с передачей списка категорий блюд в модальное окно
    restaurantMenuCategoriesUpdateTopMenu(restaurantMenuCategories)      // запуск функции с передачей списка категорий блюд в верхнее выпадающее меню
    showMenuCategories(restaurantMenuCategories)                         // вывод категорий блюд на основной экран 
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
    console.log(elementRestaurantMenuCategoriesModal.dataset)
    let data = new dishСard(elementRestaurantMenuCategoriesModal.value, price.value, nameDish.value, description.value, recipe.value,)
    sendDataServer(data)
}

// как имитировать отправку данных на сервер ???????????????????????????????
async function sendDataServer(data) {   // отправка данных отдельного блюда на сервер . сейчас добавляется в массив listDishesMenu
    listDishesMenu.push(data)
    console.log(listDishesMenu)
    showMenuCards()   //   ...............................................
}


// вывод катрочек блюд на экран

function showMenuCategories(categories) {     // категории заполняются автоматически из массива
    categories.forEach((el, index) => {
        menuCategories.insertAdjacentHTML('beforeEnd', `<div class="menu-category"><h4 class="menuCategory">${el} &#9660</h4></div>`)
    });
    showMenuCards()        //как только категории основного экрана заполнены ,  вызываем функцию показа карточек 
}


// не могу сообразить как сделать. в моем представлении хочу пройти по html коду. получая категории блюд из текстого поля . поля к этому моменту уже заполнены . 
// сравнивать значения из html и категорию из  обекта который в котором есть значение категории и сразу добавлять в html.   если есть способ проще, скажите.
function showMenuCards() {
    const menuCategory = document.getElementsByClassName('menuCategory')
    for(let i = 0; i < menuCategory.length; i++) {
        // console.log(menuCategory[i].textContent)
        listDishesMenu.forEach((el) => {
            if(el.category == 'Супы') {    // пока сравним напрямую 
                menuCategory.insertAdjacentHTML('beforeEnd',`<p>456789</p>`)
            }
        })
    }

}
// function 
