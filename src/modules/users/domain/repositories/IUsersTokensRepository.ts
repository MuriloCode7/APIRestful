import { IUserToken } from "../models/IUserToken"

export interface IUsersTokensRepository {
  generate(user_id: string): Promise<IUserToken>
  generate(user_id: string): Promise<IUserToken>
}
