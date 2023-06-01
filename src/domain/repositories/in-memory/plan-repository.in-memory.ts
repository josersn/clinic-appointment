class PlanRepositoryInMemory implements IPlaneRepository {
  private plans: Plan[];

  constructor() {
    this.plans = [];
  }
  async create(data: PlanDTO): Promise<Plan> {
    const plan = new Plan();

    Object.assign(plan, {
      id: data.id,
      name: data.name,
      isActive: true,
    });

    this.plans.push(plan);

    return plan;
  }
}
