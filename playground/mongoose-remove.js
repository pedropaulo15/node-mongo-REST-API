const { ObjectId } = require('mongodb');

const { mongoose } = require('../server/db/mongosse');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Remove All documents
// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove()
Todo.findOneAndRemove({_id: '5bcceb821a938a8bb1376eb0'}).then((todo) => {
  console.log(todo);
});

// Todo.findByIdAndRemove()
Todo.findByIdAndRemove('5bcceb821a938a8bb1376eb0').then((todo) => {
  console.log(todo);
});