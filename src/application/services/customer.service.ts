import { Customer } from "../../domain/entities/customer";
import {
  CustomerDTO,
  ICustomerRepository,
} from "../../domain/repositories/customer-repository.interface";

interface ICustomerService {
  create(customer: CustomerDTO): Promise<Customer>;
  findCustomerByEmail(email: string): Promise<Customer | undefined>;
  findCustomerByPhone(phone: string): Promise<Customer | undefined>;
}

class CustomerService implements ICustomerService {
  constructor(private repository: ICustomerRepository) {}

  create(customer: CustomerDTO): Promise<Customer> {
    return this.repository.create(customer);
  }

  async findCustomerByEmail(email: string): Promise<Customer | undefined> {
    return this.repository.findBy({
      where: {
        email,
      },
    });
  }

  async findCustomerByPhone(phone: string): Promise<Customer | undefined> {
    return this.repository.findBy({
      where: {
        phone,
      },
    });
  }
}

export { ICustomerService, CustomerService };
