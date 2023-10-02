import { Request, Response } from 'express';
import ShowCustomerService from '../../../services/ShowCustomerService';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomersService from '../../../services/ListCustomersService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';
import { container } from 'tsyringe';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomersService();

    const customers = await listCustomers.execute();

    return response.json(customers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({
      name,
      email,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();

    await deleteCustomer.execute({ id });

    return response.json([]);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomerService = new ShowCustomerService();

    const customer = await showCustomerService.execute({ id });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomer = new UpdateCustomerService();

    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });

    return response.json(customer);
  }
}
