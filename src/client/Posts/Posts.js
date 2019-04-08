import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Posts extends React.Component {

  // define what happens when this componet gets drawn on the UI
  render() {
    return (
      <div className="column is-3">        
        <div className="card" >       
          <div className="card-content">
            <div className="media">
              <img margin="0px" height="100" width="100" alt='Photo' src={this.props.url}></img>       
              <div className="media-content">
                <Link to={`/users/folders/posts/${this.props.id}/comments`}>       
                  <p>{this.props.name}</p>
                  <p>genre: {this.props.genre}</p>
                  <p>Description: {this.props.description}</p>
                </Link>
                {this.props.nat ? <p className="subtitle">{this.props.nat}</p> : null}
                <button type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>
                  Delete
                </button>
                <Link to={`/users/folders/edit-post/${this.props.id}`}>
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

export default Posts;