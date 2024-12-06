import {Account} from './Account'

export interface AccountRepository{
    persist (account: Account ) :Promise<void>
}