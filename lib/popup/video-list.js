import React from 'react'
import VideoListItem from './video-list-item'
import Style from './video-list.scss'

export default class VideoList extends React.Component {

  render () {
    return (
      <ul className="video-list">
        { this.props.videos.map(video => <VideoListItem video={ video } />) }
      </ul>
    )
  }

}
