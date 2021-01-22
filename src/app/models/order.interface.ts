import { Cart } from './cart.model';

export interface Order {
    _id: string;
    createdAt: string;
    delivered: boolean;
    paid: boolean;
    userId: string;
    products: Cart[];
}
