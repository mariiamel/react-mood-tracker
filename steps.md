# Steps to Acheive 

## Setting up the project

* cd into this repo and run `create-react-app mood-tracker`
* cd into mood-tracker

* talk about the goal of mood tracker app
* talk about how state will handle user interactions
* show goal image
* overview of components needed
  * Mood tracker component with UI controls
  * a mood point component to show mood
  * a mood note component to render mood notes from the user
  * wire frame maybe

* talk about props vs state
* What is state anyway?
* What's the difference between state and props?
  * talk about state in unit 1
  * talk about RESTful apis being stateless
  * Values stored in a component's state are mutable, or changeable, attributes.
  * Like props, which we access through the this.props object, we can access state using `this.state`
* refactor App.js
```jsx
import { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div>
        hello from App
      </div>
    )
  }
}
```
* make components
  * `mkdir ./src/components ./src/components/mood-tracker`
  * `touch ./src/components/mood-tracker/MoodTracker.jsx`
  * populate MoodTracker.jsx -- update App.js
```jsx
// MoodTracker.jsx
import { Component } from 'react'

export default class MoodTracker extends Component {
  render() {
    return (
      <div>
        hi from mood tracker!
      </div>
    )
  }
}

// in render() for App.js
export default class App extends Component {
  render() {
    return (
      <div>
        <h1>
          Mood Tracker
        </h1>
        
        <MoodTracker />
      </div>
    )
  }
}
```

* make mood component
  * `mkdir ./src/components/mood-points`
  * `touch ./src/components/mood-tracker/MoodTracker.jsx`
* talk about single responsibility principle -- maybe
```jsx
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
```
* Also update MoodTracker.jsx `<MoodPoints points={1} />`

## Adding state

* talk about state -- why do we need it?
  * talk about state from p1
  * RESTful APIs are stateless https://restfulapi.net/statelessness/
  * stateless backend -- stateful frontend

* add state as a constructor to MoodTracker.jsx
  * talk about defining initial state
  * talk about this as being the old way of initializing state
  * talk about when you might want to have a constructor
  * demonstrate manually changing the value
```jsx
  constructor() {
    // always invoke super first!!!!
    super()
    // state is defined as an obejct and bound to this
    this.state = {
      points: 1
    }
    // you can run code in the constructor to init
    console.log(this)
  }
```

* refactor into using class field declarations
  * talk about the difference

```jsx
  state = {
    points: 0
  }
```

* update `<MoodPoints points={this.state.points} />` in render
  * mess with state to show rendering differences

# Changing state

* add a Button to increase mood

```jsx
<button>🌈</button>
```

* add onClick to button
* talk about synthetic events as apart of the virtual DOM
  * how they trigger the virtual DOM to rerender
  * how they are similar to DOM events
  * How they are different
  * Common ones: 
    * onClick - buttons
    * onChange - text inputs
    * onSubmit - forms
    * onKeyPress - key input
    * onMouseOver - hover

```jsx
<button onClick={this.handleIncreaseMood}>🌈</button>
```
* stub an event handler

```jsx
  handleIncreaseMood = () => {
    console.log('clicked!')
  };
```

* talk about this.setState (inherited from Component)
```jsx
  handleIncreaseMood = () => {
    // this.setState is inherited from Component
    this.setState((prevState, props) => {
      return { points: this.state.points + 1 }
    }, /* () => console.log(this.state)) */)
  }
```
* try to console log this.points after setting state
  * talk about state setting being asyncronous
  * add console log as callback
* talk about event binding
* show binding with constructor (optional)
```jsx
    // have to bind methods to this for them to access this (the prototype)
    this.handleIncreaseMood = this.handleIncreaseMood.bind(this)
```

## You do

they do this and you chill

* add a decrement mood button

```jsx
  handleDecreaseMood = () => {
    // this.setState is inherited from Component
    this.setState((prevState, props) => {
      return { points: this.state.points - 1 }
    }, /* () => console.log(this.state)) */)
  }

<button onClick={this.handleDecreaseMood}>⛈</button>
```

## Rendering with loops and handling complex state

* create the mood-note component to render notes
  * `mkdir ./mood-note`
  * `touch ./mood-note/MoodNote.jsx`

* populate moodNote.jsx
```jsx
import { Component } from 'react'

export default class MoodNote extends Component {
  render() {
    return (
      <div>
        hello from mood MoodNote
        <p>My mood was {this.props.points} on {this.props.date}</p>
        
        <p>My thoughts: {this.props.note}</p>
      </div>
    )
  }
}
```

* add one note to MoodTracker.jsx

```jsx
import MoodNote from '../mood-note/MoodNote.jsx'

        <MoodNote 
          points={5}
          date={new Date().toLocaleDateString()}
          note={'Feeling okay!'}
        />
```

* create a js file for placeholder data
  * `touch ./mood-tracker/placeholder-notes.js`
  * add placeholder data
```jsx
const placeHolderNotes = [
  {
    points: 2,
    date: new Date().toLocaleDateString(),
    note: 'still using the DOM to make web pages'
  },
  {
    points: 5,
    date: new Date().toLocaleDateString(),
    note: 'heard about React, seems nifty'
  },
  {
    points: 10,
    date: new Date().toLocaleDateString(),
    note: 'starting using React, and it is AMAZING'
  }
]

export default placeHolderNotes
```

* import the placeholder notes in MoodTracker.jsx

```jsx
import placeHolderNotes from './placeHolderNotes.js'
```

* map the notes to an array of components
```jsx
const noteComponents = placeHolderNotes.map((placeHolderNote, index) =>{
  return (
    <MoodNote 
      key={`note ${index}`}
      points={placeHolderNote.points}
      date={placeHolderNote.date}
      note={placeHolderNote.note}
    />
  )
})

{noteComponents}
```

## Adding a form

* talk about needing two synthetic events: onChange and onSubmit
* talk about using htmlFor to label the input
* make form
```jsx
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
```

* stub handler functions
```jsx

  handleInputChange = (e) => {
    console.log(e)
  }

  handleSubmit = (e) => {
    console.log(e)
  }
  ```

* demo pressing keys for onChange
* demo page refresh for on Submit
* Build functions
* talk about spread operator, how just pushing returns the length of the extended array
* 
```jsx
// update state
 state = {
    points: 0,
    noteInput: '',
    noteData: []
  }

  handleInputChange = (e) => {
    this.setState({
      noteInput: e.target.value
    }, () => console.log(this.state))
  }
    // show how this throws an error
  handleSubmit = (e) => {
    e.preventDefault()
    // will bug out -- the return of push() is the length of the new array
    this.setState({
      noteData: this.state.noteData.push({
        note: this.state.noteInput,
        date: new Date().toLocaleDateString(),
        points: this.state.points
      })
    }, () => console.log(this.state))
  }
```
* using concat()
* talk about mutating state retriggering a DOM rerender

```jsx
    this.setState((prevState, props) => {
      // build note data object
      const newNoteData = {
        note: prevState.noteInput,
        date: new Date().toLocaleDateString(),
        points: prevState.points
      }
      return { 
        // sick spread operator!
        noteData: prevState.noteData.concat([newNoteData])
      }     
    }, () => this.setState({ noteInput: '' }))  
```

* make it nice or make it twice

```jsx
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
```
* finally, update the map in the return
  * update the param name to the callback in the map too

## Add Delete Button

* ask about how to get to state from another component
* explain how to pass a handler as a prop
* update the mood note with a button

```jsx
  handleDeleteNote = (index) => {
    this.setState((prevState, props) => {
      // make a new array from prev state
      let newNoteData = [...prevState.noteData]
      // splice note out
      newNoteData.splice(index, 1)

      return {
        noteData: newNoteData
      }
    })
  }

  // the mood note component in the map
          <MoodNote 
          key={`note ${index}`}
          points={placeHolderNote.points}
          date={placeHolderNote.date}
          note={placeHolderNote.note}
          // create a closure with the array index
          handleDeleteNote={() => { this.handleDeleteNote(index) }}
        />
```

## You do

* limit the range of mood to 0 and 10
??? maybe
