import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import { Nullable } from '@Shared/domain/Nullable'
import { DeletedAt } from './ValueObjects/DeletedAt'
import { Email } from './ValueObjects/Email'
import { About } from './ValueObjects/About'
import { CreatedAt } from './ValueObjects/CreatedAt'
import { HasCompletedRegister } from './ValueObjects/HasCompletedRegister'
import { HasPayed } from './ValueObjects/HasPayed'
import { Id } from './ValueObjects/Id'
import { IsBanned } from './ValueObjects/IsBanned'
import { Name } from './ValueObjects/Name'
import { PlanId } from './ValueObjects/PlanId'
import { RegisterData } from './ValueObjects/RegisterData'
import { TotalMedia } from './ValueObjects/TotalMedia'
import { TotalPosts } from './ValueObjects/TotalPosts'
import { TotalThreadResponses } from './ValueObjects/TotalThreadResponses'
import { TotalThreads } from './ValueObjects/TotalThreads'
import { UpdatedAt } from './ValueObjects/UpdatedAt'
import { Username } from './ValueObjects/Username'

export class User extends AggregateRoot {
  constructor (
    readonly id: Id,
    readonly name: Name,
    readonly username: Username,
    readonly about: About,
    readonly email: Email,
    readonly hasPayed: HasPayed,
    readonly planId: PlanId,
    readonly hasCompletedRegister: HasCompletedRegister,
    readonly registerData: Nullable<RegisterData>,
    readonly isBanned: IsBanned,
    readonly totalPosts: TotalPosts,
    readonly totalMedia: TotalMedia,
    readonly totalThreads: TotalThreads,
    readonly totalThreadResponses: TotalThreadResponses,
    readonly createdAt: CreatedAt,
    readonly updatedAt:UpdatedAt,
    readonly deletedAt: Nullable<DeletedAt>
  ) {
    super()
  }
}
