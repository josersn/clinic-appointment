import { Customer } from "../../domain/entities/customer";
import {
  CustomerDTO,
  ICustomerRepository,
} from "../../domain/repositories/customer-repository.interface";

interface ICustomerService {
  create(customer: CustomerDTO): Promise<Customer>;
}

class CustomerService implements ICustomerService {
  constructor(private repository: ICustomerRepository) {}

  create(customer: CustomerDTO): Promise<Customer> {
    return this.repository.create(customer);
  }
}

export { ICustomerService, CustomerService };
