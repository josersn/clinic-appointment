import { IUseCase } from "../../../core/use-case";

interface IRequest {
  name: string;
}

type ICreatePlanUseCase = IUseCase<IRequest, PlanDTO>;

class CreatePlanUseCase implements ICreatePlanUseCase {

  constructor(private service: IPlansService) {}

  async exec({ name }: IRequest): Promise<PlanDTO> {

    const plan = await this.service.create(name);

    return {
      id: BigInt(1),
      name: name,
      isActive: true,
    };
  }
}

export { CreatePlanUseCase };
