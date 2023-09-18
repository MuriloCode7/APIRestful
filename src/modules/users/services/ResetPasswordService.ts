import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    /*
    Para que o usuario consiga alterar a senha, e necessario que o token gerado
    no envio do email nao tenha expirado (expira em 2 horas). Para validar se
    o token foi expirado, usamos a biblioteca date-fns
    */
    const tokenCreatedAt = userToken.created_at;

    // O metodo addHours esta adicionando 2 horas a hora que o token foi criado
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    /*
    Para saber se e necessario usar o 'await' antes do metodo, basta passar o mouse
    por cima do metodo e ver se ele e assincrono / retorna uma promessa
    */
    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
