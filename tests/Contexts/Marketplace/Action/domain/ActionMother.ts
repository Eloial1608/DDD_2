import { AvailableActionType, ActionType } from '@Marketplace/Action/domain/ValueObjects/ActionType'
import { Action } from '@Marketplace/Action/domain/Action'
import { Id } from '@Marketplace/Action/domain/ValueObjects/Id'
import { ProductId } from '@Marketplace/Action/domain/ValueObjects/ProductId'
import { UuidMother } from '@Tests/Contexts/Shared/domain/UuidMother'
import { CommunityId } from '@Marketplace/Action/domain/ValueObjects/CommunityId'
import { TargetId } from '@Marketplace/Action/domain/ValueObjects/TargetId'

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class ActionMother {
  static create (params: Partial<Action>): Action {
    return new Action(
      params.id ?? new Id(UuidMother.random()),
      params.communityId ?? new CommunityId(UuidMother.random()),
      params.productId ?? new ProductId(UuidMother.random()),
      params.type ?? new ActionType(AvailableActionType.CREATE_EVENT),
      params.targetId ?? new TargetId(UuidMother.random())
    )
  }

  static random (): Action {
    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    return this.create({})
  }
}
