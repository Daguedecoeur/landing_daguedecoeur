import type { PlanningPageContent, PlanningPageRepository } from '../domain/planning.model'

export class GetPlanningPageUseCase {
  constructor(private readonly repository: PlanningPageRepository) {}

  async execute(): Promise<PlanningPageContent> {
    return this.repository.getPlanningPage()
  }
}
