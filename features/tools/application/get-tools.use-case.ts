import { ToolsData, ToolsRepository } from '../domain/tools.model'

export class GetToolsUseCase {
  constructor(private readonly repository: ToolsRepository) {}

  async execute(): Promise<ToolsData> {
    return this.repository.getTools()
  }
}
