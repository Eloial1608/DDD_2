import { AuthUser } from '@Auth/AuthUser/domain/AuthUser'
import { AuthUserCreatedDomainEvent } from '@Auth/AuthUser/domain/Events/AuthUserCreatedDomainEvent'

export class AuthUserCreatedDomainEventMother {
  static create (authUser: AuthUser) {
    return AuthUserCreatedDomainEvent.fromAggregate(authUser)
  }
}
