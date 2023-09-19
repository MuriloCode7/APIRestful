import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

//Define que para acessar todas as eh necessario estar autenticado
profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

// Rota Update Profile
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        // valida se a nova senha e a confirmacao sao iguais
        .valid(Joi.ref('password'))
        // Se a nova senha tiver sido informada, a confirmacao sera exigida
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  profileController.update,
);

export default profileRouter;
