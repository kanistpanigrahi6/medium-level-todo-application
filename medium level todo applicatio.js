const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
app.use(bodyParser.json());

app.get('/todos',(req,res)=>{
  fs.readFile("todos.json","utf-8",(err,data)=>{
    if(err){
      throw err;
    }
    else{
      res.json(JSON.parse(data));
    }
  });
});

app.post("/todos",(req,res)=>{
  const newtodo={
    id:Math.floor(Math.random()*1000000),
    title:req.body.title,
    description:req.body.description
  };
  fs.readFile("todos.json","utf-8",(err,data)=>{
    if(err) throw err;
    const todos=JSON.parse(data);
    todos.push(newtodo);
    fs.writeFile("todos.json",JSON.stringify(todos),(err)=>{
      if (err) throw err;
      res.status(201).json(newtodo);
    })
  })
})   
app.listen(3000)
