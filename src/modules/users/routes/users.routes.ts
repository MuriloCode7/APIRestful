import { Router } from 'express';
import UsersController from '../controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

// Aqui instancia
const upload = multer(uploadConfig);

// Rota list users
// Para listar os usuarios, a API esta exigindo o token
// porque colocamos o parametro isAuthenticated que se
// refere ao middleware criado para a autenticacao
usersRouter.get('/', isAuthenticated, usersController.index);

// Rota Create user
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

// Rota delete user
usersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  usersController.delete,
);

// Rota upload avatar
usersRouter.patch(
  '/avatar',
  isAuthenticated,
  // Para fazer upload de um unico arquivo, usamos o "upload.array"
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
