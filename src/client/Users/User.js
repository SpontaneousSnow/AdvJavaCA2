import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

// Component to represent a single User 'Card'
// note that the edit button navigates to a new URL (which will load a new Component via React Router)
// whereas the delete button invokes a function in the parent Component
class User extends React.Component {

  // define what happens when this componet gets drawn on the UI
  render() {
    return (
      <div>
        <div>
          <div>
            <div>
              <div>
                <p>{this.props.username}</p>
                <p>{this.props.fName}</p>
                <p>{this.props.age}</p>
                <Link to={`/folders/${this.props.id}`}>
                  <button type="button">
                    View users Folders
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

export default User;
