import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditFolder extends Component {
  constructor(props) {
    super(props);
    // store fields in state
    this.state = {_id: '', name: '', description: '',user_id: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // make get request for folder infromation where id is equal to passed in id
    axios.get(`/api/users/folders/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          _id: response.data._id,
          name: response.data.name,
          description: response.data.description,
          user_id: response.data.user_id
        });
        console.log(this.props.match.params.id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    // make put request where folder id is equal to params.id
    axios.put(`/api/users/folders/${this.props.match.params.id}`, this.state)
      .then(res => this.props.history.push('/'))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2>Edit Folder</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Image:
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditFolder;
