import { CustomerDTO } from "../../../../domain/repositories/customer-repository.interface";
import { IUseCase } from "../../../core/use-case";
import { ICustomerService } from "../../../services/customer.service";

interface IRequest {
  name: string;
  document: string;
  email: string;
  password: string;
  phone: string;
}

type ICreateCustomerUseCase = IUseCase<IRequest, CustomerDTO>;

class CreateCustomerUseCase implements ICreateCustomerUseCase {
  constructor(private service: ICustomerService) {}

  async exec(data: IRequest): Promise<CustomerDTO> {
    const customerAlreadyCreated = await this.service.findCustomerByEmail(
      data.email
    );

    if (customerAlreadyCreated) {
      throw new Error("Customer email already used");
    }

    return this.service.create(data);
  }
}

export { CreateCustomerUseCase };
