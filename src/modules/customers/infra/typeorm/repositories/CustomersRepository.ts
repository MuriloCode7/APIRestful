import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';

export class CustomerRepository implements ICustomersRepository{
  /* Para seguir os principios do SOLID, desacoplamos o typeORM do projeto passando-o como atributo
  da classe de cada repositorio. Dessa forma, é possivel trabalhar com qualquer orm que venha a ser
  usado pela aplicacao*/
  private ormRepository: Repository<Customer>;

  constructor(){
    this.ormRepository = getRepository(Customer);
  }

  public async findByName(name: string): Promise<Customer | undefined> {
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
