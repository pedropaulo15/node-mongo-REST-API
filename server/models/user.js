const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "value is not a valid email"
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]  
});

/**
 * UserSchema.methods is an object, which allows to create
 * new instance methods, in this case the method generateAuthToken
 * is being created.
 * 
 * This cannot use the arrow function syntax, since it doesn't
 * bind the `this` keyword, which in this case is necessary to
 * access the document data.
 */
UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{access, token}]);

  return user.save().then(() => {
    return token;
  });
};

// Defining a User model
const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
