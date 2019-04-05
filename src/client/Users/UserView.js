import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserDetailed from './UserDetailed';
import axios from 'axios';
import '../app.css';

class UserView extends Component {
  constructor(props) {
    super(props);
    // store the array of users in state
    this.state = { user: {} };

    this.updateUsers = this.updateUsers.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // when the component mounts, fetch the user data from the server
    this.updateUsers();
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ user: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateUsers() {
    // make a GET request to the server for the user data, store it in state
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(userId) {
    // make a DELETE request to the server to remove the user with this userId
    axios
      .delete(`/api/users/${this.props.match.params.id}`, {
        data: {
          id: userId
        }
      })
      .then(response => {
        // if delete was successful, re-fetch the list of users, will trigger a re-render
        this.updateUsers();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state);
    // for each user object, produce a User Component
    return (
      <section className="section">
        <div>
          <div>
            <UserDetailed     
              key={this.state.user._id}
              id={this.state.user._id}
              username={this.state.user.username}
              fName={this.state.user.fName}
              age={this.state.user.age}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default UserView;
