import { PlanRepositoryInMemory } from "../../../../domain/repositories/in-memory/plan-repository.in-memory";
import { PlansService } from "../../../services/plans.service";
import { CreatePlanUseCase } from "./create-plan.use-case";

describe("Create Plan use case", () => {
  it("Should be able to create a new Plan", async () => {
    const data = {
      name: "Sami Saude",
      document: "1234566789",
    };

    const repository = new PlanRepositoryInMemory();
    const service = new PlansService(repository);
    const useCase = new CreatePlanUseCase(service);

    const plan = await useCase.exec(data);
    expect(plan).toBeTruthy();
    expect(plan).toHaveProperty("id");
    expect(plan.id).toBeTruthy();
    expect(plan.isActive).toBe(true);
    expect(plan.name).toBe(data.name);
  });
});
