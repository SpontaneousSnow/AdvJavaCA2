import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Posts from './Posts';
import axios from 'axios';
import '../app.css';

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };

    this.updatePosts = this.updatePosts.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.updatePosts();
    axios.get(`/api/users/folders/${this.props.match.params.id}/posts`)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updatePosts() {
    axios.get(`/api/users/folders/${this.props.match.params.id}/posts`)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(postId) {
    axios
      .delete(`/api/users/folders/posts/${postId}`)
      .then(response => {
        this.updatePosts();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const postsList = this.state.posts.map(u => (
      <Posts
        key={u._id}
        id={u._id}
        name={u.name}
        genre={u.genre}
        url={u.url}
        description={u.description}
        handleDelete={this.handleDelete}
      />
    ));

    return (
      <div>
        {postsList.length  ?
          <div>
            <Link to={`/users/folders/${this.props.match.params.id}/create-post`}>
              <button type="button">
                Create new post
              </button>
            </Link>
            <h2>All Posts</h2>
            <div className="columns is-multiline">{postsList}</div></div> :
          <div>
            <h2>No Posts</h2>
            <Link to={`/users/folders/${this.props.match.params.id}/create-post`}>
              <button type="button">
                Create new post
              </button>
            </Link>
          </div> }
      </div>
    );
  }
}

export default PostsList;