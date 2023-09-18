import handlebars, { template } from 'handlebars';

/* Como nao e possivel saber quais e quantas variaveis serao enviadas para
a construcao do email, e criada uma segunda interface para lidar com possiveis
variaveis
*/
interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parse({
    template,
    variables,
  }: IParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
