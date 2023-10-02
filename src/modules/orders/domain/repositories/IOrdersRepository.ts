import { ICustomer } from "@modules/customers/domain/models/ICustomer";
import { IOrder } from "../models/IOrder";

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: ICustomer;
  products: IProduct[];
}

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | undefined>;
  createOrder({customer, products}: IRequest): Promise<IOrder>;
  // create(data: ICreateCustomer): Promise<ICustomer>;
  // save(customer: ICustomer): Promise<ICustomer>;
}