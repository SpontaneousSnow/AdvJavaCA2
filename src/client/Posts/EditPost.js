import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class EditPost extends Component {
  constructor(props) {
    super(props);
    // store field information in state
    this.state = {_id: '', name: '', description: '', url:'', genre:'', folder_id: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // make get request where posts id matches params.id
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
    const name = event.target.name;
    const value = event.target.value;

    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // make put request where post id matches params.id then push in new information
    axios.put(`/api/users/folders/posts/${this.props.match.params.id}`, this.state)
      .then(res => this.props.history.push(`/users/folders/posts/${this.props.match.params.id}`))
      .catch(error => {
        console.log(error);
      });
  }

  render() {
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
