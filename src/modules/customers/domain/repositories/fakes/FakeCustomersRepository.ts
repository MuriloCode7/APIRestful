import Customer from '../entities/Customer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

export class CustomersRepository implements ICustomersRepository{
  /* Para seguir os principios do SOLID, desacoplamos o typeORM do projeto passando-o como atributo
  da classe de cada repositorio. Dessa forma, é possivel trabalhar com qualquer orm que venha a ser
  usado pela aplicacao*/
  private ormRepository: Repository<Customer>;

  constructor(){
    this.ormRepository = getRepository(Customer);
  }

  public async create({name, email}: ICreateCustomer): Promise<Customer> {

  }

  // public async save(customer: Customer): Promise<Customer> {

  // }

  // public async remove(customer: ICustomer): Promise<void> {

  // }

  // public async findByName(name: string): Promise<Customer | undefined> {

  // }

  // public async findById(id: string): Promise<Customer | undefined> {

  // }

  // public async findByEmail(email: string): Promise<Customer | undefined> {

  // }
}
