const passport = require('passport');
require("dotenv").config();
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const port = process.env.port;
if(port == 3000){
passport.use(new GoogleStrategy({
  clientID: clientID,
  clientSecret: clientSecret,
  callbackURL: "http://localhost:3000/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));
}else{
    passport.use(new GoogleStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL: "https://todo-app-monoceros.herokuapp.com/google/callback",
        passReqToCallback: true,
      },
      function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
      })); 
}
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
