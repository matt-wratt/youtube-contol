export default Videos => {
  Videos.playing().forEach(video => video.next())
}
