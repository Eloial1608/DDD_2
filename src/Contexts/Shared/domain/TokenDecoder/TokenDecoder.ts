import { TokenData } from './TokenData'

export interface TokenDecoder {
    run (token: string): Promise<TokenData>
}
