import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FolderDetailed from './FolderDetailed';
import axios from 'axios';
import '../app.css';

class FolderView extends Component {
  constructor(props) {
    super(props);
    // store the array of users in state
    this.state = { folder: {} };

    //this.updateUsers = this.updateUsers.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // when the component mounts, fetch the user data from the server
    //this.updateUsers();
    axios.get(`/api/users/folders/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateFolders() {
    // make a GET request to the server for the user data, store it in state
    axios.get(`/api/folders/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ folders: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(folderId) {
    // make a DELETE request to the server to remove the user with this userId
    axios
      .delete(`/api/folders/${this.props.match.params.id}`, {
        data: {
          id: folderId
        }
      })
      .then(response => {
        // if delete was successful, re-fetch the list of users, will trigger a re-render
        this.updateFolders();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state);
    // for each user object, produce a User Component
    return (
      <section className="section">
        <div>
          <div>
            <FolderDetailed     
              key={this.state.folder._id}
              id={this.state.folder._id}
              name={this.state.folder.name}
              description={this.state.folder.description}
              size={this.state.folder.size}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default FolderView;
