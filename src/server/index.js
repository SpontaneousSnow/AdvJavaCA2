const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ObjectID = require('mongodb').ObjectID;
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const Folder = require('./models/Folder');
const withAuth = require('./middleware');

const app = express();

const secret = 'secret_should_not_be_in_git';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

const mongo_uri = 'mongodb://localhost/instagram';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

app.get('/api/users', (req, res) => {
  User.find({}, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

app.get('/api/users/:id', (req, res) => {
  User.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

app.delete('/api/users', (req, res) => {
  User.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});

app.put('/api/users', (req, res) => {
  // get the ID of the user to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  // find a user matching this ID and update their details
  User.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/home/', function(req, res) {
  res.send('welcome');
});

app.get('/api/secret', withAuth, function(req, res) {
  res.send('The password is potato');
});

app.get('/api/users/folders', withAuth, function(req, res) {
  Folder.find({}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.get('/api/users/folders/:id', withAuth, function(req, res) {
  Folder.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.get('/api/posts', withAuth, function(req, res) {
  Posts.find({}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.get('/api/posts/:id', withAuth, function(req, res) {
  Posts.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.get('/api/:id/folders', function(req, res) {
  User.findOne({_id: req.params.id}, function(err, data) {
    
    if (err) throw err;

    Folder.find({user_id: data._id}, function(err, folders) {
      if (err) throw err;
      console.log(folders);
      res.send(folders);
    });
  });
});

app.get('/api/folders/:id/posts', function(req, res) {
  Folder.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    Posts.find({folder_id: data._id}, function(err, posts) {
      if (err) throw err;

      res.send(posts);
    });
  });
});

app.post('/api/register', function(req, res) {
  const { email, username, password, fName, age } = req.body;
  const user = new User({ email, username, password, fName, age });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error registering new user please try again.');
    } else {
      res.status(200).send('Welcome to the club!');
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          console.log(user);
          res.cookie('token', token, { httpOnly: true });
          res.send(user);
        }
      });
    }
  });
});

app.get('/api/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.get('/api/logout', withAuth, function(req, res) {
  res.cookie('token', '', { httpOnly: true }).sendStatus(200);;
});

app.listen(process.env.PORT || 8080);
