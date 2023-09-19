import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

// Nesse servico, ha a possibilidade de alterar um ou mais dados por vez
export default class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    // Verifica se o usuario foi encontrado
    if (!user) {
      throw new AppError('User not found');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    // Verifica se o novo email foi informado e se ele ja esta cadastrado
    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There already one user with this email address.');
    }

    // Verifica se uma nova senha foi informada, se sim a senha antiga eh requerida
    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    // Verifica se tanto a nova senha quanto a senha antiga foram enviadas
    // pelo usuario
    if (password && old_password) {
      /*O método compare() do bcripts compara uma senha digitada em string
      com uma senha já criptografada, e retorna true se forem iguais
       */
      const checkOldPassword = await compare(old_password, user.password);

      // verifica se a senha digitada é igual a do usuario
      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}
