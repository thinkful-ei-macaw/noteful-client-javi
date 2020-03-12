import React from 'react'
import ApiContext from '../ApiContext'
import { Route } from 'react-router-dom';

export default class AddNote extends React.Component {

    state = {
      NoteName: ''
  }


  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();

    const name = this.state.folderName;
    
    fetch('http://localhost:9090/folders', 
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
      this.context.AddNote(responseJson)
      this.props.history.push('/');
    })
  }



  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New note name:
        </label>
    <input type="input" className="nameInput" onChange={
      (e) => this.setState({
        NoteName: e.target.value
        
      })
      }>

      </input>
      <button type="submit" className="submitName">Submit Name</button>
      </form>
    )
  }
}

