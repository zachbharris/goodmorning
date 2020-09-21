import { homedir } from 'os'
import { join } from 'path'
import * as fs from 'fs'
import { promisify } from 'util'
import * as yaml from 'js-yaml'
import * as ora from 'ora'
import * as chalk from 'chalk'
import { prompt } from 'inquirer'

// promises
const writeFile = promisify(fs.writeFile)
const stat = promisify(fs.stat)

async function init() {
  const filename = '.goodmorning.yaml'
  const dir = join(homedir(), filename)

  // check if config already exists
  const configExists = await stat(dir)

  // prompt user to confirm overwrite if file already exists
  if (configExists) {
    const { overwrite } = await prompt([
      {
        name: 'overwrite',
        type: 'confirm',
        message: `${chalk.green(filename)} already exists. Overwrite?`,
        default: false,
      },
    ])

    // exit if the user does not wish to overwrite their existing config
    if (!overwrite) process.exit()
  }

  // initialize spinner
  const spinner = ora('creating config').start()

  // create base config
  const baseConfig = {
    default: {
      execute: ['echo "hello world"'],
    },
  }

  // convert config from object to YAML
  const config = yaml.safeDump(baseConfig)

  // write file to dir
  await writeFile(dir, config)

  // set spinner to success
  spinner.succeed('created config')

  // alert user to new file and location
  console.info(
    `Successfully created ${chalk.green(filename)} at ${chalk.green(homedir())}`
  )
}

export default init
