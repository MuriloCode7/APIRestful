import { getRepository, Repository } from 'typeorm';
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
    const customer = this.ormRepository.create({name, email});

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  public async remove(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    /* Caso os metodos do orm estiverem acusando erro, verificar se o nome
    é o que esta no codigo, como "findOne()" por exemplo, é a sintaxe usada
    no TypeORM, mas em outro ORM pode ser outra */
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}
