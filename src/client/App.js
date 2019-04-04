import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import Secret from './Secret';
import Login from './Login';
import Register from './Register';
import FolderList from './FolderList';
import CreateFolder from './CreateFolder';
import PostsList from './PostsList';
import UserList from './UserList';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {loggedIn: false, user: {}};
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  logout(props) {
    axios.get('api/logout')
      .then(res => {
        this.setState({loggedIn: false});
        props.history.push('/');
      })
      .catch( err => console.log(err));
    return null;
  }

  login(user) {
    this.setState({loggedIn: true, user: user});
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/secret">Secret</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/create-folder">Create Folder</Link></li>
          {/* <li><Link to={`/user/${this.state.user._id}/folders`}>Folder</Link></li>*/ }
          <li><Link to='/users/folders'>Folder</Link></li>

          {!this.state.loggedIn && <li><Link to="/login">Login</Link></li>}
          {!this.state.loggedIn && <li><Link to="/register">Register</Link></li>}
          {this.state.loggedIn && <li><Link to="/logout">Logout</Link></li>}
        </ul>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={withAuth(Secret)} />
          <Route path="/users" component={UserList} />
          <Route exact path="/user/:id/folders"  component={withAuth(FolderList)} />
          <Route path="/create-folder" component={CreateFolder}/>
          <Route path="/posts" component={withAuth(PostsList)} />
          <Route path="/posts/:id" component={withAuth(PostsList)} />
          <Route path="/register" component={Register} />
          <Route path="/login" render={(props) => <Login {...props} handleLogin={this.login} />} />
          <Route path="/logout" render={this.logout}/>
        </Switch>
      </div>
    );
  }
}

export default App;
 