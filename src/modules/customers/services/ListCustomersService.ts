import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import { CustomerRepository } from '../typeorm/repositories/CustomersRepository';

class ListCustomersService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomerRepository);

    const customers = await customersRepository.find();

    if ((await customers).length == 0) {
      throw new AppError('There is no customers added');
    }

    return customers;
  }
}

export default ListCustomersService;
