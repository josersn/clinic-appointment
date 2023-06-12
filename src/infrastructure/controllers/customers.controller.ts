import { FastifyReply } from "fastify";
import { Controller, POST } from "fastify-decorators";
import { CustomerService } from "../../application/services/customer.service";
import { CreateCustomerUseCase } from "../../application/use-cases/customers/create-customer/create-customer.use-case";
import { CustomerRepositoryInMemory } from "../../domain/repositories/in-memory/customer-repository.in-memory";

@Controller("customer")
export default class CustomerController {
  @POST("/")
  async create(req, reply: FastifyReply) {
    try {
      const repository = new CustomerRepositoryInMemory();
      const service = new CustomerService(repository);
      const useCase = new CreateCustomerUseCase(service);

      const customer = await useCase.exec(req.body);

      return reply.status(201).send(customer);
    } catch (error) {
      return reply.status(500).send();
    }
  }
}
