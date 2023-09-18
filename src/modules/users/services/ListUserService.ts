import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import AppError from "@shared/errors/AppError";

class ListUsersService {
  public async execute(): Promise<User[]>{
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    if ((await users).length == 0) {
      throw new AppError('There is no users added');
    }

    return users;
  }
}

export default ListUsersService;
