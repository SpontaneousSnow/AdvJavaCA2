import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';
import '../app.css';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };

    this.updateComments = this.updateComments.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }


  // request to get all comments where the post_id equals the passed in params id
  componentDidMount() {
    this.updateComments();
    axios.get(`/api/users/folders/posts/${this.props.match.params.id}/comments`)
      .then(response => {
        this.setState({ comments: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // updates the displayed comments if for isntance one was deleted since first viewing it
  updateComments() {
    axios.get(`/api/users/folders/posts/${this.props.match.params.id}/comments`)
      .then(response => {
        this.setState({ comments: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //sends delete request to the server to delete a comment with the passed in id
  handleDelete(commentId) {
    axios
      .delete(`/api/users/folders/posts/comments/${commentId}`)
      .then(response => {
        this.updateComments();
      })
      .catch(error => {
        console.log(error);
      });
  }


  // render all comments by creating instances of the Comment file as a template to display info
  render() {
    const commentList = this.state.comments.map(u => (
      <Comment
        key={u._id}
        id={u._id}
        username={u.username}
        description={u.description}
        handleDelete={this.handleDelete}
      />
    ));

    //return relevant button ands json data containing all comments in objects
    return (
      <div>
        {commentList.length ?
          <div>
            <Link to={`/users/folders/posts/${this.props.match.params.id}/create-comment`}>
              <button type="button">
                Create new comment
              </button>
            </Link>
            <h2>All Comments</h2>
            <div className="columns is-multiline">{commentList}</div></div> :
          <div>
            <h2>No Comments</h2>
            <Link to={`/users/folders/posts/${this.props.match.params.id}/create-comment`}>
              <button type="button">
                Create new Comment
              </button>
            </Link>
          </div> }
      </div>
    );
  }
}



export default CommentList;
