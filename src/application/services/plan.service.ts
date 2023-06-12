import {
  IPlanRepository,
  PlanDTO,
} from "../../domain/repositories/plan-repository.interface";

interface IPlansService {
  create(data: PlanDTO): Promise<PlanDTO>;
  validateDocument(document: string): boolean;
  findByDocument(document: string): Promise<PlanDTO | undefined>;
  listAll(): Promise<PlanDTO[]>;
}

class PlanService implements IPlansService {
  constructor(private repository: IPlanRepository) {}

  async create(data: PlanDTO): Promise<PlanDTO> {
    return this.repository.create(data);
  }

  validateDocument(document: string): boolean {
    if (document == "") return false;

    if (document.length != 14) return false;

    // Elimina CNPJ invalidos conhecidos
    if (
      document == "00000000000000" ||
      document == "11111111111111" ||
      document == "22222222222222" ||
      document == "33333333333333" ||
      document == "44444444444444" ||
      document == "55555555555555" ||
      document == "66666666666666" ||
      document == "77777777777777" ||
      document == "88888888888888" ||
      document == "99999999999999"
    )
      return false;

    // Valida DVs
    let tamanho = document.length - 2;
    let numeros: any = document.substring(0, tamanho);
    let digitos = document.substring(tamanho);
    let soma: any = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado: any = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = document.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }
  async findByDocument(document: string): Promise<PlanDTO | undefined> {
    return this.repository.findBy({
      where: {
        document,
      },
    });
  }

  async listAll(): Promise<PlanDTO[]> {
    return this.repository.findAll();
  }
}

export { PlanService, IPlansService };
