import { Request, Response } from "express";
import ListUsersService from "../services/ListUserService";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {email} = request.body;

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmail.execute({
      email,
    });

    // O statusCode 204 significa no content
    return response.status(204).json();
  }
}
