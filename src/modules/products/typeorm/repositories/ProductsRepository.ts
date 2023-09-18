import { EntityRepository, Repository } from "typeorm";
import Product from "../entities/Product";

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  /* Essa busca retorna uma promessa, sendo um objeto product ou undefined
  Caso a busca nao gere resultado
  */
  public async findByName(name: string): Promise<Product | undefined>{
    const product = this.findOne({
      where: {
        name,
      },
    });
    return product;
  }

}
