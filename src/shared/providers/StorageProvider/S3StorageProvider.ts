import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import mime from 'mime';

export default class S3StorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
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
    const params = {
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    };

    const putObjectCommand = new PutObjectCommand(params);

    try {
      const result = await this.client.send(putObjectCommand);
      console.log('Arquivo carregado com sucesso:', result);
    } catch (error) {
      console.error('Erro ao carregar o arquivo:', error);
    }

    /* Colocar a funcao .promise() depois de uma outra funcao nos permite
      executa-la de forma assincrona */

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const params = {
      Bucket: uploadConfig.config.aws.bucket,
      Key: file,
    };

    const deleteObjectCommand = new DeleteObjectCommand(params);

    try {
      const result = await this.client.send(deleteObjectCommand);
      console.log('Arquivo excluído com sucesso:', result);
    } catch (error) {
      console.error('Erro ao excluir o arquivo:', error);
    }
  }
}
