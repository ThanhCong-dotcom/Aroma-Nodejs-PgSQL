'use strict';

module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};  // sản phẩm
    this.totalQuantity = oldCart.totalQuantity || 0; // toogr sl giỏ hàng
    this.totalPrice = oldCart.totalPrice || 0; // tổng giá tất cả sản phẩm
    this.address = oldCart.address || {};
    this.paymentMethod = oldCart.paymentMethod || "COD";

    this.getTotalQuantity = () => {
        var quantity = 0;
        for (var id in this.items) {
            quantity += parseInt(this.items[id].quantity);
        }
        return quantity;
    };

    this.getTotalPrice = () => {
        var price = 0;
        for (var id in this.items) {
            price += parseFloat(this.items[id].price);
        }
        price = parseFloat(price).toFixed(2);
        return price;
    };

    this.add = (item, id, quantity) => { /// quantity => số lượng
        var storedItem = this.items[id];
        if (!storedItem) {
            this.items[id] = { item: item, quantity: 0, price: 0 }; // price số lượng * giá tiền
            storedItem = this.items[id];
        }
        storedItem.item.price = parseFloat(storedItem.item.price);
        storedItem.quantity += parseInt(quantity);
        storedItem.price = parseFloat(storedItem.item.price * storedItem.quantity);
        this.totalQuantity = this.getTotalQuantity();
        this.totalPrice = this.getTotalPrice();
        return this.getCartItem(id);
    };

    this.remove = (id) => {
        var storedItem = this.items[id];
        if (storedItem) {
            delete this.items[id];
            this.totalQuantity = this.getTotalQuantity();
            this.totalPrice = this.getTotalPrice();
        }
    };

    this.update = (id, quantity) => {
        var storedItem = this.items[id];
        if (storedItem && quantity >= 1) {
            storedItem.quantity = quantity;
            storedItem.price = parseFloat(storedItem.item.price * storedItem.quantity);
            this.totalQuantity = this.getTotalQuantity();
            this.totalPrice = this.getTotalPrice();
        }
        return this.getCartItem(id);
    };

    this.empty = () => {
        this.items = {};
        this.totalQuantity = 0;
        this.totalPrice = 0;
    };

    this.generateArray = () => { // hàm convert obj thành Array
        var arr = [];
        for (var id in this.items) {
            this.items[id].item.price = parseFloat(this.items[id].item.price).toFixed(2);
            this.items[id].price = parseFloat(this.items[id].price).toFixed(2);
            arr.push(this.items[id]);
        }
        return arr;
    };

    this.getCart = function () {
        var cart = {
            items: this.generateArray(),
            totalQuantity: this.totalQuantity,
            totalPrice: this.totalPrice,
            address: this.address,
            paymentMethod: this.paymentMethod
        };
        return cart;
    }

    this.getCartItem = function (id) {
        var cartItem = {
            item: this.items[id],
            totalQuantity: this.totalQuantity,
            totalPrice: this.totalPrice,
        }
        return cartItem;
    }
};