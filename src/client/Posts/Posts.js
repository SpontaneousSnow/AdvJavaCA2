import React from 'react';
import { Link } from 'react-router-dom';

class Posts extends React.Component {
  render() {
    return (
      <div>
        <div>
          <p>{this.props.name}</p>
          <p>genre: {this.props.genre}</p>
          <p>Description: {this.props.description}</p>
          <Link to={`/comments/${this.props.id}`}>
            <button type="button">
                  View comments
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Posts;
