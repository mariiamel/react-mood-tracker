import { Component } from 'react'
import MoodPoints from '../mood-points/MoodPoints.jsx'
import MoodNote from '../mood-note/MoodNote.jsx'
import placeHolderNotes from './placeHolderNotes.js'

export default class MoodTracker extends Component {
  // constructor() {
  //   // always invoke super first!!!!
  //   super()
  //   // state is defined as an obejct and bound to this
  //   this.state = {
  //     points: 1
  //   }
  //   // have to bind methods to this for them to access this (the prototype)
  //   this.handleIncreaseMood = this.handleIncreaseMood.bind(this)
  //   // you can run code in the constructor to init
  //   console.log(this)
  // }

  // class field declaration for inital component state
  state = {
    points: 0,
    noteInput: '',
    noteData: []
  }

  // event handlers
  handleIncreaseMood = () => {
    // this.setState is inherited from Component
    this.setState((prevState, props) => {
      return { points: prevState.points + 1 }
    }, /* () => console.log(this.state)) */)
  }

  handleDecreaseMood = () => {
    // this.setState is inherited from Component
    this.setState((prevState, props) => {
      return { points: prevState.points - 1 }
    }, /* () => console.log(this.state)) */)
  }

  handleInputChange = (e) => {
    this.setState({
      noteInput: e.target.value
    },/* () => console.log(this.state) */)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState((prevState, props) => {
      // build note data object
      const newNoteData = {
        note: prevState.noteInput,
        date: new Date().toLocaleDateString(),
        points: prevState.points
      }
      return { 
        // sick spread operator!
        noteData: [...prevState.noteData, newNoteData] 
      }     
    }, () => this.setState({ noteInput: '' }))  
  }

  render() {
    const noteComponents = this.state.noteData.map((placeHolderNote, index) =>{
      return (
        <MoodNote 
          key={`note ${index}`}
          points={placeHolderNote.points}
          date={placeHolderNote.date}
          note={placeHolderNote.note}
        />
      )
    })

    return (
      <div>
        <MoodPoints points={this.state.points} />

        <button onClick={this.handleIncreaseMood}>🌈</button>

        <button onClick={this.handleDecreaseMood}>⛈</button>

        <h3>Mood Notes:</h3 >

        <form onSubmit={this.handleSubmit}>
          <label htmlFor='note-input'>New Note:</label>

          <input 
            id='note-input' 
            type='text'
            onChange={this.handleInputChange} 
            placeholder='How do you feel?'
          />

          <input 
            type='submit'
            value='Save Note'
          />
        </form>

        {noteComponents}
      </div>
    )
  }
}