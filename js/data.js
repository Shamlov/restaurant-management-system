let restaurantMenuCategories = ['Холодные закуски', 'Горячие закуски', 'Салаты', 'Супы', 'Основные блюда', 'Блюда на гриле', 'Гарниры', 'Десерты', 'Напитки',] 

export function changeRestaurantMenuCategories(a) {
    restaurantMenuCategories = a
};
export function getRestaurantMenuCategories() {
    return restaurantMenuCategories
};

// ////////////////////////////////////////////////////////
// список столиков)))
let listTables = [
    {
        number: 1,
        description: 'Столик у окна'
    },
    {
        number: 2,
        description: 'Столик у входа'
    },
    {
        number: 3,
        description: 'Столик у бара'
    },
    {
        number: 4,
        description: 'Ромашка'
    },
    {
        number: 5,
        description: 'Диван'
    },
    {
        number: 6,
        description: 'Уличный столик'
    },
    {
        number: 7,
        description: 'Бар'
    },
]

export function getListTables() {
    return listTables
};


////////
let listDishesMenu = [
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
    },
    {
        id: 4,
        stop: false,
        go: false,
        category: 'Блюда на гриле',
        price: 800,
        nameDish: 'Манты',
        description: 'Невероятный аромат и вкус шашлыка у многих ассоциируется с весенне-летней порой. Это блюдо неизменно связано с кавказской кухней. Считается, что именно представители Кавказа разбираются в том, как мариновать и как готовить мясо.',
        recipe: 'Промойте мясо под проточной водой. Обсушить можно при помощи бумажных салфеток. Нарежьте мясо на небольшие порционные кусочки, которые можно будет нанизать на шампуры. Репчатый лук следует нарезать кольцами. Сложите мясо в глубокую миску. Сложите туда лук, пряности, перец, соль. В отдельной посуде смешайте гранатовый сок с винным уксусом. Этой жидкостью залейте мясо и перемешайте. Укройте мясо в миске пленкой и оставьте мариноваться. Чтобы мясо хорошо пропиталось, потребуется около 10 часов. Для обжарки одной порции потребуется около 20 минут.',
    }
];

export function changeListDishesMenu(a) {
    listDishesMenu = a
};
export function getListDishesMenu() {
    return listDishesMenu
};

// массив объектов заказанных позиций /////////////////////////////////////////////////////////////////////////////////\\

const currentOrders = [
    {
        uniqueOrderDishNumber: 2312431,
        table: 3,
        teme: '23:12:43',
        orderNumber: '231243',
        waiter: 1,
        ready: true,
        comment: 'тут ваш комментарий к блюду 11111',
        cancel: false,
        quantity: 2,
        id: 4,
        stop: false,
        go: false,
        category: 'Блюда на гриле',
        price: 1000,
        nameDish: '4564Манты',
        description: 'Невероятный аромат и вкус шашлыка у многих ассоциируется с весенне-летней порой. Это блюдо неизменно связано с кавказской кухней. Считается, что именно представители Кавказа разбираются в том, как мариновать и как готовить мясо.',
        recipe: 'Промойте мясо под проточной водой. Обсушить можно при помощи бумажных салфеток. Нарежьте мясо на небольшие порционные кусочки, которые можно будет нанизать на шампуры. Репчатый лук следует нарезать кольцами. Сложите мясо в глубокую миску. Сложите туда лук, пряности, перец, соль. В отдельной посуде смешайте гранатовый сок с винным уксусом. Этой жидкостью залейте мясо и перемешайте. Укройте мясо в миске пленкой и оставьте мариноваться. Чтобы мясо хорошо пропиталось, потребуется около 10 часов. Для обжарки одной порции потребуется около 20 минут.',
    },
    // {
    //     uniqueOrderDishNumber: 1111,
    //     table: 3,
    //     teme: '23:12:43',
    //     orderNumber: '8888888',
    //     waiter: 1,
    //     ready: false,
    //     comment: 'тут ваш комментарий к блюду 11111',
    //     cancel: false,
    //     quantity: 2,
    //     id: 4,
    //     stop: false,
    //     go: false,
    //     category: 'Блюда на гриле',
    //     price: 777777777,
    //     nameDish: 'Манты',
    //     description: 'Невероятный аромат и вкус шашлыка у многих ассоциируется с весенне-летней порой. Это блюдо неизменно связано с кавказской кухней. Считается, что именно представители Кавказа разбираются в том, как мариновать и как готовить мясо.',
    //     recipe: 'Промойте мясо под проточной водой. Обсушить можно при помощи бумажных салфеток. Нарежьте мясо на небольшие порционные кусочки, которые можно будет нанизать на шампуры. Репчатый лук следует нарезать кольцами. Сложите мясо в глубокую миску. Сложите туда лук, пряности, перец, соль. В отдельной посуде смешайте гранатовый сок с винным уксусом. Этой жидкостью залейте мясо и перемешайте. Укройте мясо в миске пленкой и оставьте мариноваться. Чтобы мясо хорошо пропиталось, потребуется около 10 часов. Для обжарки одной порции потребуется около 20 минут.',
    // },
    {
        uniqueOrderDishNumber: 2312433,
        table: 3,
        teme: '23:12:43',
        orderNumber: '8888888',
        waiter: 1,
        ready: true,
        comment: 'тут ваш комментарий к блюду 11111',
        cancel: false,
        quantity: 2,
        id: 4,
        stop: false,
        go: false,
        category: 'Блюда на гриле',
        price: 700,
        nameDish: '43Манты',
        description: 'Невероятный аромат и вкус шашлыка у многих ассоциируется с весенне-летней порой. Это блюдо неизменно связано с кавказской кухней. Считается, что именно представители Кавказа разбираются в том, как мариновать и как готовить мясо.',
        recipe: 'Промойте мясо под проточной водой. Обсушить можно при помощи бумажных салфеток. Нарежьте мясо на небольшие порционные кусочки, которые можно будет нанизать на шампуры. Репчатый лук следует нарезать кольцами. Сложите мясо в глубокую миску. Сложите туда лук, пряности, перец, соль. В отдельной посуде смешайте гранатовый сок с винным уксусом. Этой жидкостью залейте мясо и перемешайте. Укройте мясо в миске пленкой и оставьте мариноваться. Чтобы мясо хорошо пропиталось, потребуется около 10 часов. Для обжарки одной порции потребуется около 20 минут.',
    },
    {
        uniqueOrderDishNumber: 2312434,
        table: 5,
        teme: '23:12:43',
        orderNumber: '8888888',
        waiter: 1,
        ready: false,
        comment: 'тут ваш комментарий к блюду 11111',
        cancel: false,
        quantity: 6,
        id: 4,
        stop: false,
        go: false,
        category: 'Блюда на гриле',
        price: 100,
        nameDish: 'Манты',
        description: 'Невероятный аромат и вкус шашлыка у многих ассоциируется с весенне-летней порой. Это блюдо неизменно связано с кавказской кухней. Считается, что именно представители Кавказа разбираются в том, как мариновать и как готовить мясо.',
        recipe: 'Промойте мясо под проточной водой. Обсушить можно при помощи бумажных салфеток. Нарежьте мясо на небольшие порционные кусочки, которые можно будет нанизать на шампуры. Репчатый лук следует нарезать кольцами. Сложите мясо в глубокую миску. Сложите туда лук, пряности, перец, соль. В отдельной посуде смешайте гранатовый сок с винным уксусом. Этой жидкостью залейте мясо и перемешайте. Укройте мясо в миске пленкой и оставьте мариноваться. Чтобы мясо хорошо пропиталось, потребуется около 10 часов. Для обжарки одной порции потребуется около 20 минут.',
    },
    {
        uniqueOrderDishNumber: 2312434,
        table: 5,
        teme: '23:12:43',
        orderNumber: '8888888',
        waiter: 1,
        ready: false,
        comment: 'тут ваш комментарий к блюду 11111',
        cancel: false,
        quantity: 3,
        id: 4,
        stop: false,
        go: false,
        category: 'Блюда на гриле',
        price: 1,
        nameDish: 'Манты',
        description: 'Невероятный аромат и вкус шашлыка у многих ассоциируется с весенне-летней порой. Это блюдо неизменно связано с кавказской кухней. Считается, что именно представители Кавказа разбираются в том, как мариновать и как готовить мясо.',
        recipe: 'Промойте мясо под проточной водой. Обсушить можно при помощи бумажных салфеток. Нарежьте мясо на небольшие порционные кусочки, которые можно будет нанизать на шампуры. Репчатый лук следует нарезать кольцами. Сложите мясо в глубокую миску. Сложите туда лук, пряности, перец, соль. В отдельной посуде смешайте гранатовый сок с винным уксусом. Этой жидкостью залейте мясо и перемешайте. Укройте мясо в миске пленкой и оставьте мариноваться. Чтобы мясо хорошо пропиталось, потребуется около 10 часов. Для обжарки одной порции потребуется около 20 минут.',
    },
    {
        uniqueOrderDishNumber: 2312434,
        table: 5,
        teme: '23:12:43',
        orderNumber: '344',
        waiter: 1,
        ready: false,
        comment: 'тут ваш комментарий к блюду 11111',
        cancel: false,
        quantity: 2,
        id: 4,
        stop: false,
        go: false,
        category: 'Блюда на гриле',
        price: 10,
        nameDish: 'Манты',
        description: 'Невероятный аромат и вкус шашлыка у многих ассоциируется с весенне-летней порой. Это блюдо неизменно связано с кавказской кухней. Считается, что именно представители Кавказа разбираются в том, как мариновать и как готовить мясо.',
        recipe: 'Промойте мясо под проточной водой. Обсушить можно при помощи бумажных салфеток. Нарежьте мясо на небольшие порционные кусочки, которые можно будет нанизать на шампуры. Репчатый лук следует нарезать кольцами. Сложите мясо в глубокую миску. Сложите туда лук, пряности, перец, соль. В отдельной посуде смешайте гранатовый сок с винным уксусом. Этой жидкостью залейте мясо и перемешайте. Укройте мясо в миске пленкой и оставьте мариноваться. Чтобы мясо хорошо пропиталось, потребуется около 10 часов. Для обжарки одной порции потребуется около 20 минут.',
    }
];

export function changeCurrentOrders(a) {
    currentOrders = a
};
export function getListCurrentOrders() {
    return currentOrders
};

// 