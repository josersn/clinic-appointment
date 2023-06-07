import { SpecialistDTO } from "../../../../domain/repositories/specialist-repository.interface";
import { IUseCase } from "../../../core/use-case";
import { ISpecialistService } from "../../../services/specialist.service";

interface IRequest {
  name: string;
  document: string;
  specialty: string;
}

type ICreatePlanUseCase = IUseCase<IRequest, SpecialistDTO>;

class CreateSpecialistUseCase implements ICreatePlanUseCase {
  constructor(private service: ISpecialistService) {}

  async exec(data: IRequest): Promise<SpecialistDTO> {
    const validDocument = this.service.validateDocument(data.document);

    if (!validDocument) {
      throw new Error("Invalid specialist document");
    }

    return this.service.create(data);
  }
}

export { CreateSpecialistUseCase };
