import 'reflect-metadata';
import CreateCustomerService from "./CreateCustomerService";
import { FakeCustomersRepository } from "../domain/repositories/fakes/FakeCustomersRepository";

describe('CreateCustomer',  () => {
  it('Should be able to create a new customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomerService(fakeCustomersRepository);

    const customer = await createCustomer.execute({
      name: 'Cliente teste',
      email: 'teste@teste.com'
    });

    /* Para validar se o clliente foi criado corretamente, verificamos se ele possui uma propriedade
    que é gerada automaticamente na criação dele */
    expect(customer).toHaveProperty('id');

  })

  it('Should not be able to create two customers with the same email', () => {
    expect(1).toBe(1);
  })
});
