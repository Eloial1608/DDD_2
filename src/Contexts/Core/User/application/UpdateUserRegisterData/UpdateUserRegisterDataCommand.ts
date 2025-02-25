import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateUserRegisterDataCommand implements Command {
  constructor (
      readonly id: string,
      readonly registerData: object
  ) {}
}
