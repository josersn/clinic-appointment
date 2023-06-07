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
    const useCase = new CreateCustomerUseCase(service);

    const customer = await useCase.exec(data);
    expect(customer).toBeTruthy();
    expect(customer).toHaveProperty("id");
    expect(customer.id).toBeTruthy();
    expect(customer.isActive).toBe(true);
    expect(customer.name).toBe(data.name);
    expect(customer.email).toBe(data.email);
  });

  it("Should not be able to create customer with email already exist", async () => {
    const data = {
      name: "José Ramos",
      document: "94799189000",
      email: "jose.ramos@gmail.com",
      password: "12345678",
      phone: "11970707070",
    };

    const repository = new CustomerRepositoryInMemory();
    const service = new CustomerService(repository);
    const useCase = new CreateCustomerUseCase(service);

    await useCase.exec(data);

    await expect(useCase.exec(data)).rejects.toThrowError(
      new Error("Customer email already used")
    );
  });

  it("Should not be able to create customer with email already exist", async () => {
    const data = {
      name: "José Ramos",
      document: "94799189000",
      email: "jose.ramos@gmail.com",
      password: "12345678",
      phone: "11970707070",
    };

    const repository = new CustomerRepositoryInMemory();
    const service = new CustomerService(repository);
    const useCase = new CreateCustomerUseCase(service);

    await useCase.exec(data);

    data.email = "new_email@gmail.com";

    await expect(useCase.exec(data)).rejects.toThrowError(
      new Error("Customer phone already used")
    );
  });

  it("Should not be able to create customer with document already exist", async () => {
    const data = {
      name: "José Ramos",
      document: "94799189000",
      email: "jose.ramos@gmail.com",
      password: "12345678",
      phone: "11970707070",
    };

    const repository = new CustomerRepositoryInMemory();
    const service = new CustomerService(repository);
    const useCase = new CreateCustomerUseCase(service);

    await useCase.exec(data);

    data.email = "new_email@gmail.com";
    data.phone = "11907070707";

    await expect(useCase.exec(data)).rejects.toThrowError(
      new Error("Customer document already used")
    );
  });
});
