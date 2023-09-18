import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";
import { compare, hash } from 'bcryptjs';
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User,
  token: string,
}

// Nesse servico e feito o login

export default class CreateSessionsService {
  public async execute({email, password}: IRequest): Promise<IResponse>{
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    // Nessa criacao do token, o segundo parametro é o hash
    // Eu simplesmente fui no site md5 hash generator, digitei
    // varios caracteres aleatorio e gerei esse hash
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      // Apos um dia, o usuario precisara se autenticar novamente
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
