import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateComment extends Component {
  constructor(props) {
    super(props);
    // set all parameters within state
    this.state = {post_id: `${this.props.match.params.id}`, username: '', description: ''};
    console.log(this.state.post_id);
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

    // send a POST request to the server with id of post as a paramter to get comments
    axios.post(`/api/users/folders/posts/${this.props.match.params.id}/comments`, this.state)
      .then(res => this.props.history.push(`/users/folders/posts/${this.props.match.params.id}/comments`))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Create New Comment</h2>
          <label>
            username:
            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateComment;
