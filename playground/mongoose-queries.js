const { ObjectId } = require('mongodb');

const { mongoose } = require('../server/db/mongosse');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// const id = '5bc385f954ced3c361272ece';

// if (!ObjectId.isValid(id)){
//   console.log('ID not valid.');
// }

// It returns an array with only one document
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', todos);
// });

// It returns the object
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo: ', todo);
// });

// It works as findOnemethod, but easier to implement
// Todo.findById(id).then((todo) => {
//   if (!todo){
//     return console.log('ID not found.');
//   }
//   console.log('Todo By ID:', todo);
// }).catch((err) => console.log(err))

// Experimenting find methods to User collections
const userID = '5bba5c86c583a745bf762f00'
User.findById(userID).then((user) => {
  if (!user){
    console.log('User not found');
  }
  console.log('User By ID: ', JSON.stringify(user, undefined, 2));
}).catch((err) => {
  console.log(err);
});