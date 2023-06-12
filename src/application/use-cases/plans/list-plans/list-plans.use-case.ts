import { PlanDTO } from "../../../../domain/repositories/plan-repository.interface";
import { IUseCase } from "../../../core/use-case";
import { IPlansService } from "../../../services/plan.service";

type IListPlansUseCase = IUseCase<null, PlanDTO[]>;

class ListPlansUseCase implements IListPlansUseCase {
  
  constructor(private service: IPlansService) {}
  
  async exec(): Promise<PlanDTO[]> {
    return this.service.listAll();
  }

}

export { ListPlansUseCase };
