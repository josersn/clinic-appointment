import { CustomerRepositoryInMemory } from "../../../../domain/repositories/in-memory/customer-repository.in-memory";
import { CustomerService } from "../../../services/customer.service";
import { CreateCustomerUseCase } from "./create-customer.use-case";

describe("Create Customer Use Case", () => {
  it("Should be able to create a new customer", async () => {
    const data = {
      name: "José Ramos",
      document: "94799189000",
      email: "jose.ramos@gmail.com",
      password: "12345678",
      phone: "11970707070",
    };

    const repository = new CustomerRepositoryInMemory();
    const service = new CustomerService(repository);
    const userCase = new CreateCustomerUseCase(service);

    const customer = await userCase.exec(data);
    expect(customer).toBeTruthy();
    expect(customer).toHaveProperty("id");
    expect(customer.id).toBeTruthy();
    expect(customer.isActive).toBe(true);
    expect(customer.name).toBe(data.name);
    expect(customer.email).toBe(data.email);
  });
});
