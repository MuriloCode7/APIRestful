import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';

export default class DiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    // O metodo rename troca um arquivo de diretorio, nesse caso passando do diretorio
    // temporario para o disco local
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.directory, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
