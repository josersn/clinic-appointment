import { PlanDTO } from "../../../../domain/repositories/plan-repository.interface";
import { IUseCase } from "../../../core/use-case";
import { IPlansService } from "../../../services/plan.service";

interface IRequest {
  name: string;
  document: string;
}

type ICreatePlanUseCase = IUseCase<IRequest, PlanDTO>;

class CreatePlanUseCase implements ICreatePlanUseCase {
  constructor(private service: IPlansService) {}

  async exec(data: IRequest): Promise<PlanDTO> {
    const validateDocument = this.service.validateDocument(data.document);

    if (!validateDocument) {
      throw new Error("Invalid company document");
    }

    const planAlreadyCreated = await this.service.findByDocument(data.document);

    if (planAlreadyCreated) {
      throw new Error("Plan already created");
    }

    const plan = await this.service.create(data);

    return plan;
  }
}

export { CreatePlanUseCase };
