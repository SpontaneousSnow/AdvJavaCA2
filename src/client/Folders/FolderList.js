import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Folder from './Folder';
import '../app.css';

class FolderList extends Component {
  constructor(props) {
    super(props);
    this.state = { folders: [] };

    this.updateFolders = this.updateFolders.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.updateFolders();
    axios.get(`/api/users/${this.props.match.params.id}/folders`)
      .then(response => {
        this.setState({ folders: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateFolders() {
    axios.get(`/api/users/${this.props.match.params.id}/folders`)
      .then(response => {
        this.setState({ folders: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(folderId) {
    axios
      .delete(`/api/users/folders/${folderId}`)
      .then(response => {
        this.updateFolders();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const folderList = this.state.folders.map(u => (
      <Folder
        key={u._id}
        id={u._id}
        name={u.name}
        description={u.description}
        size={u.size}
        handleDelete={this.handleDelete}
      />
    ));

    return (
      <div>
        {folderList.length ?
          <div>
            <Link to={`/users/${this.props.match.params.id}/create-folder`}>
              <button type="button">
                Create new folder
              </button>
            </Link>
            <h2>All Folders</h2>
            <div className="columns is-multiline">{folderList}</div></div> :
          <div>
            <h2>No Folders</h2>
            <Link to={`/users/${this.props.match.params.id}/create-folder`}>
              <button type="button">
                Create new folder
              </button>
            </Link>
          </div> }
      </div>
    );
  }
}

export default FolderList;