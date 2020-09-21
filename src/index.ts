import { Command, flags } from '@oclif/command'

// scripts
import init from './scripts/init'

class Goodmorning extends Command {
  static description = 'describe the command here'

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    init: flags.boolean({
      char: 'i',
      default: false,
      description: 'bootstrap a new goodmorning config'
    })
  }

  static args = [{ name: 'profile' }]

  async run() {
    const { args, flags } = this.parse(Goodmorning)

    if (flags.init) return init()

    console.log('back to normal captain!')
  }
}

export = Goodmorning
