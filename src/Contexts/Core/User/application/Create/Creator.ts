import { UserRepository } from '@Core/User/domain/UserRepository'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { City } from '@Core/User/domain/ValueObjects/City'
import { ZipCode } from '@Core/User/domain/ValueObjects/ZipCode'
import { Criteria } from '@Shared/domain/Criteria/Criteria'
import { Filter } from '@Shared/domain/Criteria/Filter'
import { Filters } from '@Shared/domain/Criteria/Filters'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { Address } from '@Core/User/domain/ValueObjects/Address'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { PhoneNumber } from '@Core/User/domain/ValueObjects/PhoneNumber'
import { BirthDate } from '@Core/User/domain/ValueObjects/BirthDate'
import { CompanyName } from '@Core/User/domain/ValueObjects/CompanyName'
import { IdentityDoc } from '@Core/User/domain/ValueObjects/IdentityDoc/IdentityDoc'
import { Password } from '@Core/User/domain/ValueObjects/Password'
import { IsAdmin } from '@Core/User/domain/ValueObjects/IsAdmin'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { UserAlreadyExistsByEmail } from '@Core/User/domain/Errors/UserAlreadyExistsByEmail'
import { UserAlreadyExistsByIdentityDoc } from '@Core/User/domain/Errors/UserAlreadyExistsByIdentityDoc'
import { UserAlreadyExistsById } from '@Core/User/domain/Errors/UserAlreadyExistsById'
import { User } from '@Core/User/domain/User'

export class Creator {
  constructor (private readonly repository: UserRepository) {}
  async run (
    name: Name,
    username: Username,
    email: Email,
    password: Password,
    isAdmin: IsAdmin,
    identityDoc: IdentityDoc,
    companyName: CompanyName,
    phoneNumber: PhoneNumber,
    birthDate: BirthDate,
    address: Address,
    city: City,
    zipcode: ZipCode
  ) {
    const id = new Id(Id.random().toString())
    await this.checkIfUserExists(id, email, identityDoc)

    console.log( identityDoc)

    const user = User.create(
      id,
      name,
      username,
      email,
      password,
      isAdmin,
      identityDoc,
      companyName,
      phoneNumber,
      birthDate,
      address,
      city,
      zipcode,
    )

    console.log(user)

    await this.repository.persist(user)
  }

  private async checkIfUserExists (id: Id, email: Email, identityDoc: IdentityDoc) {
    const existingUserById = await this.repository.find(id)

    if (existingUserById) throw new UserAlreadyExistsById(existingUserById.id)

    const existingUserByEmail = (await this.repository.search(
      new Criteria(
        new Filters(
          [
            Filter.simple('email', '=', email.valueOf())
          ]
        )
      )
    )).pop()

    if (existingUserByEmail) throw new UserAlreadyExistsByEmail(existingUserByEmail.email)

    const existingUserByIdentityDoc = (await this.repository.search(
      new Criteria(
        new Filters(
          [
            Filter.simple('identityDocNumber', '=', identityDoc.number.valueOf()),
            Filter.simple('identityDocType', '=', identityDoc.type.toString())
          ]
        )
      )
    )).pop()

    if (existingUserByIdentityDoc) throw new UserAlreadyExistsByIdentityDoc(existingUserByIdentityDoc.identityDoc)
  }
}