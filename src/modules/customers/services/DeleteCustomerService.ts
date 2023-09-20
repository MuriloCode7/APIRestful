import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { CustomerRepository } from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

export default class DeleteProfileService {
  public async execute({ id }: IRequest): Promise<void> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    await customerRepository.remove(customer);
  }
}
