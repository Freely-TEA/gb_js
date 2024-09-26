function countBasketPrice(basket){
    _sum = 0;
    basketSelect:
    for (const userProduct of basket){
        for (const product of catalog){
            if (product.id == userProduct.id){  // сравниваем поочерёдно id
                _sum += product.cost;
                continue basketSelect
            }
        }
    }
    
    return _sum
};

// catalog
// [id,name,cost]
function createProduct(id, name, cost){
    return {id, name, cost}
};

var catalog = [];
catalog.push(createProduct(0, "meat", 20));
catalog.push(createProduct(1, "tomato", 10));
catalog.push(createProduct(2, "pepper", 10));

// basket
// [id, count]
function createBasket(id, count){   // стоило наверн отправлять не ид а сам объект 
    return {id, count}              // но тогда объем занимаемой памяти вырастет
};                                  // как было бы лучше? 

let basket = [];
basket.push(createBasket(2, 4));
basket.push(createBasket(0, 1));



console.log(countBasketPrice(basket))