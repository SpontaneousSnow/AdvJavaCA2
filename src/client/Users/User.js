import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Component will be used to render indivudal instances of the user class

class User extends React.Component {

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
