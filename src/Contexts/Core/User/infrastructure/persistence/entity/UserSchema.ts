import { User } from '@Core/User/domain/User'
import { Id } from '@Core/User/domain/ValueObjects/Id'
import { Name } from '@Core/User/domain/ValueObjects/Name'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { CreatedAt } from '@Core/User/domain/ValueObjects/CreatedAt'
import { UpdatedAt } from '@Core/User/domain/ValueObjects/UpdatedAt'
import { DeletedAt } from '@Core/User/domain/ValueObjects/DeletedAt'
import { Username } from '@Core/User/domain/ValueObjects/Username'
import { Email } from '@Core/User/domain/ValueObjects/Email'
import { Password } from '@Core/User/domain/ValueObjects/Password'
import { IsAdmin } from '@Core/User/domain/ValueObjects/IsAdmin'
import { CompanyName } from '@Core/User/domain/ValueObjects/CompanyName'
import { PhoneNumber } from '@Core/User/domain/ValueObjects/PhoneNumber'
import { BirthDate } from '@Core/User/domain/ValueObjects/BirthDate'
import { Address } from '@Core/User/domain/ValueObjects/Address'
import { City } from '@Core/User/domain/ValueObjects/City'
import { ZipCode } from '@Core/User/domain/ValueObjects/ZipCode'
import { IdentityDocNumber } from '@Core/User/domain/ValueObjects/IdentityDoc/IdentityDocNumber'
import { IdentityDocType, Type } from '@Core/User/domain/ValueObjects/IdentityDoc/IdentityDocType'
import { IdentityDoc } from '@Core/User/domain/ValueObjects/IdentityDoc/IdentityDoc'

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  tableName: 'user',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(Name)
    },
    username: {
      type: String,
      transformer: ValueObjectTransformer(Username)
    },
    email: {
      type: String,
      transformer: ValueObjectTransformer(Email)
    },
    password: {
      type: String,
      transformer: ValueObjectTransformer(Password)
    },
    isAdmin: {
      type: Boolean,
      transformer: ValueObjectTransformer(IsAdmin)
    },
    companyName:{
      type: String,
      transformer: ValueObjectTransformer(CompanyName)
    },
    phoneNumber:{
      type: String,
      transformer: ValueObjectTransformer(PhoneNumber)
    },
    birthDate:{
      type: String,
      transformer: ValueObjectTransformer(BirthDate)
    },
    address:{
      type: String,
      transformer: ValueObjectTransformer(Address)
    },
    city:{
      type: String,
      transformer: ValueObjectTransformer(City)
    },
    zipcode: {
      type: String,
      transformer: ValueObjectTransformer(ZipCode)
    },
    createdAt: {
      type: Date,
      createDate: true,
      transformer: ValueObjectTransformer(CreatedAt)
    },
    updatedAt: {
      type: Date,
      updateDate: true,
      transformer: ValueObjectTransformer(UpdatedAt)
    },
    deletedAt: {
      type: Date,
      nullable: true,
      deleteDate: true,
      transformer: ValueObjectTransformer(DeletedAt)
    }
  },
  embeddeds: {
    identityDoc: {
      prefix: 'identityDoc',
      schema: new EntitySchema({
        name: 'IdentityDoc',
        target: IdentityDoc,
        columns: {
          number: {
            type: String,
            nullable: true,
            transformer: ValueObjectTransformer(IdentityDocNumber),
          },
          type: {
            type: 'enum',
            enum: Type,
            nullable: true,
            transformer: ValueObjectTransformer(IdentityDocType),
          },
        },
      }),
    },
  },
  indices: [
    {
      name: 'IDX_USER_USERNAME',
      columns: ['username']
    }
  ]
})