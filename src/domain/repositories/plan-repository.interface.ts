import { Plan } from "../entities/plan";

interface IPlanRepository {
  create(plan: PlanDTO): Promise<Plan>;
  findBy(data: any): Promise<Plan | undefined>;
  findAll(): Promise<PlanDTO[]>;
}
interface PlanDTO {
  id?: bigint;
  name: string;
  document: string;
  isActive?: boolean;
}

export { IPlanRepository, PlanDTO };
