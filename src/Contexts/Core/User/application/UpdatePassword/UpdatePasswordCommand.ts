import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdatePasswordCommand implements Command {
  constructor (
      readonly id: string,
      readonly password: string
  ) {}
}
