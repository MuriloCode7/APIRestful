import { v4 as uuidv4 } from 'uuid';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';

/* O tsc permite  omitir metodos da interface que está sendo implementada, para não ser obrigatorio
implementa-los */
//export class FakeCustomersRepository implements Omit<ICustomersRepository, 'remove'>{
export class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    /* O metodo assign do Object une arrays ou objetos */
    //Object.assign(this.customers, customer);

    /* Nesta implementacao é buscado o cliente já cadastrado com o id
    do cliente que está sendo salvo para atualizar o registro/sobrescrever */
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {}

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }
}
