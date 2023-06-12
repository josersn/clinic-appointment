import { Customer } from "../../domain/entities/customer";
import {
  CustomerDTO,
  ICustomerRepository,
} from "../../domain/repositories/customer-repository.interface";
import { IEncryption } from "../../infrastructure/adapters/encryption/interface";

interface ICustomerService {
  create(customer: CustomerDTO): Promise<Customer>;
  findCustomerByEmail(email: string): Promise<Customer | undefined>;
  findCustomerByPhone(phone: string): Promise<Customer | undefined>;
  findCustomerByDocument(document: string): Promise<Customer | undefined>;
}

class CustomerService implements ICustomerService {
  constructor(
    private repository: ICustomerRepository,
    private encryptionAdapter: IEncryption
  ) {}

  async create(customer: CustomerDTO): Promise<Customer> {
    customer.password = await this.encryptionAdapter.crypt(customer.password);
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

  async findCustomerByDocument(
    document: string
  ): Promise<Customer | undefined> {
    return this.repository.findBy({
      where: {
        document,
      },
    });
  }
}

export { ICustomerService, CustomerService };
