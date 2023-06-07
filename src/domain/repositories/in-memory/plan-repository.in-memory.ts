import { Plan } from "../../entities/plan";
import { IPlanRepository, PlanDTO } from "../plan-repository.interface";

class PlanRepositoryInMemory implements IPlanRepository {
  private plans: Plan[];

  constructor() {
    this.plans = [];
  }
  async create(data: PlanDTO): Promise<Plan> {
    const plan = new Plan();

    Object.assign(plan, {
      id: Math.floor(Math.random() * 100),
      ...data,
      isActive: true,
    });

    this.plans.push(plan);

    return plan;
  }
}

export { PlanRepositoryInMemory };
