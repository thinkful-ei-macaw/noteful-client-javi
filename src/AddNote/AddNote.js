import React from 'react'
import ApiContext from '../ApiContext'
import propTypes from 'prop-types'


export default class AddNote extends React.Component {

    state = {
      NoteName: ''
  }


  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();

    const name = this.state.NoteName;
    
    fetch('http://localhost:9090/notes', 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,   
      })
    })
  .then(response => response.json())
  .then((responseJson) => {
      this.context.addNote(responseJson)
      this.props.history.push('/');
    })
  }



  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New note name:
        </label>
    <input type="input" required className="noteNameInput" onChange={
      (e) => this.setState({
        NoteName: e.target.value
        
      })
      }>

      </input>
      <button type="submit" className="submitNoteName">Submit Name</button>
      </form>
    )
  }
}

AddNote.propTypes = {
  history: propTypes.object.isRequired,
}

