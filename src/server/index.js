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

// connect to mongodb - issue is that the password of the user is being shown
const mongo_uri = 'mongodb+srv://simon:admin@advjavaca2-shkv6.mongodb.net/instagram?retryWrites=true';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});


// get all users
app.get('/api/users', (req, res) => {
  User.find({}, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});


// get user where id is same as the passed in id
app.get('/api/users/:id', (req, res) => {
  User.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// creates
// posts newly created folder information to the database with user id as forgein key
app.post('/api/users/:id/folders', (req, res) => {
  // using Folder mongoose model
  const folder = new Folder(req.body);
  folder.save((err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.status(200).send({success:true});
  });
});

// posts newly created post information to the database with folder id as the forgein key
app.post('/api/users/folders/:id/posts', (req, res) => {
  // using Posts mongoose model
  const post = new Posts(req.body);
  post.save((err, result) => {
    if (err) throw err;
    res.status(200).send({success:true});
    console.log('created in database');
  });
});

// posts newly created comments information to the database with post id as the forgein key
app.post('/api/users/folders/posts/:id/comments', (req, res) => {
  // using Comment mongoose model
  const comment = new Comment(req.body);
  comment.save((err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.status(200).send({success:true});
  });
});



// deletes
// delete user where id is the same as passed in id
app.delete('/api/users', (req, res) => {
  User.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});


// delete folder where id is the same as passed in id
app.delete('/api/users/folders/:id', withAuth, (req, res) => {
  Folder.deleteOne( {_id: new ObjectID(req.params.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});

// delete post where id is the same as passed in id
app.delete('/api/users/folders/posts/:id', withAuth, (req, res) => {
  Posts.deleteOne( {_id: new ObjectID(req.params.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});


// delete comment where id is the same as passed in id
app.delete('/api/users/folders/posts/comments/:id', withAuth, (req, res) => {
  Comment.deleteOne( {_id: new ObjectID(req.params.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});


// Updates
// send put request to user where id matches passed in id and update user with new information
app.put('/api/users', (req, res) => {
  const id  = req.body._id;
  delete req.body._id;
  // remove field as to not overwrite
  User.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;
    console.log('updated in database');
    return res.send({ success: true });
  });
});


// send put request to folder where id matches passed in id and update folder with new information
app.put('/api/users/folders/:id', (req, res) => {
  const id  = req.body._id;
  delete req.body._id;
  // remove field as to not overwrite
  Folder.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});


// send put request to post where id matches passed in id and update post with new information
app.put('/api/users/folders/posts/:id', (req, res) => {
  const id  = req.body._id;
  delete req.body._id;
  // remove field as to not overwrite
  Posts.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});

// send put request to comment where id matches passed in id and update comment with new information
app.put('/api/users/folders/posts/comments/:id', (req, res) => {
  // get the ID of the user to be updated
  const id  = req.body._id;
  // remove field as to not overwrite
  delete req.body._id;
  Comment.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});

app.use(express.static('dist'));


app.get('/api/home/', function(req, res) {
  res.send('welcome');
});

// outdated code was used to get all users folders
app.get('/api/users/folders', withAuth, function(req, res) {
  Folder.find({}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

// getting all folders belonging to a user by their id
app.get('/api/users/:id/folders', function(req, res) {
  User.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    Folder.find({user_id: data._id}, function(err, folders) {
      if (err) throw err;

      res.send(folders);
    });
  });
});

// geting folder by its id
app.get('/api/users/folders/:id', withAuth, function(req, res) {
  Folder.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

// get all posts
app.get('/api/users/folders/posts', withAuth, function(req, res) {
  Posts.find({}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});


// find post where the id is equal to passed in id
app.get('/api/users/folders/posts/:id', withAuth, function(req, res) {
  Posts.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});


// find posts where folder id equals passed in id
app.get('/api/users/folders/:id/posts', function(req, res) {
  Folder.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    Posts.find({folder_id: data._id}, function(err, posts) {
      if (err) throw err;

      res.send(posts);
    });
  });
});

// get all comments
app.get('/api/users/folders/posts/comments', function(req, res) {
  Comment.find({}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});


// find comment where comment id matches passed in id
app.get('/api/users/folders/posts/comments/:id', function(req, res) {
  Comment.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});


// find all comments related to a post via post id
app.get('/api/users/folders/posts/:id/comments', function(req, res) {
  Posts.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    Comment.find({post_id: data._id}, function(err, comments) {
      if (err) throw err;

      res.send(comments);
    });
  });
});

// find a single user where the id matches the passed in id
app.get('/api/user/:id', function(req, res) {
  if (err) throw err;

  User.find({_id: data._id}, function(err, users) {
    if (err) throw err;

    res.send(users);
  });
});

// Register and Auth
app.post('/api/register', function(req, res) {
  const { email, username, password, fName, age } = req.body;
  const user = new User({ email, username, password, profile, fName, age });
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
