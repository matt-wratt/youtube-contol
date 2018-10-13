import React from 'react'
import videos from '../videos'
import VideoList from './video-list'

export default class Popup extends React.Component {

  constructor (props) {
    super(props)
    this.state = { playing: false }
    videos.listen(state => this.setState(state))
  }

  stopAll = () => videos.stopAll()

  render () {
    const { playing } = this.state
    return (
      <div>
        <button disabled={ !playing } onClick={ this.stopAll }>Stop All</button>
        <VideoList videos={ videos.all() }/>
      </div>
    )
  }

}
