import { UserRepository } from '@Core/User/domain/UserRepository'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { CompanyName } from '@Core/User/domain/ValueObjects/CompanyName'
import { BirthDate } from '@Core/User/domain/ValueObjects/BirthDate'
import { Address } from '@Core/User/domain/ValueObjects/Address'
import { City } from '@Core/User/domain/ValueObjects/City'
import { ZipCode } from '@Core/User/domain/ValueObjects/ZipCode'
import { UserNotFound } from '@Core/User/domain/Errors/UserNotFound'
import { Id } from '@Core/User/domain/ValueObjects/Id'

export class Updater {
  constructor (private readonly repository: UserRepository) {}

  async run (
    id: Id,
    name: Name,
    username: Username,
    companyName: CompanyName,
    birthDate: BirthDate,
    address: Address,
    city: City,
    zipCode: ZipCode,
    
  ) {
    const user = await this.repository.find(id)

    if (!user) throw new UserNotFound(id)

    const updatedUser = user.update(
      name,
      username,
      companyName,
      birthDate,
      address,
      city,
      zipCode
    )

    await this.repository.persist(updatedUser)
  }
}