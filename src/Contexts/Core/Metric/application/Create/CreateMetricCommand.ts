import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateMetricCommand implements Command {
  constructor (
        readonly id: string,
        readonly type: 'button' | 'open',
        readonly date: Date
  ) {}
}
