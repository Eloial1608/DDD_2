import { ThemeType } from '@Core/CommunityConfiguration/domain/ValueObjects/CurrentTheme'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Nullable } from '@Shared/domain/Nullable'

export class CreateCommunityConfigurationCommand implements Command {
  constructor (
    readonly id: string,
    readonly communityId: Nullable<string>,
    readonly currentTheme: Nullable<ThemeType>
  ) {}
}
