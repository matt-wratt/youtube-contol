import commands from './commands'

export default Videos => command => {
  try {
    commands[command](Videos)
  } catch (error) {
    console.error(`Unable to execute command "${command}"`, error)
  }
}
