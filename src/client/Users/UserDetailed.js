import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

// card component used as a template when rending a user object
class UserDetailed extends React.Component {

  render() {
    return (
      <div className="column is-3">
        <div className="card" >       
          <div className="card-content">
            <div className="media">
              <div className="media-content">        
                <p className="title is-4">{this.props.username}</p>
                <p>{this.props.fName}</p>
                <p>{this.props.age}</p>
                <Link to={`/folders/${this.props.id}`}>
                  <button type="button">
                      View users Folders
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

export default UserDetailed;
