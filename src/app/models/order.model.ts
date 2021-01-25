import { Cart } from './cart.model';

export class Order {
  constructor(public _id: string,
              public createdAt: string,
              public delivered: boolean,
              public paid: boolean,
              public userId: string,
              public products: Cart[]) { }
}
