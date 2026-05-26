import { CommandHandler } from '@Shared/domain/CommandBus/CommandHandler'
import { UpdateUserCommand } from './UpdaterUserCommand'
import { Command } from '@Shared/domain/CommandBus/Command'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { BirthDate } from '@Core/User/domain/ValueObjects/BirthDate'
import { Address } from '@Core/User/domain/ValueObjects/Address'
import { City } from '@Core/User/domain/ValueObjects/City'
import { Updater } from '@Core/User/application/Update/Updater'
import { CompanyName } from '../../domain/ValueObjects/CompanyName'
import { ZipCode } from '../../domain/ValueObjects/ZipCode'

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
      new CompanyName(command.companyName),
      new BirthDate(command.birthDate),
      new Address(command.address),
      new City(command.city),
      new ZipCode(command.zipCode)
    )
  }
}