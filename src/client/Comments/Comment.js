import React from 'react';
import { Link } from 'react-router-dom';

class Comment extends React.Component {

  // define what happens when this componet gets drawn on the UI
  render() {
    return (
      <div className="column is-3">        
        <div className="card" >       
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p>{this.props.username}</p>
                <p>Description: {this.props.description}</p>
                {this.props.nat ? <p className="subtitle">{this.props.nat}</p> : null}
                <button type="button" onClick={() => {this.props.handleDelete(this.props.id);}}>
                  Delete
                </button>
                <Link to={`/users/folders/posts/edit-comment/${this.props.id}`}>
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

export default Comment;