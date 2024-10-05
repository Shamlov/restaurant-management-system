const app = document.querySelector('#app');

// Стартовая страница
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
    }
}

////////////////////////////////////////
