import type { NavbarContent, NavbarRepository } from '../domain/navigation.model'

export class GetNavigationUseCase {
  constructor(private readonly repository: NavbarRepository) {}

  async execute(): Promise<NavbarContent> {
    return this.repository.getNavbarContent()
  }
}
