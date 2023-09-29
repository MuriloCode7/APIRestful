import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import redisCache from '@shared/cache/RedisCache';

// Uma interface é a mesma coisa que um objeto
interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  // O servico tentara criar um produto a partir dos atributos da interface
  // A promessa que esse metodo assincrono tem é retornar um produto
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    // Antes de acrescentar esse cliente, o servico procura no BD algum produto
    // com esse mesmo nome, caso encontre aparece um erro
    // EM TODA CHAMADA A UM METODO QUE VAI ACESSAR O BD, DEVE USAR O await
    // PORQUE É UM PROCESSO QUE PODE LEVAR UM TEMPO
    const productExists = await productsRepository.findByName(name);

    // Se essa condicional é atendida, o metodo acaba
    // O throw funciona como um return
    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    /* Ao criar um novo produto, o cache antigo deve ser invalidado */
    await redisCache.invalidate('api-restful-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
