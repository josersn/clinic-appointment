import { FastifyReply } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";
import {
  IPlansService,
  PlanService,
} from "../../application/services/plan.service";
import { CreatePlanUseCase } from "../../application/use-cases/plans/create-plan/create-plan.use-case";
import { ListPlansUseCase } from "../../application/use-cases/plans/list-plans/list-plans.use-case";
import { PlanRepositoryInMemory } from "../../domain/repositories/in-memory/plan-repository.in-memory";
import { IPlanRepository } from "../../domain/repositories/plan-repository.interface";

@Controller("plan")
export default class PlansController {
  private repository: IPlanRepository;
  private service: IPlansService;

  constructor() {
     this.repository = new PlanRepositoryInMemory();
     this.service = new PlanService(this.repository);
  }

  @POST("/")
  async create(req, reply: FastifyReply) {
    try {
      const useCase = new CreatePlanUseCase(this.service);
      const plan = await useCase.exec(req.body);

      return reply.status(201).send(plan);
    } catch (error) {
      return reply.status(500).send();
    }
  }

  @GET("/")
  async list(req, reply: FastifyReply) {
    try {
      const useCase = new ListPlansUseCase(this.service);
      const plans = await useCase.exec();

      return reply.status(200).send(plans);
    } catch (error) {
      return reply.status(500).send();
    }
  }
}
