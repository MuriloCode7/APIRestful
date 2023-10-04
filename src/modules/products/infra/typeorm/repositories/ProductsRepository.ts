import { In, Repository, getRepository } from 'typeorm';
import Product from '../entities/Product';
import { IFindProducts, IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';

export class ProductRepository implements IProductsRepository{

  private ormRepository: Repository<Product>;
  constructor(){
    this.ormRepository = getRepository(Product);
  }

  /* Essa busca retorna uma promessa, sendo um objeto product ou undefined
  Caso a busca nao gere resultado
  */
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    // O map permite que pegue apenas os atributos especificados da entidade
    const productIds = products.map(product => product.id);

    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });

    return existsProducts;
  }
}
