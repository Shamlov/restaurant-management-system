import { changeRestaurantMenuCategories } from '../data.js'
import { getRestaurantMenuCategories } from '../data.js'
import { changeListDishesMenu } from '../data.js'
import { getListDishesMenu } from '../data.js'

// go-list 

let app = document.querySelector('#app')    // Удалить при переносе
let goListHeader = `
    <div class="window-kitchen container-fluid canvas-color pb-1">
        <div class="top-menu-buttons menu-color p-1 mb-1 rounded">
            <a href="kitchen.html" type="button" class="btn btn-primary me-3 ms-5 text-uppercase">Назад</a>
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