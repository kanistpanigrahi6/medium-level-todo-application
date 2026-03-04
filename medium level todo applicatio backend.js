const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const { findSourceMap } = require('module');
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
function findindex(arr,id){
  for(var i=0;i<arr.length;i++){
    if(arr[i].id==id){
      return i;
    }
  
    }
    return -1;
  }
// function removeindex(arr,index){
//   const newarr=[];
//   for(var i=0;i<arr.length;i++){
//       if(i!=index){
//         newarr.push(arr[i]);
//       }
//   }
//   return newarr;
// }

app.delete("/todos/:id",(req,res)=>{
  fs.readFile("todos.json","utf-8",(err,data)=>{
    if (err) throw err;
    let todos=JSON.parse(data)
    const todoindex=findindex(todos,parseInt(req.params.id));
    if(todoindex==-1){
      res.status(404).send("Todo not found");
    }
    else{
      todos.splice(todoindex,1);
      fs.writeFile("todos.json",JSON.stringify(todos),(err)=>{
        if(err) throw err;
        res.status(200).send("Todo deleted");
      })
    }
  })
})
app.listen(3000)
