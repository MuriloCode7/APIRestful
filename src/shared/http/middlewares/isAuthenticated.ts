import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  // O token é uma string separada em duas partes por um espaco
  // bearer bhbuhbjbsjbkjsbhssfksfksfkhfsfskfskflsuyvsusyv

  // "authHeader" e uma string
  // O metodo split divide uma string em parte pelo parametro dado
  // e retorna um array com essas partes uma em cada posicao
  // Para pegar so a segunda posicao, basta nao colocar nada antes da virgula
  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);

    // O método verify traz informacoes, o timestamp da criacao do token
    // o timestamp de expiracao do token e o id do usuario
    /**
     * Dessa forma:
     * {
          iat: 1693230924,
          exp: 1693317324,
          sub: '93f57765-1c58-4652-a365-8d70a0af1420'
        }
     */

    // Usando o "as TokenPayLoad", estamos dizendo para o tsc que decodedToken
    // é um objeto identico ao objeto TokenPayLoad
    const { sub } = decodedToken as TokenPayload;

    // Toda request que passar por esse middlewares vai receber o id do usuario
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token ');
  }

}
