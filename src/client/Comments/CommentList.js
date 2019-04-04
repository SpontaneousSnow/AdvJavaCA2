import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../app.css';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  componentDidMount() {
    axios.get(`api/posts/${this.props.match.params.id}/comments`)
      .then(response => {
        this.setState({ comments: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {

    const commentList = this.state.comments.map(u => (
      <Comment
        key={u._id}
        id={u._id}
        username={u.username}
        description={u.description}
      />
    ));

    return (
      <div>
        {commentList.length ?
          <div>
            <h2>All Comments</h2>
            <div>{commentList}</div></div> :
          <h2>No Comments</h2> }
      </div>
    );
  }
}

const Comment = (props) => {
  return (
    <div>
      <h2>{props.username}</h2>
      <p>Description: {props.description}</p>
    </div>
  );
};

export default CommentList;
