'use strict';

var cart = {
    products: [
        {id: 1, title: 'Перец', price: 60, count: 2},
        {id: 2, title: 'Мясо', price: 200, count: 1}
    ],

    updateCart(event) {
        //по сути тут должен быть запрос к бд, но сделаю цикл переборки
        let id = event.target.id;
        for (let i=0; i < this.products.length; i++){ //если в корзине будет такой, то просто прибавим к счётчику
            if (this.products[i].id == id) {
                this.products[i].count++;
                this.render();
                return 0
            }
        }
        //если в корзине нет такого
        for (let product of catalog.products){
            if (product.id == id){
                this.products.push({id:product.id, title:product.title, price:product.price, count:1});
                this.render()
                return 0
            }
        }
        alert("ERROR this product doesnt exists" + id)
    },

    removeFromCart(event) {
        let id = event.target.id;
        for (let i = 0; i < this.products.length; i++){
            if (id == this.products[i].id){
                this.products[i].count -= 1
                if (this.products[i].count == 0){
                    this.products.splice(i, 1)
                };
                this.render();
                break
            }
        }
    },

    getTotalPrice() {
        let _sum = 0;
        let count = 0;
        for (const prod of this.products){
            _sum += prod.price * prod.count;
            count += 1
        };
        return [count, _sum]
    },

    render() {
        var containerElement = document.querySelector('#cart');
        containerElement.innerHTML = "";
        containerElement.innerText = "КАТАЛОГ"
        if (this.products.length === 0){
            containerElement.innerHTML = 'Корзина пуста';
        } else {
            for (let product of this.products){
                let position = document.createElement('div');
                position.className = 'cart_product_section';
                position.id = product.id;

                let image = new Image();
                image.src = 'img/min/' + product.id + '.jpg';
                image.className = 'image_product';
                image.addEventListener('click', (event) => imageViever.openFullImage(event));
                position.appendChild(image);

                let b = document.createElement('b');
                b.innerHTML = product.title;
                position.appendChild(b);

                b = document.createElement('b');
                b.innerHTML = 'Кол-вo: ' + product.count;
                position.appendChild(b);

                let button = document.createElement('button');
                button.className = 'button_remove';
                button.id = product.id;
                button.addEventListener('click', (event) => cart.removeFromCart(event));
                button.innerText = 'Remove';
                position.appendChild(button);
                
                containerElement.appendChild(position);
            };
            let cartInfo = this.getTotalPrice();
            let b = document.createElement('b');
            b.innerHTML = 'В корзине ' + cartInfo[0] + ' товара(ов) на сумму ' + cartInfo[1];
            containerElement.appendChild(b);

        };
    }
};

var catalog = {
    products : [
        {id: 0, title: 'Салат', price: 100, count: 2476},
        {id: 1, title: 'Перец', price: 60, count: 2123},
        {id: 2, title: 'Мясо', price: 200, count: 1451}
    ],

    render() {
        let containerElement = document.querySelector('#product');
        containerElement.innerText = "КАТАЛОГ"
        for (let product of this.products){
            let position = document.createElement('div');
            position.className = 'catalog_product_section';
            position.id = product.id;

            let image = new Image();
            image.src = 'img/min/' + product.id + '.jpg';
            image.className = 'image_product';
            image.addEventListener('click', (event) => imageViever.openFullImage(event));
            position.appendChild(image);

            let b = document.createElement('b');
            b.innerHTML = product.title;
            position.appendChild(b);

            b = document.createElement('b');
            b.innerHTML = 'Стоимость: ' + product.price;
            position.appendChild(b);

            let button = document.createElement('button');
            button.className = 'button_buy';
            button.id = product.id;
            button.addEventListener('click', (event) => cart.updateCart(event));
            button.innerText = 'Buy';
            position.appendChild(button);
            
            containerElement.appendChild(position);
        };
    }

    
};

var imageViever = {
    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'img/close.png',
    },

    openFullImage(event) {
        let src = event.target.src;
        src = src.replace(/min/g,"max");
        let galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close()); // this.close.bind(this);
        galleryWrapperElement.appendChild(closeImageElement);

        const image = new Image();
        image.src = src
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);

        document.body.appendChild(galleryWrapperElement);
    },

    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    }
}
cart.render()
catalog.render()