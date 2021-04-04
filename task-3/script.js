'use strict';

const cart = {
    products: [
        {id: 0, title: 'salat', price: 100, count: 2},
        {id: 1, title: 'pepper', price: 60, count: 2},
        {id: 2, title: 'meat', price: 200, count: 1}
    ],

    addToCart(product, count){
        product.count = count;
        this.products.push(product)
    },

    removeFromCart(productId){
        for (let i = 0; i < this.products.length; ++i){
            if (productId === this.products[i].id){
            this.products.splice(i, 1)
            }
        }
    },

    getTotalPrice() {
        let _sum = 0;
        let count = 0;
        for (const prod of this.products){
            console.log(prod);
            _sum += prod.price * prod.count;
            count += 1
        };
        return [count, _sum]
    }
};

const products = [
    {id: 0, title: 'Салат', price: 100, count: 2476},
    {id: 1, title: 'Перец', price: 60, count: 2123},
    {id: 2, title: 'Мясо', price: 200, count: 1451}
];

// корзина
let cartInfo = cart.getTotalPrice();
var containerElement = document.querySelector('#cart');
if (cartInfo[1] === 0){
    containerElement.innerHTML = 'Корзина пуста';
} else {
    containerElement.innerHTML = 'В корзине '
    + cartInfo[0]
    + ' товара(ов) на сумму '
    + cartInfo[1];
};

//каталог
containerElement = document.querySelector('#product');
let text = "";
for (const prod of products){
    text += prod.title
    + ' :: '
    + prod.price
    + 'уе :: на складе '
    + prod.count
    + '<br>'
}
containerElement.innerHTML = text;
