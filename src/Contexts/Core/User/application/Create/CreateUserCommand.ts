import { Command } from '@Shared/domain/CommandBus/Command'

export class CreateUserCommand implements Command {
  constructor (
    readonly name: string,
    readonly username: string,
    readonly email: string,
    readonly password: string,
    readonly isAdmin: boolean,
    readonly identityDocType: string,
    readonly identityDocNumber: string,
    readonly companyName: string,
    readonly phoneNumber: string,
    readonly birthDate: string,
    readonly address: string,
    readonly city: string,
    readonly zipcode: string,
  ) {}
}