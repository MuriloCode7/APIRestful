import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';


@injectable()
class ListUsersService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<IUser[]> {

    const users = await this.usersRepository.findAll();

    if ((await users).length == 0) {
      throw new AppError('There is no users added');
    }

    return users;
  }
}

export default ListUsersService;
