import React from 'react'
import videos from '../videos'
import VideoList from './video-list'

export default class Popup extends React.Component {

  constructor (props) {
    super(props)
    this.state = { playing: false, block: false }
    videos.listen(state => this.setState(state))
  }

  stopAll = () => videos.stopAll()

  toggleBlockAll = () => videos.toggleBlockAll()

  render () {
    const { playing, block } = this.state
    const blockAllLabel = `${block ? 'Un' : ''}Block All`

    return (
      <div>
        <button disabled={ !playing } onClick={ this.stopAll }>Stop All</button>
        <button onClick={ this.toggleBlockAll }>{ blockAllLabel }</button>
        <VideoList videos={ videos.all() }/>
      </div>
    )
  }

}
