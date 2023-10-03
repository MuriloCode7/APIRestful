import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import { FakeCustomersRepository } from '../domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  /* O beforeEach define variáveis que serão padroes para todos os testes */
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('Should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Cliente teste',
      email: 'teste@teste.com',
    });

    /* Para validar se o clliente foi criado corretamente, verificamos se ele possui uma propriedade
    que é gerada automaticamente na criação dele */
    expect(customer).toHaveProperty('id');
  });

  it('Should not be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'Cliente teste',
      email: 'teste@teste.com',
    });
    expect(
      createCustomer.execute({
        name: 'Cliente teste',
        email: 'teste@teste.com',
      }),
      /* Para validar se as rejeicoes que instanciam a classe AppError estao funcionando, fazemos da
      seguinte forma */
    ).rejects.toBeInstanceOf(AppError);
  });
});
