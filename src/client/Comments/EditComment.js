import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditComment extends Component {
  constructor(props) {
    super(props);
    // store user information in state
    this.state = {_id: '', username: '', description: '', post_id: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // get data relating to this comment via its id
    axios.get(`/api/users/folders/posts/comments/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          _id: response.data._id,
          username: response.data.username,
          description: response.data.description,
          post_id: response.data.post_id
        });
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

    // send a PUT request to the server with the id of the edited commit as a paramter
    axios.put(`/api/users/folders/posts/comments/${this.props.match.params.id}`, this.state)
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
            Username:
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

export default EditComment;
