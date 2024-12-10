import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class UpdateSpaceCommand implements Command {
  constructor (
    readonly id: string,
    readonly name: string,
    readonly slug: string,
    readonly parentId: Nullable<string>,
    readonly icon: Nullable<string>,
    readonly headerUrl: Nullable<string>,
    readonly accessibility: string,
    readonly price: Nullable<{
        value: number,
        currency: string
    }>,
    readonly communityId: string
  ) {}
}
