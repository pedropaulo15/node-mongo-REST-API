// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

// const obj = new ObjectID(); 
// console.log('[obj]', obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('[Database] - Unable to connect to MongoDB server.', err);
  }

  console.log('[Database] - Connected to MongoDB server.');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5ba7f6648cf9847ec2e144ea')
  // }).toArray().then( (docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos').find().count().then( (count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({
    name: 'Pedro Santos'
  }).toArray().then( (docs) => {
    console.log('Users Collection');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch user: ', err);
  });

  // db.collection('Users').find().count().then( (count) => {
  //   console.log(`Users count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch users', err);
  // });
  
  // db.close();
});