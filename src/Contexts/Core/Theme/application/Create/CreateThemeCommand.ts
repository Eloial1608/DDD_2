import { LayoutType } from '@Core/Theme/domain/ValueObjects/Layout'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateThemeCommand implements Command {
  constructor (
    readonly id: string,
    readonly communityId: Nullable<string>,
    readonly name: string,
    readonly previewPicUrl: string,
    readonly colors: string,
    readonly typography: string,
    readonly components: Nullable<string>,
    readonly layout: Nullable<LayoutType>
  ) {}
}
