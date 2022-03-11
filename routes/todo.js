
const todoController = require("../controller/todo.controller");
const { authCheck } = require("../middleware");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

app.post("/addTODO",[authCheck.isLoggedIn], todoController.newTODO);
app.get("/addTODOForm",[authCheck.isLoggedIn], todoController.newTODOForm);
app.get("/getTODO", [authCheck.isLoggedIn], todoController.getTODO);
app.get("/getTODO/:todoID", todoController.getTODO);
app.post("/updateTODO", [authCheck.isLoggedIn],todoController.updateTODO);
app.post("/updateTODO/:todoID",[authCheck.isLoggedIn], todoController.updateTODO);
app.get("/updateTODOForm/:todoID",[authCheck.isLoggedIn], todoController.updateTODOForm);
app.get("/deleteTODO",[authCheck.isLoggedIn], todoController.deleteTODO);
app.get("/deleteTODO/:todoID",[authCheck.isLoggedIn], todoController.deleteTODO);


}