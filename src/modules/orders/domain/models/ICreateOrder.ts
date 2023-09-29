import { IProduct } from "@modules/products/domain/models/IProduct";

export interface ICreateOrder {
  customer_id: string;
  products: IProduct[];
}
