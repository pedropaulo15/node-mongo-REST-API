const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// Defining a Todo model
const Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

// Creating a new role/document
const newTodo = new Todo({
  text: 'Cook dinner',
  completed: true,
  completedAt: 123
});

newTodo.save().then((doc) => {
  console.log(`Saved todo ${doc}`)
}, (e) => {
  console.log('Unable to save todo.');
});