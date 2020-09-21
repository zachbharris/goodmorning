import { join } from 'path'
import { homedir } from 'os'

export const filename = '.goodmorning.yaml'
export const location = join(homedir(), filename)
