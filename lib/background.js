import Videos from './videos'

chrome.commands.onCommand.addListener(command => {
  if (command === 'play-pause') {
    const playingNow = Videos.playing()
    if (playingNow.length) {
      chrome.storage.local.set({'playing': playingNow.map(video => video.get('id'))})
      Videos.stopAll()
    } else {
      chrome.storage.local.get(stored => {
        var wasPlaying = stored.playing || []
        Videos.all()
          .filter(video => !!~wasPlaying.indexOf(video.get('id')))
          .forEach(video => video.play())
      })
    }
  } else if (command === 'skip') {
    Videos.playing().forEach(video => video.next())
  } else if (command === 'back') {
    Videos.playing().forEach(video => video.back())
  }
})

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
