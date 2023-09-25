import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

export default class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  /*
  Como nao é possivel saber o tipo de retorno que a funcao vai trazer, usa-se um retorno generico
  como o <T>
   */
  //public async recover<T>(key: string): Promise<T | null> {}

  //public async invalidate(key: string): Promise<void> {}
}
