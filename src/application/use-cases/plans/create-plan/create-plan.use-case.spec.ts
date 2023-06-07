import { PlanRepositoryInMemory } from "../../../../domain/repositories/in-memory/plan-repository.in-memory";
import { PlansService } from "../../../services/plans.service";
import { CreatePlanUseCase } from "./create-plan.use-case";

describe("Create Plan use case", () => {
  it("Should be able to create a new Plan", async () => {
    const data = {
      name: "Sami Saude",
      document: "36567721000125",
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

  it("Should not be able to create a new Plan with wrong CNPJ", async () => {
    const data = {
      name: "Sami Saude",
      document: "WRONG_DOCUMENT",
    };

    const repository = new PlanRepositoryInMemory();
    const service = new PlansService(repository);
    const useCase = new CreatePlanUseCase(service);

    await expect(useCase.exec(data)).rejects.toThrowError(
      new Error("Invalid company document")
    );
  });

  it("Should no be able to create a Plan with duplicated CNPJ", async () => {
    const data = {
      name: "Sami Saude",
      document: "36567721000125",
    };

    const repository = new PlanRepositoryInMemory();
    const service = new PlansService(repository);
    const useCase = new CreatePlanUseCase(service);

    await useCase.exec(data);

    await expect(useCase.exec(data)).rejects.toThrowError(
      new Error("Plan already created")
    );
  });
});
