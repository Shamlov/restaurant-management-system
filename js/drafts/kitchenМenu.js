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