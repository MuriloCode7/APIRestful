import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.find();

    if ((await customers).length == 0) {
      throw new AppError('There is no users added');
    }

    return customers;
  }
}

export default ListCustomerService;
