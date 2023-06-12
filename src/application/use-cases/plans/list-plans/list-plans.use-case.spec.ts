import { PlanRepositoryInMemory } from "../../../../domain/repositories/in-memory/plan-repository.in-memory";
import { PlanService } from "../../../services/plan.service";
import { CreatePlanUseCase } from "../create-plan/create-plan.use-case";
import { ListPlansUseCase } from "./list-plans.use-case";

describe("List plans use case", () => {
  it("Should be able to list plans", async () => {
    const data = {
      name: "Sami Saude",
      document: "36567721000125",
    };

    const repository = new PlanRepositoryInMemory();
    const service = new PlanService(repository);
    const createPlanUseCase = new CreatePlanUseCase(service);
    const useCase = new ListPlansUseCase(service);

    const plan = await createPlanUseCase.exec(data);

    const plans = await useCase.exec();

    expect(plans[0].id).toEqual(plan.id);
    expect(plans[0].name).toEqual(plan.name);
    expect(plans[0].document).toEqual(plan.document);
  });
});
