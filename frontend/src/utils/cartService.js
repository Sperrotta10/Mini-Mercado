import { api } from './api'

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

    async DeleteCart(cart_id){
        try {
            const res = await this.api.delete(`/cart/${cart_id}`);
            return res.data;
        } catch (error) {
            console.error('Error al eliminar el carrito:', error);
            return false;
        }
    }

    

    
}
