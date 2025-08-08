import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
});

export class CartItemService {
    constructor() {
        this.api = api;
    }

    async getAllCartItems(cartId) {
        try {
            const res = await this.api.get(`/cart-item/all/${cartId}`);
            return res.data;
        } catch (error) {
            if (error.response && error.response.status === 403) {
            console.warn('Acceso denegado al obtener los items del carrito:', error);
            } else {
            console.error('Error al obtener los items del carrito:', error);
            }
            return false;
        }
    }

    async createCartItem(cartItemData) {
        try {
            const res = await this.api.post('/cart-item/', cartItemData);
            return res.data;
        } catch (error) {
            console.error('Error al crear el item del carrito:', error);
            return false;
        }
    }

    async getCartItemById(cartItemId) {
        try {
            const res = await this.api.get(`/cart-item/${cartItemId}`);
            return res.data;
        } catch (error) {
            console.error('Error al obtener el item del carrito por ID:', error);
            return false;
        }
    }
}