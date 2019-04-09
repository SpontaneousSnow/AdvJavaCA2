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
    // fetch data relating to user based on their id
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
    // make a new get request to update all user data on the screen
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(userId) {
    // make delete request where the user id is the passed in id below
    axios
      .delete(`/api/users/${this.props.match.params.id}`, {
        data: {
          id: userId
        }
      })
      .then(response => {
        this.updateUsers();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
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
