import { Specialist } from "../entities/specialist";

interface ISpecialistRepository {
  create(data: SpecialistDTO): Promise<Specialist>;
  findAll(): Promise<SpecialistDTO[]>;
}

interface SpecialistDTO {
  id?: bigint;
  name: string;
  specialty: string;
  document: string;
  isActive?: boolean;
}

export { ISpecialistRepository, SpecialistDTO };
