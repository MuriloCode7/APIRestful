import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';
import Customer from '@modules/customers/typeorm/entities/Customer';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
  /* Essa busca retorna uma promessa, sendo um objeto product ou undefined
  Caso a busca nao gere resultado
  */
  public async findById(id: string): Promise<Order | undefined> {
    // A seguinte constante recebera o id do pedido, os produtos do pedido
    // e os dados do cliente
    const order = this.findOne(id, {
      relations: ['order_Products', 'customer'],
    });
    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);
    return order;
  }
}
