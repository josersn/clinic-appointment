import { Customer } from "../../entities/customer";
import {
  CustomerDTO,
  ICustomerRepository,
} from "../customer-repository.interface";

class CustomerRepositoryInMemory implements ICustomerRepository {
  private customers: Customer[];

  constructor() {
    this.customers = [];
  }

  async create(data: CustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, {
      id: Math.floor(Math.random() * 100),
      ...data,
      isActive: true,
    });

    this.customers.push(customer);

    return customer;
  }

  async findBy({ where }: any): Promise<Customer | undefined> {
    const key = Object.keys(where)[0];
    const value = Object.values(where)[0];

    return this.customers.find((plan) => plan[key] === value);
  }
}

export { CustomerRepositoryInMemory };
