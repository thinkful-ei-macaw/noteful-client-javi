import React from 'react'
import ApiContext from '../ApiContext'
import { Route } from 'react-router-dom';
import propTypes from 'prop-types'
import config from '../config';

export default class AddFolder extends React.Component {

    state = {
      folderName: ''
  }


  static contextType = ApiContext;

  handleSubmit = (e) => {
    e.preventDefault();

    const name = this.state.folderName;
    
    fetch(`${config.API_ENDPOINT}/folder`,
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
      this.context.addFolder(responseJson)
      this.props.history.push(`/folder/${responseJson.id}`);
    })
  }



  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          New folder name:
        </label>
    <input type="input" className="nameInput" required onChange={
      (e) => this.setState({
        folderName: e.target.value
        
      })
      }>

      </input>
      <button type="submit" className="submitName">Submit Name</button>
      </form>
    )
  }
}

AddFolder.propTypes = {
  history: propTypes.object.isRequired,
}

