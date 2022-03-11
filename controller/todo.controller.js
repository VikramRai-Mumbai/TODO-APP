const db = require("../model");
const TODO = db.todo;
var moment = require('moment');

exports.newTODO = (req, res) => {
    const newTODO = new TODO ({
       username: req.body.username,
       title: req.body.title,
       status: "Active",
       category: req.body.category
    });
    newTODO.save((error,data)=>{
       if(error){
        res.status(200).send({message : " new TODO creation failed."});
       }
       else {
        res.status(200).redirect("/dashboard");
       }
       
    });

   

    };

    exports.newTODOForm = (req, res) => {
      
      res.render('../views/addTODOForm', {displayName : req.user.displayName,  moment : moment});
  
  
      };

exports.getTODO = (req, res) => {
    const todoID = req.params.todoID;
    const category = req.body.category;
    const status = req.body.status;
    const title = req.body.title;
    const username = req.body.username;
    const createdAt = req.body.createdAt;
    const isSortByCreatedAt = req.body.isSortByCreatedAt;
    let filter = true;
    if(!username &&!category && !status && !title && !createdAt){ filter = false}
    TODO.find( todoID ? {_id : req.params.todoID} :( 
        filter ? { $or : [{ username : username}, { category : category}, { status : status}, { title : title}, {createdAt: createdAt}]} : {}),
        isSortByCreatedAt ? {  sort: {createdAt: -1}} : {},
         function (err, data){
       if(err){
        res.status(200).send({message : "something went wrong. error: ", error: err});
       }
       else{
        res.status(200).send(data);
       }

    })
        };


exports.updateTODO = (req, res) => {
    const todoID = req.params.todoID;
    TODO.updateOne( todoID ? {_id : req.params.todoID} : {_id : req.body.todoID},
        {
            username: req.body.username,
            title: req.body.title,
            status: req.body.status,
            category: req.body.category
        }
         ,function (err, data){
       if(err){
        res.status(200).send({message : "something went wrong. error: ", error: err});
       }
       else{
        res.status(200).redirect("/dashboard");
       }

    })

      };
      exports.updateTODOForm = (req, res) => {
        const todoID = req.params.todoID;
        TODO.findOne({_id : todoID},
             function (err, data){
           if(err){
            res.status(200).send({message : "something went wrong. error: ", error: err});
           }
           else{
            res.status(200).render("../views/updateTODOForm",{displayName : req.user.displayName, todo_id: todoID, username: data.username, title: data.title, category: data.category, status: data.status, createdAt: data.createdAt, moment : moment});
           }
    
        })
          };


      exports.deleteTODO = (req, res) => {
        const todoID = req.params.todoID;
        TODO.deleteOne( todoID ? {_id : req.params.todoID} : {_id : req.body.todoID},
           function (err, data){
           if(err){
            res.status(200).send({message : "something went wrong. error: ", error: err});
           }
           else{
            res.redirect("/dashboard");
           }
    
        })
    
          }; 