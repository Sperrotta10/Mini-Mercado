import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
});

export class CartService {
    constructor() {
        this.api = api;
    }

    async getAllCarts() {
        try {
            const res = await this.api.get(`/cart/`);
            return res.data;
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            return false;
        }
    }

    async createCart(cartData) {
        try {
            const res = await this.api.post(`/cart/`, cartData);
            return res.data;
        } catch (error) {
            console.error('Error al crear el carrito:', error);
            return false;
        }
    }

    

    
}
