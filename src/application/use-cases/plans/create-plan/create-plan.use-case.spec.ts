import { CreatePlanUseCase } from "./create-plan.use-case";

describe("Create Plan use case", () => {
  it("Should be able to create a new Plan", async () => {

    const data = {
      name: "Sami Saude"
    }

    const useCase = new CreatePlanUseCase();

    const plan = await useCase.exec(data);

    expect(plan).toBeTruthy();
    expect(plan).toHaveProperty("id");
    expect(plan.isActive).toBe(true);
    expect(plan.name).toBe(data.name);

  });
});
