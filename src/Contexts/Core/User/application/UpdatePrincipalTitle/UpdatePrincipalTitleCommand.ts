import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdatePrincipalTitleCommand implements Command {
  constructor (
      readonly id: string,
      readonly principalTitle: Nullable<string>,
      readonly communityId: string
  ) {}
}
