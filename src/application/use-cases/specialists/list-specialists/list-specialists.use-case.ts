import { SpecialistDTO } from "../../../../domain/repositories/specialist-repository.interface";
import { IUseCase } from "../../../core/use-case";
import { ISpecialistService } from "../../../services/specialist.service";

type IListSpecialistsUseCase = IUseCase<null, SpecialistDTO[]>;

class ListSpecialistsUseCase implements IListSpecialistsUseCase {
  constructor(private service: ISpecialistService) {}

  async exec(): Promise<SpecialistDTO[]> {
    return this.service.listAll();
  }
}

export { ListSpecialistsUseCase };
