const { User } = require('./../models/user');

// middleware function
const authenticate = (req, res, next) => {
  const token = req.header('X-AUTH');

  User.findByToken(token).then((user) => {
    if (!user){
      return Promise.reject();
    }

    // In here the req object is modified with the 
    // user and token found by the findByToken function. The req object
    // would also be available on the get request route, which can only return
    // res.send(req.user); (See server.js)
    req.user = user;
    req.token = token;
    // The next(); must be called, in order to continue the execution
    // of the middleware, otherwise the route would not have access to 
    // req.user or req.token.
    next();

  }).catch((e) => {
    res.status(401).send(e);
  });
};

module.exports = {
  authenticate
};
