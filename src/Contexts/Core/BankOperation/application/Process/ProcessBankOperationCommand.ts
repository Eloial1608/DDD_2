
import { Command } from "@Shared/domain/CommandBus/Command"

export class ProcessBankOperationCommand implements Command {
  constructor(
    readonly type: string,
    readonly payload: any
  ) {}
}