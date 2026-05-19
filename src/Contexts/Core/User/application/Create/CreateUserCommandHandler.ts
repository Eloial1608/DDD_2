import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { CreateUserCommand } from './CreateUserCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Creator } from './Creator'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { Password, encryptPassword } from '@Core/User/domain/ValueObjects/Password'
import { IsAdmin } from '@Core/User/domain/ValueObjects/IsAdmin'
import { IdentityDocNumber } from '@Core/User/domain/ValueObjects/IdentityDoc/IdentityDocNumber'
import { IdentityDoc } from '@Core/User/domain/ValueObjects/IdentityDoc/IdentityDoc'
import { IdentityDocType, Type } from '@Core/User/domain/ValueObjects/IdentityDoc/IdentityDocType'
import { CompanyName } from '@Core/User/domain/ValueObjects/CompanyName'
import { PhoneNumber } from '@Core/User/domain/ValueObjects/PhoneNumber'
import { Address } from '@Core/User/domain/ValueObjects/Address'
import { City } from '@Core/User/domain/ValueObjects/City'
import { ZipCode } from '@Core/User/domain/ValueObjects/ZipCode'
import { BirthDate } from '@Core/User/domain/ValueObjects/BirthDate'

export class CreateUserCommandHandler implements CommandHandler<CreateUserCommand> {
  constructor (private readonly creator: Creator) {}

  subscribedTo (): Command {
    return CreateUserCommand
  }

  async handle (command: CreateUserCommand): Promise<void> {
    const encryptedPassword = await encryptPassword(command.password)

    await this.creator.run(
      new Name(command.name),
      new Username(command.username),
      new Email(command.email),
      new Password(encryptedPassword),
      new IsAdmin(command.isAdmin),
      new IdentityDoc(
        new IdentityDocNumber(command.identityDocNumber),
        new IdentityDocType(command.identityDocType as Type)
      ),
      new CompanyName(command.companyName),
      new PhoneNumber(command.phoneNumber),
      new BirthDate(command.birthDate),
      new Address(command.address),
      new City(command.city),
      new ZipCode(command.zipcode),
    )
  }
}
