interface IPlansService {
  create(data: PlanDTO): Promise<PlanDTO>;
}

class PlansService implements IPlansService {
  constructor(private repository: IPlaneRepository) {}

  async create(data: PlanDTO): Promise<PlanDTO> {
    return this.repository.create(data);
  }
}

export { PlansService, IPlansService };
