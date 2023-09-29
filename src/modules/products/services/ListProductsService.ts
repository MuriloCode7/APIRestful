import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import redisCache from '@shared/cache/RedisCache';

class ListProductsService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    let products = await redisCache.recover<Product[]>(
      'api-restful-PRODUCT_LIST',
    );

    if (!products) {
      products = await productsRepository.find();

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
