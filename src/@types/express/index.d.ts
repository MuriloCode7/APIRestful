//Esta classe e usada para definir novos tipos/atributos para
// objetos já existentes das bibliotecas

declare namespace Express {
  export interface Request {
    user: {
      id: string
    },
    file: {
      filename: string
    },
  }
}
