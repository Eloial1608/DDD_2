import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Nullable } from '@Shared/domain/Nullable'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { Email } from './ValueObjects/Email'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { Id } from './ValueObjects/Id'
import { Name } from './ValueObjects/Name'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Username } from './ValueObjects/Username'
import { IsAdmin } from './ValueObjects/IsAdmin'
import { Password } from './ValueObjects/Password'
import { BirthDate } from './ValueObjects/BirthDate'
import { City } from './ValueObjects/City'
import { IdentityDoc } from './ValueObjects/IdentityDoc/IdentityDoc'
import { ZipCode } from './ValueObjects/ZipCode'
import { CompanyName } from './ValueObjects/CompanyName'
import { Address } from './ValueObjects/Address'
import { PhoneNumber } from './ValueObjects/PhoneNumber'

export class User extends AggregateRoot {

  constructor(
    readonly id: Id,
    readonly name: Name,
    readonly username: Username,
    readonly email: Email,
    readonly password: Password,
    readonly isAdmin: IsAdmin,
    readonly identityDoc: IdentityDoc,
    readonly companyName: CompanyName,
    readonly phoneNumber: PhoneNumber,
    readonly birthDate: BirthDate,
    readonly address: Address,
    readonly city: City,
    readonly zipcode: ZipCode,
    readonly createdAt: CreatedAt,
    readonly updatedAt: UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }

  static create(
    id: Id,
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
  ): User {
    const now = new Date()

    return new User(
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
      new CreatedAt(now),
      new UpdatedAt(now),
      null
    )
  }

  update(
    name: Name,
    username: Username,
    email: Email,
    identityDoc: IdentityDoc,
    companyName: CompanyName,
    phoneNumber: PhoneNumber,
    birthDate: BirthDate,
    address: Address,
    city: City,
    zipcode: ZipCode
  ): User {

    return new User(
      this.id,
      name,
      username,
      email,
      this.password,
      this.isAdmin,
      identityDoc,
      companyName,
      phoneNumber,
      birthDate,
      address,
      city,
      zipcode,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    )
  }

  delete(): User { 
    return new User(
      this.id,
      this.name,
      this.username,
      this.email,
      this.password,
      this.isAdmin,
      this.identityDoc,
      this.companyName,
      this.phoneNumber,
      this.birthDate,
      this.address,
      this.city,
      this.zipcode,
      this.createdAt,
      this.updatedAt,
      new DeletedAt(new Date())
    )
  }
  
  updateIsAdmin(isAdmin: IsAdmin): User{
    return new User(
      this.id,
      this.name,
      this.username,
      this.email,
      this.password,
      isAdmin,
      this.identityDoc,
      this.companyName,
      this.phoneNumber,
      this.birthDate,
      this.address,
      this.city,
      this.zipcode,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    )
  }

    updatePassword(password: Password): User{
    return new User(
      this.id,
      this.name,
      this.username,
      this.email,
      password,
      this.isAdmin,
      this.identityDoc,
      this.companyName,
      this.phoneNumber,
      this.birthDate,
      this.address,
      this.city,
      this.zipcode,
      this.createdAt,
      new UpdatedAt(new Date()),
      this.deletedAt
    )
  }
}