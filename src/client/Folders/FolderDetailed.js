import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

// Component to represent a single User 'Card'
// note that the edit button navigates to a new URL (which will load a new Component via React Router)
// whereas the delete button invokes a function in the parent Component
class FolderDetailed extends React.Component {

  // define what happens when this componet gets drawn on the UI
  render() {
    return (
      <div className="column is-3">
        <div className="card" >       
          <div className="card-content">
            <div className="media">
              <div className="media-content">        
                <p className="title is-4">{this.props.name}</p>
                <p>{this.props.description}</p>
                <p>{this.props.size}</p>
                <Link to={`/posts/${this.props.id}`}>
                  <button type="button">
                      View users Posts
                  </button>
                </Link>
                {this.props.nat ? <p className="subtitle">{this.props.nat}</p> : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FolderDetailed;
