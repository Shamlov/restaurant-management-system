const listDishesMenu = [
    {   
        id: 1,
        stop: true,
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
        stop: true,
        go: false,
        category: 'Блюда на гриле',
        price: 800,
        nameDish: 'Шашлык по кавказски',
        description: 'Невероятный аромат и вкус шашлыка у многих ассоциируется с весенне-летней порой. Это блюдо неизменно связано с кавказской кухней. Считается, что именно представители Кавказа разбираются в том, как мариновать и как готовить мясо.',
        recipe: 'Промойте мясо под проточной водой. Обсушить можно при помощи бумажных салфеток. Нарежьте мясо на небольшие порционные кусочки, которые можно будет нанизать на шампуры. Репчатый лук следует нарезать кольцами. Сложите мясо в глубокую миску. Сложите туда лук, пряности, перец, соль. В отдельной посуде смешайте гранатовый сок с винным уксусом. Этой жидкостью залейте мясо и перемешайте. Укройте мясо в миске пленкой и оставьте мариноваться. Чтобы мясо хорошо пропиталось, потребуется около 10 часов. Для обжарки одной порции потребуется около 20 минут.',
    }
]

const restaurantMenuCategories = ['Холодные закуски', 'Горячие закуски', 'Салаты', 'Супы', 'Основные блюда', 'Блюда на гриле', 'Гарниры', 'Десерты', 'Напитки',] 


// stop-list 

const stopList = document.querySelector('#stopList')

async function requestListStopCategories() {                  // имитируем запрос на сервер
    insertStopCategoryList(restaurantMenuCategories)
}
requestListStopCategories()


function insertStopCategoryList(categories) {                    // Формируем наа странице список категорий блюд
    categories.forEach((el) => {
        stopList.insertAdjacentHTML('beforeEnd', `<h5 class="menuCategoryCheckbox ms-2" value="${el}">${el}</h5>`)
    })

    for(let i = 0; i < listDishesMenu.length; i++ )  { 
        showCheckboxList(listDishesMenu[i])                           //как только категории основного экрана заполнены ,  вызываем функцию показа карточек которые есть в массиве
    }
}

function showCheckboxList(data) {                  // вывод на экран чекбоксов по категориям 
    console.log(data)                              // видим что каждый элемент приходит в функцию
    let menuCategoryCheckbox = document.getElementsByClassName('menuCategoryCheckbox')
    for(let i = 0; i < menuCategoryCheckbox.length; i++) {
        if(menuCategoryCheckbox[i].textContent == data.category) {
            let choice = ""
            if(data.stop) {
                choice = 'checked'
            }
            menuCategoryCheckbox[i].insertAdjacentHTML('afterEnd', `
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
    for(let i = 0; i < inputChek.length; i++) {
        
        console.log(inputChek[i].value)    // Не могу получить выбранный чекбокс. истина или лож
    }
    
    console.log(listDishesMenu, 'проверяем внесенные изменения')
}