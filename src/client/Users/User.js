import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Component to represent a single User 'Card'
// note that the edit button navigates to a new URL (which will load a new Component via React Router)
// whereas the delete button invokes a function in the parent Component
class User extends React.Component {

  // define what happens when this componet gets drawn on the UI
  render() {
    return (
      <div className="column is-3">
        <Link to={`/users/${this.props.id}/folders`}>
          <div className="card" >
            <img margin="0px" height="100" width="100" alt='Profile' src={this.props.profile}></img>       
            <div className="card-content">
              <div className="media">
                <div className="media-content">        
                  <p className="title is-4">{this.props.username}</p>
                  {this.props.nat ? <p className="subtitle">{this.props.nat}</p> : null}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

User.defaultProps = {
  username: 'no username',
  profile: 'https://bit.ly/2GvICQs',
  fName: 'no name',
  age: 'no age'
};

export default User;
