import dotenv from 'dotenv'
import path from 'path'

export default dotenv.config({ path: path.resolve(__dirname, '.env') })
