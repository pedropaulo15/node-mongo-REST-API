const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// Defining a Todo model
// const Todo = mongoose.model('Todo', {
//   text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     trim: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   },
//   completedAt: {
//     type: Number,
//     default: null
//   }
// });

// Creating a new role/document
// const newTodo = new Todo({ text: '   Edit the video.   '});

const User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

const newUser = new User({ email: '      '});

newUser.save().then((doc) => {
  console.log(`Saved user ${doc}`)
}, (e) => {
  console.log('Unable to save todo.', e);
});