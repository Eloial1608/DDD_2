import { Id } from "@Core/UserPlan/domain/ValueObjects/Id";
import { Name } from "@Core/UserPlan/domain/ValueObjects/Name";
import { Description } from "@Core/UserPlan/domain/ValueObjects/Description";
import { PlanId } from "@Core/UserPlan/domain/ValueObjects/PlanId";
import { UserId } from "@Core/UserPlan/domain/ValueObjects/UserId";
import { Price,PriceCurrency,PriceValue } from "@Core/UserPlan/domain/ValueObjects/Price";
import { RenovationInterval } from "@Core/Plan/domain/ValueObjects/RenovationInterval";
import { RenovationType } from "@Core/UserPlan/domain/ValueObjects/RenovationType";
import { ExpiresAt } from "@Core/UserPlan/domain/ValueObjects/ExpiresAt";
import { CreatedAt } from "@Core/UserPlan/domain/ValueObjects/CreatedAt";
import { UpdatedAt } from "@Core/UserPlan/domain/ValueObjects/UpdatedAt";
import { EntitySchema } from "typeorm";
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import { UserPlan } from "@Core/UserPlan/domain/UserPlan";


const UserPlanPriceSchema = new EntitySchema<Price>({
    name: 'UserPlanPrice',
    target: Price,
    columns:{
        value:{
            type: 'int',
            transformer: ValueObjectTransformer(PriceValue)
        },
        currency:{
            type: String,
            transformer: ValueObjectTransformer(PriceCurrency)
        }
    }
})

export const UserPlanSchema = new EntitySchema<UserPlan>({
    name: 'UserPlan',
    target: UserPlan,
    tableName: 'user_plan',
    columns:{
        id:{
            type:String,
            primary: true,
            transformer: ValueObjectTransformer(Id)
        },
        name:{
            type:String,
            transformer: ValueObjectTransformer(Name)
        },
        description:{
            type:String,
            transformer: ValueObjectTransformer(Description)
        },
        planId:{
            type:String,
            transformer: ValueObjectTransformer(PlanId)
        },
        userId:{
            type: String,
            transformer: ValueObjectTransformer(UserId)
        },
        renovationInterval:{
            type: 'int',
            transformer: ValueObjectTransformer(RenovationInterval)
        },
        renovationType:{
            type: String,
            transformer: ValueObjectTransformer(RenovationType)
        },
        expiresAt: {
              type: Date,
              createDate: true,
              transformer: ValueObjectTransformer(ExpiresAt)
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
        }
    },
    indices: [
    {
          name: 'IDX_USER_PLAN_USER_ID',
          columns: ['userId']
        }     
      ],
    embeddeds:{
        price:{
            schema: UserPlanPriceSchema,
            prefix: 'price'
        }
    }
})


