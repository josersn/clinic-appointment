import { Specialist } from "../../entities/specialist";
import {
  ISpecialistRepository,
  SpecialistDTO,
} from "../specialist-repository.interface";

class SpecialistRepositoryInMemory implements ISpecialistRepository {
  private specialists: Specialist[];

  constructor() {
    this.specialists = [];
  }

  async create(data: SpecialistDTO): Promise<Specialist> {
    const specialist = new Specialist();

    Object.assign(specialist, {
      id: Math.floor(Math.random() * 100),
      ...data,
      isActive: true,
    });

    this.specialists.push(specialist);

    return specialist;
  }

  async findAll(): Promise<SpecialistDTO[]> {
    return this.specialists;
  }
}

export { SpecialistRepositoryInMemory };
