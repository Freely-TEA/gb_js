function countBasketPrice(basket){
    _sum = 0;
    for (const prod of basket){
        _sum += product[prod[0]][2] * prod[1]
    };
    return _sum
};


// [id,name,cost]
var product = [
    [0,"meat",20],
    [1,"tomato",10],
    [2,"pepper",5]
];

// [id, count]
let basket = [
    [0,1],
    [2,4]
];



console.log(countBasketPrice(basket))