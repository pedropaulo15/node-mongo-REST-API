// const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
 /**
  * Implementing jwt for hashing and validation
  */
// jwt.sign // Takes the object and create/return the hash
// jwt.verify // Takes the tokes and validate it

const data = {
  id: 10
}

const token = jwt.sign(data, '123abc');
console.log(token);

const decoded = jwt.verify(token, '123abc');
console.log(`decoded ${JSON.stringify(decoded)}`);

/**
 * Playing with crypto-js package
*/
// const message = 'I am user number 3';
// const hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// const data = {
//   id: 4
// };
// const token = {
//   data: data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// token.data.id = 5;
// token.hash =  SHA256(JSON.stringify(token.data)).toString();

// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash){
//   console.log('Data not changed.');
// } else {
//   console.log('Data changed, do not trust.')
// }