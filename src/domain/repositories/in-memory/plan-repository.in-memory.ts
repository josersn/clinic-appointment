import { Plan } from "../../entities/plan";

class PlanRepositoryInMemory implements IPlaneRepository {
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
