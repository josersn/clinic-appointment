interface IPlaneRepository {
  create(plan: PlanDTO): Promise<Plan>;
}
interface PlanDTO {
  id?: bigint;
  name: string;
  isActive: boolean;
}
