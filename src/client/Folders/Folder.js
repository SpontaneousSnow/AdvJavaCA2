import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Component will be used to render indivudal instances of the folders class
class Folder extends React.Component {

  render() {
    return (
      <div className="column is-3">        
        <div className="card" >       
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <Link to={`/users/folders/${this.props.id}/posts`}>       
                  <p>{this.props.name}</p>
                  <p>Description: {this.props.description}</p>
                  <p>Size: {this.props.size}</p>
                </Link>
                {this.props.nat ? <p className="subtitle">{this.props.nat}</p> : null}
                <button type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>   
                  Delete
                </button>
                <Link to={`/users/edit-folder/${this.props.id}`}>
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
