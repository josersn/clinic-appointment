import { IUseCase } from "../../../core/use-case";
import { IPlansService } from "../../../services/plans.service";

interface IRequest {
  name: string;
  document: string;
}

type ICreatePlanUseCase = IUseCase<IRequest, PlanDTO>;

class CreatePlanUseCase implements ICreatePlanUseCase {
  constructor(private service: IPlansService) {}

  async exec(data: IRequest): Promise<PlanDTO> {
    const plan = await this.service.create(data);

    return plan;
  }
}

export { CreatePlanUseCase };
