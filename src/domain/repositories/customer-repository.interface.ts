import { Customer } from "../entities/customer";

interface ICustomerRepository {
  create(data: CustomerDTO): Promise<Customer>;
}

interface CustomerDTO {
  id?: bigint;
  name: string;
  email: string;
  password: string;
  phone: string;
  document: string;
  isActive?: boolean;
}

export { ICustomerRepository, CustomerDTO };
