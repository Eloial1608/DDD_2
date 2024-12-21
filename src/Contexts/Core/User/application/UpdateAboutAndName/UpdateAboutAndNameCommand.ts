import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateAboutAndNameCommand implements Command {
  constructor (
      readonly id: string,
      readonly about: Nullable<string>,
      readonly name: string
  ) {}
}
