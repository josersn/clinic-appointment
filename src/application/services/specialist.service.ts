import { Specialist } from "../../domain/entities/specialist";
import {
  ISpecialistRepository,
  SpecialistDTO,
} from "../../domain/repositories/specialist-repository.interface";

interface ISpecialistService {
  create(data: SpecialistDTO): Promise<Specialist>;
  validateDocument(document: string): boolean;
}

class SpecialistService implements ISpecialistService {
  constructor(private repository: ISpecialistRepository) {}

  create(data: SpecialistDTO): Promise<Specialist> {
    return this.repository.create(data);
  }

  validateDocument(document: string): boolean {
    let soma = 0;
    let resto;
    
    if (document == "00000000000") return false;

    for (let i = 1; i <= 9; i++)
      soma = soma + parseInt(document.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(document.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma = soma + parseInt(document.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(document.substring(10, 11))) return false;
    return true;
  }
}

export { ISpecialistService, SpecialistService };
