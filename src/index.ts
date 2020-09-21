import { Command, flags } from '@oclif/command'
import { promisify } from 'util'
import { homedir } from 'os'
import * as fs from 'fs'

// scripts
import init from './scripts/init'

// config
import { filename } from 'config'

// promises
const readFile = promisify(fs.readFile)

class Goodmorning extends Command {
  static description = 'describe the command here'

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    init: flags.boolean({
      char: 'i',
      default: false,
      description: 'bootstrap a new goodmorning config',
    }),
  }

  static args = [{ name: 'profile' }]

  async run() {
    const { args, flags } = this.parse(Goodmorning)
    const config = await readFile(homedir())

    if (flags.init) return init()

    console.log('back to normal captain!')
  }
}

export = Goodmorning
