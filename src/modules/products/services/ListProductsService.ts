import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";

class ListProductsService {
  public async execute(): Promise<Product[]>{
    const productsRepository = getCustomRepository(ProductRepository);

    const products = await productsRepository.find();

    // Se nenhum produto for encontrado, aparece uma mensagem
    if ((await products).length == 0) {
      throw new AppError('There is no products added');
    }

    return products;
  }
}

export default ListProductsService;
