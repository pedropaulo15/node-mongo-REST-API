// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// const obj = new ObjectID(); 
// console.log('[obj]', obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('[Database] - Unable to connect to MongoDB server.', err);
  }

  console.log('[Database] - Connected to MongoDB server.');

  // findOneAndUpdate() - Todos collections
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5bb151818cf9847ec2e1c010')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //     returnOriginal: false
  // }).then((res) => {
  //   console.log(`[findAndUpdate]: ${JSON.stringify(res, undefined, 2)}`)
  // });

  // findOneAndUpdate() - Users collections
  // db.collection('Users').findOneAndUpdate({
  //   _id: new ObjectID('5ba2d32218eec71964762f35')
  // }, {
  //   $set: {
  //     name: "Pedro Santos"
  //   },
  //   $inc: {
  //     age: 1
  //   }
  // }, {
  //     returnOriginal: false
  // }).then((res) => {
  //   console.log(`[findAndUpdate]: ${JSON.stringify(res, undefined, 2)}`)
  // });

  // db.close();
});