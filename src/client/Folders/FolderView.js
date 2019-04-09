import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FolderDetailed from './FolderDetailed';
import axios from 'axios';
import '../app.css';

class FolderView extends Component {
  constructor(props) {
    super(props);
    // store folder as an object 
    this.state = { folder: {} };

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // make get request to folder where id matches params.id
    axios.get(`/api/users/folders/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateFolders() {
    // make get to folders where id matches params.id
    axios.get(`/api/folders/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ folders: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(folderId) {
    // make delete request where id is the passed in paramter
    axios
      .delete(`/api/folders/${this.props.match.params.id}`, {
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
    console.log(this.state);
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
