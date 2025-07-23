import { Id } from '../../../domain/ValueObjects/Id'
import { CommunityId } from '../../../domain/ValueObjects/CommunityId'
import { ProductId } from '../../../domain/ValueObjects/ProductId'
import { ActionType } from '../../../domain/ValueObjects/ActionType'
import { TargetId } from '../../../domain/ValueObjects/TargetId'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { EntitySchema } from 'typeorm'
import { Action } from '@Marketplace/Action/domain/Action'

export const ActionSchema = new EntitySchema<Action>({
  name: 'Action',
  target: Action,
  tableName: 'action',
  columns: {
    id: {
      type: String,
      primary: true,
      transformer: ValueObjectTransformer(Id)
    },
    productId: {
      type: String,
      transformer: ValueObjectTransformer(ProductId)
    },
    communityId: {
      type: String,
      transformer: ValueObjectTransformer(CommunityId)
    },
    type: {
      type: String,
      transformer: ValueObjectTransformer(ActionType)
    },
    targetId: {
      type: String,
      nullable: true,
      transformer: ValueObjectTransformer(TargetId)
    }

  },
  indices: [
    {
      name: 'IDX_ACTION_PRODUCT_ID',
      columns: ['productId']
    }
  ]
})
