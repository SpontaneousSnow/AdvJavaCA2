import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    // store field information in state
    this.state = {folder_id: `${this.props.match.params.id}`, name: '', url:'', genre: '', description: ''};
    console.log(this.state.folder_id);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // make post request to server where folder id matches params.id to be a forgein key for new post object
    axios.post(`/api/users/folders/${this.props.match.params.id}/posts`, this.state)
      .then(res => this.props.history.push(`/users/folders${this.props.match.params.id}/posts`))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Create New Post</h2>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          </label>
          <label>
            URL:
            <input type="text" name="url" value={this.state.url} onChange={this.handleChange} />
          </label>
          <label>
            Genre:
            <input type="text" name="genre" value={this.state.genre} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreatePost;
