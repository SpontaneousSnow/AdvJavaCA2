import React from 'react';
import { Link } from 'react-router-dom';

class Folder extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div>
            <div>
              <div>
                <p>{this.props.name}</p>
                <p>Description: {this.props.description}</p>
                <p>Size: {this.props.size}</p>
                <Link to={`/posts/${this.props.id}`}>
                  <button type="button">
                    View Posts
                  </button>
                </Link>
                <button type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>
                    Delete
                </button>
                <Link to={`/edit-user/${this.props.id}`}>
                  <button type="button">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Folder;
