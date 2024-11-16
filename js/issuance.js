import { getListCurrentOrders } from './data.js'
import { getListTables } from './data.js'
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

    function selectedTable() {      // действие при клике на выбранный столик
        
    }

    

}

issuance()
