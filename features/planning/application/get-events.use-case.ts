import type { PlanningEvent, EventRepository } from '../domain/planning.model'

export class GetEventsUseCase {
  constructor(private readonly repository: EventRepository) {}

  async executeUpcoming(): Promise<PlanningEvent[]> {
    return this.repository.findUpcoming()
  }

  async executePast(limit?: number): Promise<PlanningEvent[]> {
    return this.repository.findPast(limit)
  }
}
