import playPause from './play-pause'
import skip from './skip'
import back from './back'

export default Videos => command => {
  if (command === 'play-pause') {
    playPause(Videos)
  } else if (command === 'skip') {
    skip(Videos)
  } else if (command === 'back') {
    back(Videos)
  }
}
