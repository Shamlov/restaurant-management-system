import { getListCurrentOrders } from './data.js'
import { getListTables } from './data.js'
import { changeCurrentOrders } from './data.js'

const app = document.querySelector('#app')

function issuance() {
    

    let tableNam = 0      // выбранный столик по умолчанию. в нем меняем значение переменной исходя из клика пользователя
    
    const issuanceStartHtml = `
        <div class="window-issuance container-fluid canvas-color pb-1">
    
            <div class="top-menu-buttons menu-color p-1 mb-1 rounded d-flex">
                <button type="button" class="btn btn-primary p-1 me-sm-3 me-1 ms-sm-5 text-uppercase" id="update">Обновить</button>
                <button type="button" class="btn btn-primary p-1 me-sm-3 me-1 text-uppercase" id="backBtn">Назад</button>
                <button type="button" class="btn btn-primary p-1 me-sm-3 text-uppercase" id="homePageBtn">Домой</button>
                <p class="ms-auto px-4 fs-5">Выдача</p>
            </div>
    
            <div class="list-tables-issuance d-flex flex-wrap gap-2" id="listTablesIssuance"></div>
    
            <div class="open-checks-container" id="openChecksContainerIssuance"></div>
    
        </div>
    `
    
    app.innerHTML = issuanceStartHtml               //   отрисовываем страницу администатора
    
    let update = document.querySelector('#update')
    update.addEventListener('click', issuance)      //  вызов функции по отрисовке текущей страницы (обновление)
    // setInterval(issuance, 10000)                      //  автоматическое обновление текущей страницы через временной интервал 10 сек

    const homePageBtn = document.querySelector('#homePageBtn')
    // homePageBtn.addEventListener('click', homePage)       //  вызов функции по отрисовке стартовой страницы

    const backBtn = document.querySelector('#backBtn')
    // backBtn.addEventListener('click', kitchenМenu)       //  вызов функции по отрисовке страницы официанта


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

    function sumorderAmountTable(tableNumber) {      // принимает номер столика и возвращает сумму всех чеков по этому столику 
        return getListCurrentOrders()
            .filter(x => x.table === tableNumber)
            .reduce((a, x) => a + x.price * x.quantity, 0);
    }

    // console.log(getListCurrentOrders())

    function colorCodingTablesCurrentWaiter(arrOrder)  {                 //  цветовая маркировка столов текущего официанта при загрузке страницы
        let arrayActiveTables = []                    // соберем в массив номера открытых столиков перебирая массив заказов и не дублируя данные
        arrOrder.forEach( (el) => {
            if (!arrayActiveTables.includes(el.table)) {
                arrayActiveTables.push(el.table);
            }
        })

        let table = document.getElementsByClassName('table')     // получаем коллекцию html элементов столиков
        
        for(let el of table) {                             // перебираем , сравниваем с массивом активных столиков текущего официанта и устанавливаем цветовую метку
            let active = arrayActiveTables.some((num) => {
                return num == +el.dataset.table
            })
            if(active) {
                el.classList.add('active-waiter-tables')
            }
        }
    }
    
    colorCodingTablesCurrentWaiter(getListCurrentOrders())

    function colorCodingSelectedTable(event) {             // добавляем цветовую маркировку блокам с выбранным столиком 
        let arr = event.currentTarget.children
        for(let el of arr) {
            el.classList.remove('active-waiter-selection')
        }
        event.target.closest('.table').classList.add('active-waiter-selection')
    }


    const openChecksContainerIssuance = document.querySelector('#openChecksContainerIssuance')
    function showCurrentOrders(currentOrdersArr, numTable) {       //  отображение на странице информации о текущих заказах по каждому столику
        openChecksContainerIssuance.innerHTML = ''
        let elText =''
        currentOrdersArr.forEach((el) => {
            if(el.table == numTable) {
                let btnGiveOut = !el.issued ? `<button type="button" class="btn btn-success btn-sm">Выдать</button>` : ''    // это кнопка выдать
                elText += `<p class="mb-0" data-idDish = ${el.idDish}>${el.nameDish}<span class="d-inline-block ms-4 fw-bold"><span>${el.quantity} шт.</span>&emsp;<span>${el.teme}</span>&emsp;<span>${el.price * el.quantity} р.</span><span>${showLogoStatusDish(el)}</span></span> ${btnGiveOut}</p>`

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

    // возможно нужно будет удалить
    function showLogoStatusDish(el) { // вывод логотипа статуса блюда
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

    

    listTablesIssuance.addEventListener('click', selectedTable)  
    function selectedTable(event) {                  // действие при клике на выбранный столик
        if(!event.target.closest('.table')) {    
            return
        }

        colorCodingSelectedTable(event)               // добавляем цветовую маркировку блокам с выбранным столиком 
        showCurrentOrders(getListCurrentOrders(), +event.target.closest('.table').dataset.table)    // передадим массив текущие заказы и номер столика на который кликает официант
        console.log(+event.target.closest('.table').dataset.table)

    }

    openChecksContainerIssuance.addEventListener('click', issuedBtn)                   // прослушивание кнопок выдано
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



issuance()
