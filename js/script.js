const listDishesMenu = [
    {   
        id: 1,
        stop: false,
        go: false,
        category: 'Супы',
        price: 380,
        nameDish: 'Борщ классический',
        description: 'Борщ - блюдо украинской кухни. Существует его классический вариант и вариации. Привнесения в рецепт связаны с региональностью. Так, борщ готовят со свеклой, но и свекла разрая бывает.',
        recipe: 'Подготавливают все необходимые продукты. Если чернослив сухой, заливают его кипятком на 10-15 минут. Выкладывают мясо в кастрюлю, заливают холодной водой. Доводят до кипения, снимают пену и варят мясо 1,5 часа на маленьком огне, под крышкой. Свеклу очищают, нарезают соломкой. Обычно свёклу тушат в сковороде с добавлением лимонного сока или уксуса - можно сделать именно так. Но в этом рецепте свёкла добавляется в бульон в сыром виде и варится вместе с картошкой и капустой.',
    },
    {
        id: 2,
        stop: false,
        go: false,
        category: 'Блюда на гриле',
        price: 500,
        nameDish: 'Шашлык по кавказски из свинины с луком',
        description: 'Невероятный аромат и вкус шашлыка у многих ассоциируется с весенне-летней порой. Это блюдо неизменно связано с кавказской кухней. Считается, что именно представители Кавказа разбираются в том, как мариновать и как готовить мясо.',
        recipe: 'Промойте мясо под проточной водой. Обсушить можно при помощи бумажных салфеток. Нарежьте мясо на небольшие порционные кусочки, которые можно будет нанизать на шампуры. Репчатый лук следует нарезать кольцами. Сложите мясо в глубокую миску. Сложите туда лук, пряности, перец, соль. В отдельной посуде смешайте гранатовый сок с винным уксусом. Этой жидкостью залейте мясо и перемешайте. Укройте мясо в миске пленкой и оставьте мариноваться. Чтобы мясо хорошо пропиталось, потребуется около 10 часов. Для обжарки одной порции потребуется около 20 минут.',
    },
    {
        id: 3,
        stop: false,
        go: false,
        category: 'Блюда на гриле',
        price: 800,
        nameDish: 'Шашлык по кавказски',
        description: 'Невероятный аромат и вкус шашлыка у многих ассоциируется с весенне-летней порой. Это блюдо неизменно связано с кавказской кухней. Считается, что именно представители Кавказа разбираются в том, как мариновать и как готовить мясо.',
        recipe: 'Промойте мясо под проточной водой. Обсушить можно при помощи бумажных салфеток. Нарежьте мясо на небольшие порционные кусочки, которые можно будет нанизать на шампуры. Репчатый лук следует нарезать кольцами. Сложите мясо в глубокую миску. Сложите туда лук, пряности, перец, соль. В отдельной посуде смешайте гранатовый сок с винным уксусом. Этой жидкостью залейте мясо и перемешайте. Укройте мясо в миске пленкой и оставьте мариноваться. Чтобы мясо хорошо пропиталось, потребуется около 10 часов. Для обжарки одной порции потребуется около 20 минут.',
    }
]



// editing-menu

const elementRestaurantMenuCategoriesModal = document.querySelector('#elementRestaurantMenuCategories')
const restaurantCategoriesTopMenu = document.querySelector('#restaurantCategoriesTopMenu')
const modalButtons = document.querySelector('#modalButtons')       // блок кнопок в модальном окне
const menuCategories = document.querySelector('#menuCategories')   // блок основного меню с картачками блюд

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
    id = listDishesMenu.length + 1
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
    listDishesMenu.push(data)
    showMenuCards(data)
    console.log(listDishesMenu)
}


// вывод катрочек блюд на экран

function showMenuCategories(categories) {     // категории заполняются автоматически из массива
    categories.forEach((el, index) => {
        menuCategories.insertAdjacentHTML('afterBegin', `<div class="menu-category"><h4 class="menuCategory d-inline-block">${el}</h4></div>`)
    });

    for(let i = 0; i < listDishesMenu.length; i++ )  { 
        showMenuCards(listDishesMenu[i])                           //как только категории основного экрана заполнены ,  вызываем функцию показа карточек которые есть в массиве
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