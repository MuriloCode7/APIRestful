import handlebars from 'handlebars';
import fs from 'fs';
/*
fs e a biblioteca do Node que gerencia arquivos "File System"
 */

/* Como nao e possivel saber quais e quantas variaveis serao enviadas para
a construcao do email, e criada uma segunda interface para lidar com possiveis
variaveis
*/
interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
