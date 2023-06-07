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

  async findBy({ where }: any): Promise<Plan | undefined> {
    const key = Object.keys(where)[0];
    const value = Object.values(where)[0];

    return this.plans.find((plan) => plan[key] === value);
  }
}

export { PlanRepositoryInMemory };
