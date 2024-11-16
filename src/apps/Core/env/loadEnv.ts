import dotenv from 'dotenv'
import path from 'path'

const dir = process.env.NODE_ENV === 'ci' ? 'ci/' : 'dev/'

export default dotenv.config({ path: path.resolve(__dirname, dir, '.env') })
