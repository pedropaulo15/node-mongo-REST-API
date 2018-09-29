// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// const obj = new ObjectID(); 
// console.log('[obj]', obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('[Database] - Unable to connect to MongoDB server.', err);
  }

  console.log('[Database] - Connected to MongoDB server.');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then( (result) => {
  //   console.log(`Result: ${result}`);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then( (result) => {
  //   console.log(`Result: ${result}`);
  // });
  
  // This relete method also returns the deleted value.
  // findOneAndDelete
  db.collection('Todos').findOneAndDelete({completed: false}).then( (result) => {
    console.log(`Result: ${result}`);
  });
  // db.close();
});