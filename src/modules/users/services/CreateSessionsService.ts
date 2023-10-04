import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';
import { ICreateSession } from '../domain/models/ICreateSession';

interface IResponse {
  user: IUser;
  token: string;
}

// Nesse servico e feito o login
@injectable()
export default class CreateSessionsService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: ICreateSession): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

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
