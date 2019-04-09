import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../filters/SearchBar';
import User from './User';
import axios from 'axios';
import '../app.css';

class UserList extends Component {
  constructor(props) {
    super(props);
    // store users in an array of objects
    this.state = { users: [] };

    this.updateUsers = this.updateUsers.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // get all users from server
    this.updateUsers();
    axios.get('/api/users')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  updateUsers() {
    // make get request to get all users from server
    axios.get('api/users')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(userId) {
    // make a delete request to  server to delete user where id is passed in id
    axios
      .delete('api/users', {
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

    // for each user in list render component
    const userList = this.state.users.map(u => (
      <User
        key={u._id}
        id={u._id}
        username={u.username}
        profile={u.profile}
        fName={u.fName}
        age={u.age}
      />
    ));

    return (
      <section className="section">
        <div>
          <SearchBar name="searchText" label="Search by username" value={this.state.searchText} handleChange={this.handleChange} placeholder={'e.g. Bob'} />
          <h2>All Users</h2>
          <div className="columns is-multiline">{userList}</div>
        </div>
      </section>
    );
  }
}

export default UserList;
