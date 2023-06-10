import { FastifyReply } from "fastify";
import { Controller, POST } from "fastify-decorators";
import { PlansService } from "../../application/services/plans.service";
import { CreatePlanUseCase } from "../../application/use-cases/plans/create-plan/create-plan.use-case";
import { PlanRepositoryInMemory } from "../../domain/repositories/in-memory/plan-repository.in-memory";

@Controller("plan")
export default class PlansController {
  @POST("/")
  async name(req, reply: FastifyReply) {
    try {
      const repository = new PlanRepositoryInMemory();
      const service = new PlansService(repository);
      const useCase = new CreatePlanUseCase(service);

      const plan = await useCase.exec(req.body);

      return reply.status(201).send(plan);
    } catch (error) {
      console.log(error);
    }
  }
}
