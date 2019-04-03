import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './app.css';

class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    axios.get(`api/folders/${this.props.match.params.id}/posts`)
      .then(response => {
        this.setState({ posts: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const postsList = this.state.modules.map(u => (
      <Posts
        key={u._id}
        id={u._id}
        url={u.url}
        description={u.description}
        likes={u.likes}
        comments={u.comments}
      />
    ));

    return (
      <div>
        {postsList.length ?
          <div>
            <h2>All Folders</h2>
            <div>{folderList}</div></div> :
          <h2>No Folders</h2> }
      </div>
    );
  }
}

const Posts = (props) => {
  return (
    <div>
      <h2>{props.url}</h2>
      <p>Description: {props.description}</p>
      <p>Likes: {props.likes} </p>
    </div>
  );
};

export default PostsList;