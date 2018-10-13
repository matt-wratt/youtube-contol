import Videos from '../videos'
import executeCommand from './commands'

chrome.commands.onCommand.addListener(executeCommand(Videos))

const icons = {
  paused: 'icon.png',
  playing: 'playing.png'
}
var icon = icons.paused

Videos.listen(({ playing }) => {
  const newIcon = icons[playing ? 'playing' : 'paused']
  if (newIcon !== icon) {
    icon = newIcon
    chrome.browserAction.setIcon({ path: icon })
  }
})
