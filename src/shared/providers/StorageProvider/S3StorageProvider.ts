import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import mime from 'mime';

export default class S3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    /* Pegamos  o caminho do arquivo que esta salvo temporariamente
    na pasta temp*/
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    /* O mime é uma biblioteca que alem de outras coisas, nos permite
    identificar o tipo de um arquivo (txt, pdf, ...)*/
    const ContentType = mime.getType(originalPath);

    /* Se nao encontrar nenhum tipo é pq nao é um arquivo */
    if (!ContentType) {
      throw new Error('File not found');
    }

    /* Coleta o conteudo do arquivo para poder passar para o S3 */
    const fileContent = await fs.promises.readFile(originalPath);

    /* Config necessaria para upload no S3, ACL descreve a privacidade do
    arquivo no S3 */
    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
      })
      .promise();
    /* Colocar a funcao .promise() depois de uma outra funcao nos permite
      executa-la de forma assincrona */

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
