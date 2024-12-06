import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateCommunityCommand implements Command {
  constructor (
        readonly id: string,
        readonly name: string,
        readonly suffix: string,
        readonly color: string,
        readonly homeSpaceId: string,
        readonly expiresAt: Date,
        readonly allowedFeatures: string[],
        readonly allowedUsers: number
  ) {}
}
