import { AggregateRoot } from '@Shared/domain/AggregateRoot'
import{Id} from '@Core/Account/domain/ValueObjects/Id'
import{Name} from '@Core/Account/domain/ValueObjects/Name'
import{Email} from '@Core/Account/domain/ValueObjects/Email'
import{CreatedAt} from '@Core/Account/domain/ValueObjects/CreatedAt'

export class Account extends AggregateRoot{
    constructor(
        readonly id : Id,
        readonly name : Name,
        readonly email : Email,
        readonly createdAt : CreatedAt
    ){
        super()
    }
}