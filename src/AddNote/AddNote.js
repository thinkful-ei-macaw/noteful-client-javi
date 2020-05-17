import React from 'react'
import ApiContext from '../ApiContext'
import propTypes from 'prop-types'
import config from '../config'


export default class AddNote extends React.Component {

    state = {
      noteName: '',
      noteContent: ''
      

  }


  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();

    const newNote = this.state;
    
    fetch(`${config.API_ENDPOINT}/notes`, 
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newNote: newNote,   
      })
    })
  .then(response => response.json())
  .then((responseJson) => {
      this.context.addNote(responseJson)
      this.props.history.push('/');
    })
  }



  render() {
    const { folders=[] } = this.context
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New note name:
        </label>
    <input type="input" required className= "noteNameInput" onChange={
      (e) => this.setState({
        noteName: e.target.value,
      })
      }>
        
      </input>
      <div className='form-field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content' name='note-content' required onChange={(e) => this.setState({
              noteContent: e.target.value})} />
          </div>
          Folders:
      <select id='note-folder-select' name='note-folder-id'>
        
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
      <button type="submit" className="submitNoteName">Submit Name</button>
      </form>
    )
  }
}

AddNote.propTypes = {
  history: propTypes.object.isRequired,
}

