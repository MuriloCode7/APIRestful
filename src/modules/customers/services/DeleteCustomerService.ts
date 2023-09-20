import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  customer_id: string;
}

export default class DeleteProfileService {
  public async execute({ customer_id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomersRepository);

    const customer = await customerRepository.findById(customer_id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    await customerRepository.remove(customer);
  }
}
