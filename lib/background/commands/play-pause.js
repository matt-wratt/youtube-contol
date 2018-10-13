export default Videos => {
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
}
