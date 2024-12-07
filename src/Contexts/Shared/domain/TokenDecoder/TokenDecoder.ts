import { TokenData } from './TokenData'

export interface TokenDecoder {
    run (token: string): TokenData
}
