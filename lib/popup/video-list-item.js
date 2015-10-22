import React from 'react'
import Style from './video-list-item.scss'

export default class VideoListItem extends React.Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.unlisten = this.props.video.listen(this.setState.bind(this))
  }

  componentWillUnmount () {
    this.unlisten()
  }

  playState () {
    const { video } = this.props
    const toggle = video.toggle.bind(video)
    const state = video.playing() ? 'pause' : 'play'
    return <div onClick={ toggle } className={ state }></div>
  }

  next () {
    const { video } = this.props
    const next = video.next.bind(video)
    return <div onClick={ next } className="next"></div>
}

  title () {
    const { video } = this.props
    const activate = video.activate.bind(video)
    const title = video.get('title')
    return <span onClick={ activate } style={{ cursor: 'pointer' }}>{ title }</span>
  }

  render () {
    return (
      <li className="video-item">
        { this.playState() }
        { this.next() }
        { this.title() }
      </li>
    )
  }

}
