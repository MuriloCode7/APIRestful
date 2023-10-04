import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import redisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

injectable()
class ListProductsService {

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<Product[]> {

    let products = await redisCache.recover<Product[]>(
      'api-restful-PRODUCT_LIST',
    );

    if (!products) {
      products = await this.productsRepository.findAll();

      await redisCache.save('api-restful-PRODUCT_LIST', products);
    }

    // Se nenhum produto for encontrado, aparece uma mensagem
    if ((await products).length == 0) {
      throw new AppError('There is no products added');
    }

    return products;
  }
}

export default ListProductsService;
