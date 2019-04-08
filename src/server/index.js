const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ObjectID = require('mongodb').ObjectID;
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const Comment = require('./models/Comment');
const Posts = require('./models/Posts');
const Folder = require('./models/Folder');
const withAuth = require('./middleware');

const app = express();

const secret = 'secret_should_not_be_in_git';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// const mongo_uri = 'mongodb://localhost/instagram';
const mongo_uri = 'mongodb+srv://simon:admin@advjavaca2-shkv6.mongodb.net/instagram?retryWrites=true';
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

app.delete('/api/users/folders', (req, res) => {
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

app.put('/api/users/folders', (req, res) => {
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


app.get('/api/users/folders', withAuth, function(req, res) {
  Folder.find({}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

// app.get('/api/users/:id/folders/', withAuth, function(req, res) {
//   Folder.findOne({_id: req.params.id}, function(err, data) {
//     if (err) throw err;
//     res.send(data);
//   });
// });

app.get('/api/users/:id/folders', function(req, res) {
  User.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    Folder.find({user_id: data._id}, function(err, folders) {
      if (err) throw err;

      res.send(folders);
    });
  });
});

app.get('/api/users/folders/posts', withAuth, function(req, res) {
  Posts.find({}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

app.get('/api/users/folders/:id/posts', function(req, res) {
  Folder.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    Posts.find({folder_id: data._id}, function(err, posts) {
      if (err) throw err;

      res.send(posts);
    });
  });
});

// app.get('/api/posts/:id', withAuth, function(req, res) {
//   Posts.findOne({_id: req.params.id}, function(err, data) {
//     if (err) throw err;
//     res.send(data);
//   });
// });

// create new user based on info supplied in request body
app.post('/api/users/:id/folders', (req, res) => {
  // create a new user object using the Mongoose model and the data sent in the POST
  const folder = new Folder(req.body);
  // save this object to the DB
  folder.save((err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.redirect('/api/users/folders');
  });
});

// update user based on info supplied in request body
app.put('/api/users/folders/:id', (req, res) => {
  // get the ID of the user to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  // find a user matching this ID and update their details
  Folder.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});

app.get('/api/folders', function(req, res) {
  Folder.find({}, function(err, data) {
    if (err) throw err;

    res.send(data);
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

app.get('/api/users/folders/posts/comments', function(req, res) {
  Comment.find({}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

app.get('/api/users/folders/posts/:id/comments', function(req, res) {
  Posts.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    Comment.find({post_id: data._id}, function(err, comments) {
      if (err) throw err;

      res.send(comments);
    });
  });
});

app.get('/api/user/:id', function(req, res) {
  if (err) throw err;

  User.find({_id: data._id}, function(err, users) {
    if (err) throw err;

    res.send(users);
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
