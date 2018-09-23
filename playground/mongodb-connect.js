// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// const obj = new ObjectID(); 
// console.log('[obj]', obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('[Database] - Unable to connect to MongoDB server.', err);
  }

  console.log('[Database] - Connected to MongoDB server.');

  // db.collection('Todos').insertOne({
  //   text: "Something to do",
  //   completed: false
  // }, (err, res) => {
  //   if (err) {
  //     return console.log('[Database][Collection] - Unable to insert to do:', err);
  //   }

  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)

  // db.collection('Users').insertOne({
  //   name: "Pedro Santos",
  //   age: 29,
  //   location: "Dublin"
  // }, (err, res) => {
  //   if (err) {
  //     return console.log("[Database][Collection - Users] - Unable to insert user: ", err);  
  //   }

  //   console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined, 2));
  // });

  db.close();
});