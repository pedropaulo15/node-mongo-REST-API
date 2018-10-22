require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const { mongoose } = require('./db/mongosse');
const { Todo } = require('./models/todo');

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Creating the routes
// POST a new todo
app.post('/todos', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET all todos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET todo by ID
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)){
    res.status(404).send();
    return console.log('ID not valid, please try again.');
  }
  
  Todo.findById(id).then((todo) => {
    if (!todo){
      res.status(404).send();
      return console.log('To do not found.');
    }
    res.status(200).send({todo});
  }).catch((err) => {
    res.status(400).send();
    return console.log('[ERROR]', err);
  });
});

// DELETE todo by ID
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;

  if(!ObjectId.isValid(id)){
    res.status(404).send();
    return console.log('ID not valid, please try again.');
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo){
      res.status(404).send();
      return console.log('To do not found.');
    }
    res.status(200).send({todo});
  }).catch((err) => {
    res.status(400).send();
    return console.log('[ERROR]', err);
  });
});

// UPDATE todo
app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']); // Subset of attributes that is sent

  if(!ObjectId.isValid(id)){
    res.status(404).send();
    return console.log('ID not valid, please try again.');
  }

  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime(); // Setting a timestamp for competedAt 
  } else {
    body.completed = false;
    body.completedAt = null; // cleans the timestamp if the todo hasn't been completed
  }

  Todo.findByIdAndUpdate(id, {
    $set: body
  }, {
      new: true // Return the object with the new values
      }).then((todo) => {

    if (!todo){
      res.status(404).send();
      return console.log('To do not found.');
    }

    res.send({todo});

  }).catch((err) => {
    res.status(400).send();
    return console.log('[ERROR]', err);
  })
});

app.listen(port, () => {
  console.log(`Starter on port ${port}...`);
});

module.exports = {
  app
};
