import { Specialist } from "../../domain/entities/specialist";
import {
  ISpecialistRepository,
  SpecialistDTO,
} from "../../domain/repositories/specialist-repository.interface";

interface ISpecialistService {
  create(data: SpecialistDTO): Promise<Specialist>;
}

class SpecialistService implements ISpecialistService {
  constructor(private repository: ISpecialistRepository) {}

  create(data: SpecialistDTO): Promise<Specialist> {
    return this.repository.create(data);
  }
}

export { ISpecialistService, SpecialistService };
