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
    profile: flags.string({
      char: 'p',
      description: 'use a profile over the default.',
      default: 'default',
    }),
  }

  static args = [{ name: 'profile' }]

  async run() {
    const { args, flags } = this.parse(Goodmorning)

    if (flags.init) return init()

    try {
      await stat(location)
    } catch (error) {
      const { createInit } = await prompt([
        {
          name: 'createInit',
          type: 'confirm',
          message: 'No config file found. Would you like to create one?',
        },
      ])

      if (createInit) {
        return init()
      } else {
        return process.exit()
      }
    }

    const config = fs.readFileSync(location, 'utf8')
    const profiles = yaml.safeLoad(config, { json: true })

    if (typeof profiles === 'object' && profiles !== null) {
      const keys = Object.keys(profiles)
      let target = flags.profile

      // const profile = profiles[target]

      console.log(target)
    }
  }
}

export = Goodmorning
