
const userController = require("../controller/user.controller");
const passport = require('passport');
const { authCheck } = require("../middleware");
require("../controller/auth")
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

app.get("/", userController.login);
app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));
app.get( '/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/google/failure'
  })
);
app.get("/auth/google/failure", userController.auth_google_failure);
app.get("/logout", userController.logout);
app.get("/register", userController.register);
 app.get("/dashboard", [authCheck.isLoggedIn], userController.dashboard);
app.post("/addUser",[authCheck.isLoggedIn], userController.newUser);
app.get("/getUser",[authCheck.isLoggedIn], userController.getUser); 
app.get("/getUser/:UserID",[authCheck.isLoggedIn], userController.getUser); 
app.post("/updateUser",[authCheck.isLoggedIn], userController.updateUser);
app.post("/updateUser/:UserID",[authCheck.isLoggedIn], userController.updateUser);
app.delete("/deleteUser",[authCheck.isLoggedIn], userController.deleteUser);
app.delete("/deleteUser/:UserID",[authCheck.isLoggedIn], userController.deleteUser);




}