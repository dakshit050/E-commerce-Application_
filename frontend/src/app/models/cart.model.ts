import { ProductModelServer } from './product.model';

export interface CartModelServer {
  Total: number;
  Product:[{
    Data:ProductModelServer,
    quantity:number
  }];
}
export interface CartModelClient{
  Total:number;
  Product:[{
    id:number,
    quantity:number
  }]
}
