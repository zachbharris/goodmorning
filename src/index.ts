import { Command, flags } from '@oclif/command'
import { promisify } from 'util'
import { homedir } from 'os'
import { prompt } from 'inquirer'
import * as fs from 'fs'
import * as yaml from 'js-yaml'

// scripts
import init from './scripts/init'

// config
import { location } from './config'

// promises
const stat = promisify(fs.stat)

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

    if (flags.init) return init()

    const exists = await stat(location)

    console.log(exists)

    if (!exists) {
      const { init } = await prompt([
        {
          name: 'init',
          type: 'confirm',
          message: 'No config file found. Would you like to create one?',
        },
      ])

      if (init) {
        return init()
      } else {
        process.exit()
      }
    }

    console.log(
      JSON.stringify(yaml.safeLoad(fs.readFileSync(location, 'utf8')), null, 2)
    )
  }
}

export = Goodmorning
