import { Command } from '@Shared/domain/CommandBus/Command'

export class UpdateUserCommand implements Command {
  constructor (
    readonly id: string,
    readonly name: string,
    readonly username: string,
    readonly email: string,
    readonly identityDocType: string,
    readonly identityDocNumber: string,
    readonly companyName: string,
    readonly phoneNumber: string,
    readonly birthDate: string,
    readonly address: string,
    readonly city: string,
    readonly zipCode: string,
  ) {}
}