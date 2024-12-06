
import {Account} from '@Core/Account/domain/Account'
import { EntitySchema } from 'typeorm'
import { ValueObjectTransformer } from '@Shared/domain/ValueObjects/ValueObjectTransformer'
import{Id} from '@Core/Account/domain/ValueObjects/Id'
import{Name} from '@Core/Account/domain/ValueObjects/Name'
import{Email} from '@Core/Account/domain/ValueObjects/Email'
import{CreatedAt} from '@Core/Account/domain/ValueObjects/CreatedAt'
import { MethodId } from '@Core/Account/domain/ValueObjects/MethodId'


export const AccountSchema = new EntitySchema<Account>({
    name : 'account',
    target: Account,
    tableName : 'account',
    columns:{
        id:{
            type : String,
            primary: true,
            transformer : ValueObjectTransformer(Id)
        },
        name:{
            type: String,
            transformer : ValueObjectTransformer(Name)
        },
        email:{
            type: String,
            transformer : ValueObjectTransformer(Email)
        },
        createdAt:{
            type: Date,
            transformer : ValueObjectTransformer(CreatedAt)
        },
        methodId:{
            type: String,
            transformer : ValueObjectTransformer(MethodId)
        }
    }
})