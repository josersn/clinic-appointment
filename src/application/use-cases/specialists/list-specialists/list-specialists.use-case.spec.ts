import { SpecialistRepositoryInMemory } from "../../../../domain/repositories/in-memory/specialist-repository.in-memory";
import { SpecialistService } from "../../../services/specialist.service";
import { CreateSpecialistUseCase } from "../create-specialist/create-specialist.use-case";
import { ListSpecialistsUseCase } from "./list-specialists.use-case";

describe("List Specialists use case", () => {
  it("Should be able to list a specialists", async () => {
    const data = {
      name: "Laura Mitiura",
      document: "32706157011",
      specialty: "Nutricionista",
    };

    const repository = new SpecialistRepositoryInMemory();
    const service = new SpecialistService(repository);
    const createSpecialistUseCase = new CreateSpecialistUseCase(service);
    const useCase = new ListSpecialistsUseCase(service);

    await createSpecialistUseCase.exec(data);

    const specialists = await useCase.exec();

    expect(specialists[0].name).toEqual(data.name);
    expect(specialists[0].document).toEqual(data.document);
    expect(specialists[0].specialty).toEqual(data.specialty);
  });
});
