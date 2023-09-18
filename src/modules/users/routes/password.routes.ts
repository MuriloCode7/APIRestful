import { Router } from "express";
import {celebrate, Joi, Segments} from 'celebrate';
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import { string } from "joi";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
    },
  }),
  forgotPasswordController.create);

  passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      /* O método valid() do Joi diz a aplicação que a variável deve ter o
      mesmo valor da variável referenciada no Joi.ref */
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create);

  export default passwordRouter;
