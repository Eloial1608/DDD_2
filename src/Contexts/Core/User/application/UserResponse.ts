import { User } from '../domain/User'
import { QueryResponse } from '@Shared/domain/QueryBus/QueryResponse'

export type UserResponseBody = {
  readonly id: string
  readonly name: string
  readonly username: string
  readonly email: string
  readonly isAdmin: boolean
  readonly companyName: string | null
  readonly phoneNumber: string | null
  readonly identityDocType: string | null
  readonly identityDocNumber: string | null
  readonly city: string | null
  readonly address: string | null
  readonly zipCode: string | null
  readonly birthdate: string | null
  readonly createdAt: Date
  readonly updatedAt: Date
}

export class UserResponse implements QueryResponse<UserResponseBody> {
  response: UserResponseBody

  constructor(user: User) {
    this.response = {
      id: user.id.valueOf(),
      name: user.name.valueOf(),
      username: user.username.valueOf(),
      email: user.email.valueOf(),
      isAdmin: user.isAdmin.valueOf(),
      companyName: user.companyName?.valueOf?.() ?? null,
      phoneNumber: user.phoneNumber?.valueOf?.() ?? null,
      identityDocType: user.identityDoc?.type?.valueOf?.() ?? null,
      identityDocNumber: user.identityDoc?.number?.valueOf?.() ?? null,
      city: user.city?.valueOf?.() ?? null,
      address: user.address?.valueOf?.() ?? null,
      zipCode: user.zipcode?.valueOf?.() ?? null,
      birthdate: user.birthDate?.valueOf?.() ?? null,
      createdAt: user.createdAt.valueOf(),
      updatedAt: user.updatedAt.valueOf()
    }
  }
}