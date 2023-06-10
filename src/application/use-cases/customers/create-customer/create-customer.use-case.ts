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
    const customerEmailAlreadyCreated = await this.service.findCustomerByEmail(
      data.email
    );

    if (customerEmailAlreadyCreated) {
      throw new Error("Customer email already used");
    }

    const customerPhoneAlreadyCreated = await this.service.findCustomerByPhone(
      data.phone
    );

    if (customerPhoneAlreadyCreated) {
      throw new Error("Customer phone already used");
    }

    const customerDocumentAlreadyCreated = await this.service.findCustomerByDocument(data.document);

    if (customerDocumentAlreadyCreated) {
      throw new Error("Customer document already used");
    }

    return this.service.create(data);
  }
}

export { CreateCustomerUseCase };
