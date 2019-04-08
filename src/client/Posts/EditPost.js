import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditPost extends Component {
  constructor(props) {
    super(props);
    // store information relating to the user in state
    // should match the user object from the API
    this.state = {_id: '', name: '', description: '', url:'', genre:'', folder_id: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // when this Component mounts, fetch data relating to the user to be edited
    // the user's ID is passed in via the URL and accessed via props
    axios.get(`/api/users/folders/posts/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          _id: response.data._id,
          name: response.data.name,
          description: response.data.description,
          url: response.data.url,
          genre: response.data.genre,
          folder_id: response.data.folder_id
        });
        console.log(this.props.match.params.id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleChange(event) {
    // one of the input boxes changed, update the state to match
    // note: name of the input boxes must match the property names in state
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // send a PUT request to the server
    // the request includes the state, which is the updated user information
    axios.put(`/api/users/folders/posts/${this.props.match.params.id}`, this.state)
      .then(res => this.props.history.push(`/users/folders/posts/${this.props.match.params.id}`)) // if successful go to home
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    // note: name of the inputs must match the property names in state
    return (
      <div>
        <h2>Edit Post</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            Description:
            <input type="text" name="description" value={this.state.description} onChange={this.handleChange} />
          </label>
          <label>
            Genre:
            <input type="text" name="genre" value={this.state.genre} onChange={this.handleChange} />
          </label>
          <label>
            Image URL:
            <input type="text" name="url" value={this.state.url} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditPost;
