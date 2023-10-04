import { IProduct } from "../models/IProduct";

export interface IFindProducts {
  id: string;
}

export interface IProductsRepository {
  findByName(name: string): Promise<IProduct | undefined>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  findAll(): Promise<IProduct[]>;
  // create(data: ICreateCustomer): Promise<ICustomer>;
  // save(customer: ICustomer): Promise<ICustomer>;
}
