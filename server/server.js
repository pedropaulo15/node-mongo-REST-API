const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const { mongoose } = require('./db/mongosse');
const { Todo } = require('./models/todo');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Creating the routes
// POST a new to do
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

// GET all to dos
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

// GET to do by ID
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

app.listen(port, () => {
  console.log(`Starter on port ${port}...`);
});

module.exports = {
  app
};
