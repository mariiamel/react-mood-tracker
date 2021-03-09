import { Component } from 'react'

export default class MoodPoints extends Component {
  render() {
    return (
      <div>
        <p>On a Scale of 1-10</p>

        <p>You are  Currently this happy: <b>{this.props.points}</b></p>

      </div>
    )
  }
}