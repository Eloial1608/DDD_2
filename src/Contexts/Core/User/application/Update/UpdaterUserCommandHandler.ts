import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateUserCommand } from './UpdaterUserCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { CompanyName } from '@Core/User/domain/ValueObjects/CompanyName'
import { PhoneNumber } from '@Core/User/domain/ValueObjects/PhoneNumber'
import { BirthDate } from '@Core/User/domain/ValueObjects/BirthDate'
import { Address } from '@Core/User/domain/ValueObjects/Address'
import { City } from '@Core/User/domain/ValueObjects/City'
import { ZipCode } from '@Core/User/domain/ValueObjects/ZipCode'
import { IdentityDoc } from '@Core/User/domain/ValueObjects/IdentityDoc/IdentityDoc'
import { IdentityDocNumber } from '@Core/User/domain/ValueObjects/IdentityDoc/IdentityDocNumber'
import { IdentityDocType, Type } from '@Core/User/domain/ValueObjects/IdentityDoc/IdentityDocType'
import { Updater } from '@Core/User/application/Update/Updater'

export class UpdaterUserCommandHandler implements CommandHandler<UpdateUserCommand> {
  constructor(private readonly updater: Updater) {}

  subscribedTo(): Command {
    return UpdateUserCommand
  }

  async handle(command: UpdateUserCommand): Promise<void> {
    await this.updater.run(
      new Id(command.id),
      new Name(command.name),
      new Username(command.username),
      new Email(command.email),
      new IdentityDoc(
        new IdentityDocNumber(command.identityDocNumber),
        new IdentityDocType(command.identityDocType as Type)
      ),
      new CompanyName(command.companyName),
      new PhoneNumber(command.phoneNumber),
      new BirthDate(command.birthDate),
      new Address(command.address),
      new City(command.city),
      new ZipCode(command.zipCode)
    )
  }
}