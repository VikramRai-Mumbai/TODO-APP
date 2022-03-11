
const passport = require('passport');

isLoggedIn = (req, res, next) =>{
    req.user ? next() : res.sendStatus(401);
  };


  const authCheck = {
    isLoggedIn
  };

  module.exports = authCheck;