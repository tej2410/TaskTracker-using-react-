
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser=require("body-parser");
const morgan=require('morgan');
const fs=require('fs');
const cors = require('cors');

app.use(cors()); 
app.use(express.json());

app.use(bodyParser.json());
// app.use(cors());

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"root",
  database:"taskt"
});

db.connect(function(err){
  if(err){
    console.log(err)
  }else{
    console.log("connected!")
  }
});

/////////FETCH AND SHOW TASKS////////////////

app.get("/",(req,res)=>
{
    res.send("hello itslllllllllllll me"); 
});
app.get("/getTasks", (req, res) => {
  db.query("select * from tasks", function(err,result,fields){
      if(err)
      {
       console.log(err)  
      }else{
          // console.log(JSON.parse(JSON.stringify(result)))
          console.log("ok");
          res.json(JSON.parse(JSON.stringify(result)))
      }
  })});
////ADD TASKS///////////
  app.post("/getTasks/add", (req, res) => {
    const ID=req.body.ID;
    const text=req.body.text;
    const day=req.body.day;
    const reminder=req.body.reminder;
     
  var query=`
  INSERT INTO tasks
  (text,day,reminder)
  VALUES("${text}","${day}",${reminder})
  `;
    db.query(query,function(err,result){
    if(err)
    {
    console.log(err)  
    }else{
      var con=`
SELECT * FROM tasks `;
  db.query(con,function(err,result){
      if(err)
      {
       console.log(err)  
      }else{
          console.log(result)
          console.log("data fetched")
          res.json(JSON.parse(JSON.stringify(result)))

      }
  })
        // console.log(result,"inserted")
        // res.json(JSON.parse(JSON.stringify(result)))

    }
    })});

////////////for particular task///////
app.get("/getTasks/add/:id", (req, res) => {
  
var query=`
SELECT * FROM tasks WHERE id=${req.params.id}`;
  db.query(query,function(err,result){
      if(err)
      {
       console.log(err)  
      }else{
          console.log(result)
          console.log("data fetched")
          res.json(JSON.parse(JSON.stringify(result)))

      }
  })});

  ///////DELETE TASK//////////////
  app.delete("/getTasks/delete/:id", (req, res) => {
  
    var query=` DELETE  FROM tasks WHERE id=${req.params.id}`;
      db.query(query,function(err,result){
          if(err)
          {
           console.log(err)  
          }else{
              console.log(result)
              console.log("deleted")
              res.json(JSON.parse(JSON.stringify(result)))
              // res.send(result)
    
          }
      })});
    ////////////TOGGGLLEEEE///////////
    app.put("/getTasks/:id", (req, res) => {
  var reminder=req.body.reminder;
      var query=`UPDATE tasks SET reminder = NOT ${reminder} WHERE id=${req.params.id}`;
              db.query(query,function(err,result){
            if(err)
            {
             console.log(err)  
            }else{
              var con=`
              SELECT * FROM tasks `;
                db.query(con,function(err,result){
                    if(err)
                    {
                     console.log(err)  
                    }else{
                        console.log(result)
                        console.log("data fetched")
                        res.json(JSON.parse(JSON.stringify(result)))
              
                    }
                })
                  }
                  })});
app.listen(3001,()=>
{
    console.log("im running at port 3001");
})