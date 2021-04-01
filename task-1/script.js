"use strict";

var userNumber = parseInt(prompt("Введите число ХХХ"));

function calc(num, method){
    if (method == "сотни"){
        if (num < 100){
            return 0
        } else {
            return parseInt(num/100)
        }
    };
    if (method == "десятки"){
        num = num % 100;
        if (num < 10){
            return 0
        } else {
            return parseInt(num/10)
        }
    };
    if (method == "еденицы"){
        num = num % 100;
        return (num % 10)
    }
};

if (userNumber > 999 || userNumber < 0){
        console.log("Слишком большое число (или меньше нуля)")
        let obj = {};
        console.log(obj)
}else{
    let obj = {
        "сотни":calc(userNumber,"сотни"),
        "десятки":calc(userNumber,"десятки"),
        "еденицы":calc(userNumber,"еденицы")
    };

    console.log(obj)
}