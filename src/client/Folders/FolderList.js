import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../app.css';

class FolderList extends Component {
  constructor(props) {
    super(props);
    this.state = { folders: [] };

    // this.updateFolders = this.updateFolders.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // this.updateFolders();
    // axios.get(`api/user/${this.props.match.params.id}/folders`)
    axios.get(`/api/users/${this.props.match.params.id}/folders`)
      .then(response => {
        this.setState({ folders: response.data });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // updateFolders() {
  //   axios.get('api/users/folders')
  //     .then(response => {
  //       this.setState({ folders: response.data });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  handleDelete(folderId) {
    axios
      .delete('api/users/folders', {
        data: {
          id: folderId
        }
      })
      .then(response => {
        this.updateFolders();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log(this.props.match.params.id);
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
            <Link to={'/create-folder'}>
              <button type="button">
                Create new folder
              </button>
            </Link>
            <h2>All Folders</h2>
            <div>{folderList}</div></div> :
          <h2>No Folders</h2> }
      </div>
    );
  }
}

const Folder = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Description: {props.description}</p>
      <p>There is {props.size} Posts in this folder</p>
    </div>
  );
};

export default FolderList;