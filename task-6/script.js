function plus(a, b){
    return a + b;
};

function minus(a, b){
    return a - b;
}

function mul(a, b){
    return a * b;
};

function del(a, b){
    return a / b;
};


function mathOperation(arg1, arg2, operation){
    switch (operation){
        case "плюс":
            return plus(arg1, arg2);
        case "минус":
            return minus(arg1, arg2);
        case "умножить":
            return mul(arg1, arg2);
        case "разделить":
            return del(arg1, arg2);  
    }
};

let a = 5;
let b = 5;
let op = "разделить";

res = mathOperation(a, b, op);
console.log(res);