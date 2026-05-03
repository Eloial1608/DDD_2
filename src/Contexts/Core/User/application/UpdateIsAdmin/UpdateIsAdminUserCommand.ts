import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateIsAdminCommand implements Command {
  constructor (
      readonly id: string,
      readonly isAdmin: boolean
  ) {}
}
