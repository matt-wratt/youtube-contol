const emit = state => fn => setTimeout(() => fn(state), 0)
const any = (fn, list) => list.reduce((any, item) => fn(item) ? true : any, false)
const values = obj => Object.keys(obj).map(key => obj[key])

class State {

  constructor () {
    this.state = {}
    this.listeners = []
  }

  destroy () {
    this.listeners.length = 0
  }

  listen (fn) {
    this.listeners.push(fn)
    return () => this.listeners.splice(this.listeners.indexOf(fn), 1)
  }

  emit () {
    this.listeners.forEach(emit(this.state))
  }

  set (state) {
    var dirty = false
    Object.keys(state).forEach(prop => {
      if (this.state[prop] != state[prop]) {
        this.state[prop] = state[prop]
        dirty = true
      }
    })
    if (dirty) this.emit()
  }

  unset (props) {
    var dirty = false
    props.forEach(prop => {
      if (this.state[prop] !== undefined) {
        delete this.state[prop]
        dirty = true
      }
    })
    if (dirty) this.emit()
  }

  get (prop) {
    return this.state[prop]
  }

}

class Video extends State {

  constructor (tab) {
    super()
    this.set(tab)
    this.refresh()
  }

  refresh (tab) {
    if (tab) this.set(tab)
    chrome.tabs.executeScript(this.get('id'),  {
      code: 'document.title'
    }, ([ title ]) => {
      this.set({ title })
    })
  }

  playing () {
    return this.get('audible')
  }

  play () {
    if (!this.playing()) this.toggle()
  }

  pause () {
    if (this.playing()) this.toggle()
  }

  toggle () {
    chrome.tabs.executeScript(this.get('id'), {
      code: 'document.querySelector("#player .ytp-play-button").click()'
    }, () => this.set({ audible: !this.playing() }))
  }

  next () {
    chrome.tabs.executeScript(this.get('id'), {
      code: 'document.querySelector("#player .ytp-next-button").click()'
    })
  }

  back () {
    chrome.tabs.executeScript(this.get('id'), {
      code: 'history.back()'
    })
  }

  activate () {
    chrome.tabs.update(this.get('id'), { highlighted: true })
    chrome.windows.update(this.get('windowId'), { focused: true })
  }

}

class Videos extends State {

  constructor () {
    super()
    this.refresh()
    setInterval(this.refresh.bind(this), 300)
  }

  refresh () {
    chrome.tabs.query({ url: 'https://www.youtube.com/*' }, this.tabs.bind(this))
  }

  all () {
    return values(this.state).filter(video => video instanceof Video)
  }

  add (tab) {
    var video = new Video(tab)
    video.listen(this.update.bind(this))
    this.set({ [video.get('id')]: video })
  }

  stopAll () {
    return this.all().forEach(video => video.pause())
  }

  toggleBlockAll () {
    this.set({ block: !this.get('block') })
    this.update()
  }

  playing () {
    return this.all().filter(video => video.playing())
  }

  remove (id) {
    this.get(id).destroy()
    this.unset(video.get('id'))
  }

  tabs (tabs) {
    const ids = tabs.map(tab => tab.id)
    Object.keys(this.state)
      .filter(id => !!~ids.indexOf(id))
      .forEach(this.remove.bind(this))
    tabs.forEach(tab => {
      var video = this.state[tab.id]
      if (video) {
        video.refresh(tab)
      } else {
        this.add(tab)
      }
    })
  }

  update () {
    const playing = any(video => video.playing(), this.all())
    this.set({ playing })
    if (this.get('block') && playing) {
      this.playing().forEach(video => video.stop())
    }
  }

}

export default new Videos
