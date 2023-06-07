import { SpecialistRepositoryInMemory } from "../../../../domain/repositories/in-memory/specialist-repository.in-memory";
import { SpecialistService } from "../../../services/specialist.service";
import { CreateSpecialistUseCase } from "./create-specialist.use-case";

describe("Create specialist use case", () => {
  it("Should be able to create a new Specialist", async () => {
    const data = {
      name: "Laura Mitiura",
      document: "123456789",
      specialty: "Nutricionista",
    };

    const repository = new SpecialistRepositoryInMemory();
    const service = new SpecialistService(repository);
    const useCase = new CreateSpecialistUseCase(service);

    const specialist = await useCase.exec(data);
    expect(specialist).toBeTruthy();
    expect(specialist).toHaveProperty("id");
    expect(specialist.id).toBeTruthy();
    expect(specialist.isActive).toBe(true);
    expect(specialist.name).toBe(data.name);
    expect(specialist.specialty).toBe(data.specialty);
  });
});
