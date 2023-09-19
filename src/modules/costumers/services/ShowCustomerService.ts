import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  customer_id: string;
}

export default class ShowProfileService {
  public async execute({ customer_id }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}
