import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

class RedisCache {
  private client: RedisClient;
  private connected = false;

  constructor() {
    if (!this.connected) {
      this.client = new Redis(cacheConfig.config.redis);
      this.connected = true;
    }
  }

  /*
  Cria o cache da chave especificada se ja nao foi criado
  */
  public async save(key: string, value: any): Promise<void> {
    /*
    Para que o Redis possa salvar o cache, o formato do valor deve ser string.
    Para isso, usa-se o JSON.stringfy, para a conversao
     */
    await this.client.set(key, JSON.stringify(value));
  }

  /*
  Como nao é possivel saber o tipo de retorno que a funcao vai trazer, usa-se um retorno generico
  como o <T> que sera definido aonde o cache for criado
   */
  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    /* Para retornar os dados ao usuario, retornamos para o formato especificado em <T> */
    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}

export default new RedisCache();
